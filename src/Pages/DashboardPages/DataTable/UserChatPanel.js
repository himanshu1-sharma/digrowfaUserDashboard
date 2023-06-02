import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { BASEURL, APP_BASEURL } from '../../Constant'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ReactPlayer from 'react-player'
import { Player, ControlBar } from 'video-react';

const UserChatPanel = () => {

    const [user, setUser] = useState()
    const [recentChats, setRecentChats] = useState()
    const [selectedId, setselectedId] = useState()
    const [conversation, setConversation] = useState()
    const params = useParams()

    const fetchUser = async () => {
        try {
            await Axios.post(`${BASEURL}api/crm/admin/get-user-details`, {
                userId: params?.id,
            }).then((data) => {
                setUser(data.data.data[0]);
                // console.log("user data", data.data.data[0]);
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchChatUser = async () => {
        try {
            await Axios.get(`${APP_BASEURL}api/users/user-recent-chats/${params.id}`).then((data) => {
                setRecentChats(data.data.data);
                // console.log("setRecentChats", data.data.data);
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleClick = async () => {
        try {
            await Axios.post(`${APP_BASEURL}api/users/chat-history`, { senderid: selectedId, recieverid: params?.id })
                .then((data) => {
                    setConversation(data.data.data);

                });
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log("conversation", conversation);

    useEffect(() => {
        fetchUser()
        fetchChatUser()
    }, [])
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='userChatRoomBg'>
                    <div className='container chatBox'>
                        <div className='row h-100'>
                            <div className='col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12'>
                                <div className='userProfileLine'>
                                    <div className='userChatProfileBox'>
                                        <div className='userChatProfile' style={{ backgroundImage: `url(${user?.profilepic})` }}></div>
                                        <h4>{user?.name}</h4>
                                        <p>@{user?.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12'>
                                <div className='chat-panel'>
                                    <Tab.Container id="left-tabs-example" defaultActiveKey={recentChats?.recentChats[0]?._id}>
                                        <Row className='h-100'>
                                            <Col sm={4}>
                                                <div className="conversation-title">
                                                    <h2>All Conversations</h2>
                                                </div>
                                                <Nav variant="pills" className="flex-column">
                                                    {recentChats?.recentChats && recentChats?.recentChats.map(curElt => {
                                                        return (
                                                            <>
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey={curElt?._id} onClick={() => {
                                                                        setselectedId(curElt._id)
                                                                        handleClick()
                                                                    }}>
                                                                        <div className='choose-person-chat'>
                                                                            <div className="person-pic" style={{ backgroundImage: `url(${curElt?.profilepic})` }}></div>
                                                                            <div className="person-name">
                                                                                <h2>{curElt?.name}</h2>
                                                                                <p>@{curElt?.username}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                            </>
                                                        )
                                                    })}

                                                </Nav>
                                            </Col>
                                            <Col sm={8}>
                                                <Tab.Content>
                                                    <div className='conversation-bg'>
                                                        {recentChats?.recentChats && recentChats?.recentChats.map(curElt => {
                                                            if (curElt._id != selectedId) {
                                                                return (
                                                                    <>
                                                                        <div className='conversation-box'>
                                                                            <div className='conversation-inbox'>
                                                                                {conversation?.chatHistory && conversation?.chatHistory.reverse()?.map(curMsg => {
                                                                                    if (curMsg?.sender != params.id) {
                                                                                        return (
                                                                                            <>
                                                                                                <div className="person-message-box">
                                                                                                    <div className="person-message">
                                                                                                        {curMsg.MsgType === "Normal Msg"

                                                                                                            ?
                                                                                                            <p>{curMsg?.message}</p>

                                                                                                            :
                                                                                                            curMsg.file?.contentType === "image/png"
                                                                                                                ?

                                                                                                                <img src={curMsg?.file?.location} alt={curMsg?.file?.originalname} className="chatMsg img-fluid" />

                                                                                                                :

                                                                                                                curMsg.file?.contentType === "video/mp4"
                                                                                                                    ?

                                                                                                                    <>
                                                                                                                        <ReactPlayer
                                                                                                                            className='react-player'
                                                                                                                            url={curMsg?.file?.location}
                                                                                                                            controls
                                                                                                                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                                                                                                            onContextMenu={(e) => e.preventDefault()}
                                                                                                                        />
                                                                                                                    </>


                                                                                                                    :

                                                                                                                    ""
                                                                                                        }

                                                                                                        <ul>
                                                                                                            <li>{curMsg?.messageTime}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                    else {
                                                                                        return (
                                                                                            <>
                                                                                                <div className="my-message-box">
                                                                                                    <div className="my-message">
                                                                                                        {curMsg.MsgType === "Normal Msg"

                                                                                                            ?
                                                                                                            <p>{curMsg?.message}</p>

                                                                                                            :
                                                                                                            curMsg.file?.contentType === "image/png"
                                                                                                                ?

                                                                                                                <img src={curMsg?.file?.location} alt={curMsg?.file?.originalname} className="chatMsg img-fluid" />

                                                                                                                :

                                                                                                                curMsg.file?.contentType === "video/mp4"
                                                                                                                    ?

                                                                                                                    <>
                                                                                                                        <ReactPlayer
                                                                                                                            className='react-player'
                                                                                                                            url={curMsg?.file?.location}
                                                                                                                            controls
                                                                                                                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                                                                                                            onContextMenu={(e) => e.preventDefault()}
                                                                                                                        />
                                                                                                                        {/* <Player autoPlay src={curMsg?.file?.location}>
                                                                                                                            <ControlBar autoHide={false} className="my-class" />
                                                                                                                        </Player> */}
                                                                                                                    </>


                                                                                                                    :

                                                                                                                    ""
                                                                                                        }
                                                                                                        <ul>
                                                                                                            <li>{curMsg?.messageTime}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                })}

                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserChatPanel