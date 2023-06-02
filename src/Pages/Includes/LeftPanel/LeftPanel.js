import React from 'react'
import logo from '../../../img/logo/logo.webp'
import { NavLink } from 'react-router-dom'
import './LeftPanel.css'
import dashboard from "../../../img/icons/dashboard.png"
import addEdit from "../../../img/icons/addEdit.png"
import Categories from "../../../img/icons/Categories.png"
import Feedbacks from "../../../img/icons/Feedbacks.png"
import management from "../../../img/icons/management.png"
import Reported_Problem from "../../../img/icons/Reported_Problem.png"
import Reported_users from "../../../img/icons/Reported_users.png"
import Users from "../../../img/icons/Users.png"
import Verification from "../../../img/icons/Verification.png"
import { UserState } from '../../Context'
import { useNavigate } from 'react-router-dom'


const LeftPanel = () => {

    const { user, setUser } = UserState()
    const navigate = useNavigate()

    // console.log("user", user)

    const handleLogOut = () => {
        setUser({})
        navigate('/login')
    }

    return (
        <>
            <div className='leftPanel'>
                <div className='logo'>
                    <img src={logo} alt="logo" className='img-fluid' />
                </div>
                <div className='profileBox'>
                    <div className='profileImg' style={{ backgroundImage: `url(${user?.profilepic?.location})` }}></div>
                    <div className='profileName'>
                        <h2>{user?.name}</h2>
                        <div onClick={handleLogOut} style={{ color: "red", cursor: "pointer" }}>Logout</div>
                    </div>
                </div>
                <div className='leftPanelList'>
                    <ul>

                        {user && user.role === "all" &&
                            <>
                                <NavLink exact="true" activeclassname="active" to="/">
                                    <li>
                                        <div className='leftPanelListIcon'><img src={dashboard} alt="dashboard" className='img-fluid' /> </div>
                                        <div className='leftPanelListName'>Dashboard</div>
                                    </li>
                                </NavLink>
                            </>
                        }

                        {user && (user.role === "all" || user.role === "management") &&
                            <NavLink exact="true" activeclassname="active" to="/management">
                                <li>
                                    <div className='leftPanelListIcon'><img src={management} alt="management" className='img-fluid' /></div>
                                    <div className='leftPanelListName'>Management</div>
                                </li>
                            </NavLink>
                        }
                        {user && (user.role === "all" || user.role === "user") &&
                            <NavLink exact="true" activeclassname="active" to="/users">
                                <li>
                                    <div className='leftPanelListIcon'><img src={Users} alt="Users" className='img-fluid' /></div>
                                    <div className='leftPanelListName'>Users</div>
                                </li>
                            </NavLink>
                        }
                        {user && (user.role === "all" || user.role === "user") &&
                            <NavLink exact="true" activeclassname="active" to="/add-user">
                                <li>
                                    <div className='leftPanelListIcon'><img src={Users} alt="Users" className='img-fluid' /></div>
                                    <div className='leftPanelListName'>Add Users & Data</div>
                                </li>
                            </NavLink>
                        }
                        {user && (user.role === "all" || user.role === "user") &&
                            <NavLink exact="true" activeclassname="active" to="/all-user-notification">
                                <li>
                                    <div className='leftPanelListIcon'><img src={Users} alt="Users" className='img-fluid' /></div>
                                    <div className='leftPanelListName'>All User Notification</div>
                                </li>
                            </NavLink>
                        }

                    </ul>
                </div>
            </div>
        </>
    )
}

export default LeftPanel