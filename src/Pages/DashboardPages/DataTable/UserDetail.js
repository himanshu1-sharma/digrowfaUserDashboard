import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BASEURL } from "../../Constant";
import Axios from "axios";
import Header from "../../Includes/Header/Header";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPrint,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";
import DeleteModal from "../../Components/DeleteModal";
import { UserState } from "../../Context";
import { Link } from "react-router-dom";
import addIcon from "../../../img/icons/addIconWhite.png";

const UserDetail = () => {
    const [userData, setUserData] = useState();
    const params = useParams();
    const [imgModalShow, setImgModalShow] = React.useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState();
    const [selectedId, setSelectedId] = useState();
    const [render, setRender] = useState(false);
    const { user, setUser } = UserState();
    const [userId, setUserId] = useState();
    const [addProductModalShow, setAddProductModalShow] = React.useState(false);

    const fetchUserData = async () => {
        try {
            await Axios.post(`${BASEURL}api/crm/admin/get-user-details`, {
                userId: params?.id,
            }).then((data) => {
                setUserData(data.data.data[0]);
                // console.log("user data", data.data.data[0]);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Digrowfa-Invoice",
    });

    const myFunction = async () => {
        try {
            await Axios.delete(`${BASEURL}api/products/${selectedId}`);
            setDeleteModal(false);
            setRender(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (render) setRender(false);
        fetchUserData();
    }, [render, user]);

    return (
        <>
            <ImagePrevModal
                show={imgModalShow}
                onHide={() => setImgModalShow(false)}
                selected={selected}
            />
            <DeleteModal
                show={deleteModal}
                onHide={() => setDeleteModal(false)}
                myFunction={myFunction}
            />
            <AddProductModal
                show={addProductModalShow}
                onHide={() => setAddProductModalShow(false)}
                userId={userId}
            />
            <Header />
            <div className="userDetailBg">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-7 col-sm-12 col-12">
                            <div className="mt-3">
                                <Link to="/users">Go Back</Link>
                            </div>
                            <div className="userDetailTabs">
                                <Tabs
                                    defaultActiveKey="profile"
                                    id="justify-tab-example"
                                    className="mb-3"
                                    justify
                                >
                                    <Tab eventKey="profile" title="Profile Information">
                                        <div ref={componentRef} className="p-5">
                                            <div className="userDetailBox">
                                                <div
                                                    className="userDetailProfile"
                                                    style={{
                                                        backgroundImage: `url(${userData?.profilepic})`,
                                                    }}
                                                ></div>
                                                <div className="aboutUser">
                                                    <h1>{userData?.name}</h1>
                                                    <label>@{userData?.username}</label>
                                                    <p>{userData?.title}</p>
                                                </div>
                                            </div>

                                            <div className="userFollow">
                                                <ul>
                                                    <li>
                                                        <span>{userData?.following.length}</span>
                                                        <br />
                                                        Following
                                                    </li>
                                                    <li>
                                                        <span>{userData?.followers.length}</span>
                                                        <br />
                                                        Followers
                                                    </li>
                                                    <li>
                                                        <span>{userData?.products.length}</span>
                                                        <br />
                                                        Product
                                                    </li>
                                                    <li>
                                                        <span>{userData?.service.length}</span>
                                                        <br />
                                                        Service
                                                    </li>
                                                    <li>
                                                        <span>
                                                            {userData?.bmc.length === 1 ? "Yes" : "No"}
                                                        </span>
                                                        <br />
                                                        BMC
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="userDetailBtn">
                                                <a href={`mailto:${userData?.email}`}>
                                                    <button>
                                                        <FontAwesomeIcon icon={faEnvelope} /> Mail
                                                    </button>
                                                </a>
                                                <button onClick={handlePrint}>
                                                    <FontAwesomeIcon icon={faPrint} /> Print
                                                </button>
                                            </div>

                                            <div className="userContentBox">
                                                <ul>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>About</p>
                                                            <span>{userData?.about}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Email</p>
                                                            <span>{userData?.email}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Phone No.</p>
                                                            <span>{userData?.phoneno}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Date of Birth</p>
                                                            <span>{userData?.dob}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Gender</p>
                                                            <span>{userData?.gender}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>State</p>
                                                            <span>{userData?.state}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Pincode</p>
                                                            <span>{userData?.pincode}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Joining Date</p>
                                                            <span>
                                                                {moment(userData?.created_ts).format(
                                                                    "MMMM Do YYYY, h:mm:ss a"
                                                                )}
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Email Verification</p>
                                                            <span>
                                                                {userData?.isEmailVerified
                                                                    ? "Verified"
                                                                    : "Not Verified"}
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="userContent">
                                                            <p>Phone Verification</p>
                                                            <span>
                                                                {userData?.isPhoneVerified
                                                                    ? "Verified"
                                                                    : "Not Verified"}
                                                            </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="product" title="Product">
                                        <div className="productMainBox">
                                            <div className="categoryBtnList mb-4">
                                                <ul>
                                                    <li>
                                                        <button
                                                            className="dashboardAddBtn"
                                                            onClick={() => {
                                                                setAddProductModalShow(true);
                                                                setUserId(userData?._id);
                                                            }}
                                                        >
                                                            <img
                                                                src={addIcon}
                                                                alt="addIcon"
                                                                className="img-fluid"
                                                            />{" "}
                                                            Add Product
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            {userData && userData?.products.length >= 1 ? (
                                                <>
                                                    <div className="row">
                                                        {userData?.products.map((curElt) => {
                                                            return (
                                                                <>
                                                                    <div className="col-xl-4 col-lg-4 col-sm-4 col-sm-12 col-12">
                                                                        <div className="productBox">
                                                                            <div
                                                                                className="productImg"
                                                                                style={{
                                                                                    backgroundImage: `url(${curElt?.image1?.location})`,
                                                                                }}
                                                                            ></div>
                                                                            <div className="productDetail">
                                                                                <h4>{curElt?.title}</h4>
                                                                                <p>{curElt?.description}</p>
                                                                                <h6>₹{curElt?.price}</h6>
                                                                                <div className="actionBtn productBtn">
                                                                                    <button
                                                                                        className="response"
                                                                                        onClick={() => {
                                                                                            setSelected(curElt);
                                                                                            setImgModalShow(true);
                                                                                        }}
                                                                                    >
                                                                                        View
                                                                                    </button>
                                                                                    <button
                                                                                        className="delete"
                                                                                        onClick={() => {
                                                                                            setSelectedId(curElt._id);
                                                                                            setDeleteModal(true);
                                                                                        }}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>No Product Found</p>
                                            )}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="service" title="Service">
                                        {userData && userData?.service.length >= 1 ? (
                                            <>
                                                <div className="row">
                                                    {userData?.service.map((curElt) => {
                                                        return (
                                                            <>
                                                                <div className="col-xl-4 col-lg-4 col-sm-4 col-sm-12 col-12">
                                                                    <div className="productBox">
                                                                        <div
                                                                            className="productImg service"
                                                                            style={{
                                                                                backgroundImage: `url(${curElt?.image1?.location})`,
                                                                            }}
                                                                        ></div>
                                                                        <div className="productDetail">
                                                                            <h4>{curElt?.title}</h4>
                                                                            <p>{curElt?.description}</p>
                                                                            <h6>₹{curElt?.price}</h6>
                                                                            <div className="actionBtn productBtn">
                                                                                <button
                                                                                    className="response"
                                                                                    onClick={() => {
                                                                                        setSelected(curElt);
                                                                                        setImgModalShow(true);
                                                                                    }}
                                                                                >
                                                                                    View
                                                                                </button>
                                                                                <button
                                                                                    className="delete"
                                                                                    onClick={() => {
                                                                                        setSelectedId(curElt._id);
                                                                                        setDeleteModal(true);
                                                                                    }}
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        ) : (
                                            <p>No Service Found</p>
                                        )}
                                    </Tab>
                                    <Tab eventKey="video" title="Video">
                                        <p>No Video Found</p>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetail;

function ImagePrevModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="addCategoryModal">
                <div className="closeModalBtn" onClick={props.onHide}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <div className="productImgModalContent">
                    <h4>{props.selected?.title}</h4>
                    <Swiper
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                    >
                        {props.selected?.image1 ? (
                            <SwiperSlide>
                                <div
                                    className="productImgPrev"
                                    style={{
                                        backgroundImage: `url(${props.selected?.image1?.location})`,
                                    }}
                                ></div>
                            </SwiperSlide>
                        ) : (
                            ""
                        )}

                        {props.selected?.image2 ? (
                            <SwiperSlide>
                                <div
                                    className="productImgPrev"
                                    style={{
                                        backgroundImage: `url(${props.selected?.image2?.location})`,
                                    }}
                                ></div>
                            </SwiperSlide>
                        ) : (
                            ""
                        )}
                        {props.selected?.image3 ? (
                            <SwiperSlide>
                                <div
                                    className="productImgPrev"
                                    style={{
                                        backgroundImage: `url(${props.selected?.image3?.location})`,
                                    }}
                                ></div>
                            </SwiperSlide>
                        ) : (
                            ""
                        )}
                        {props.selected?.image4 ? (
                            <SwiperSlide>
                                <div
                                    className="productImgPrev"
                                    style={{
                                        backgroundImage: `url(${props.selected?.image4?.location})`,
                                    }}
                                ></div>
                            </SwiperSlide>
                        ) : (
                            ""
                        )}
                        {props.selected?.image5 ? (
                            <SwiperSlide>
                                <div
                                    className="productImgPrev"
                                    style={{
                                        backgroundImage: `url(${props.selected?.image5?.location})`,
                                    }}
                                ></div>
                            </SwiperSlide>
                        ) : (
                            ""
                        )}
                    </Swiper>
                </div>
            </div>
        </Modal>
    );
}

function AddProductModal(props) {
    console.log(props.userId);
    const [category, setcategory] = useState();
    const [selectCategory, setSelectCategory] = useState("");
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [image4, setImage4] = useState("")
    const [image5, setImage5] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [detail, setDetail] = useState([])
    const [detailData, setDetailData] = useState("")
    const [tags, setTags] = useState([])
    const [tagsData, setTagsData] = useState("")
    const [price, setPrice] = useState("")
    const [calltoaction, setCalltoaction] = useState({ phone: "" })
    const [isProduct, setIsProduct] = useState(true)
    const [categoryID, setCategoryID] = useState("63ea0145f5a7b2a2e5ff6e48")



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("userid", props.userId);
            // console.log("image1", image1);
            // console.log("image2", image2);
            // console.log("image3", image3);
            // console.log("image4", image4);
            // console.log("image5", image5);
            // console.log("title", title);
            // console.log("description", description);
            // console.log("detail", detail);
            // console.log("tags", tags);
            // console.log("price", price);
            // console.log("superCategoryId", selectCategory);
            // console.log("isProduct", isProduct);
            // console.log("calltoaction", calltoaction);
            // console.log("categoryId", categoryID);

            await Axios.post(`http://3.110.231.135:3001/api/products`, {
                userid: props.userId,
                price: price,
                description: description,
                superCategoryId: selectCategory,
                detail: JSON.stringify(detail),
                tags: JSON.stringify(tags),
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
                image5: image5,
                title: title,
                isProduct: isProduct,
                calltoaction: JSON.stringify(calltoaction),
                categoryId: categoryID
            })
                .then(data => {
                    if (data.data.errorcode === 0) {
                        props.onHide()
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    };

    const getCategory = async () => {
        try {
            await Axios.get(`${BASEURL}api/category/product`).then((data) => {
                setcategory(data.data.data);
            });
        } catch (error) {
            console.log(error.msg);
        }
    };

    const handleAddInput = () => {

        setDetail([...detail, detailData])
    }

    const handleAddTags = () => {
        setTags([...tags, tagsData])
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="addCategoryModal">
                    <div className="closeModalBtn" onClick={props.onHide}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h4>Add Product</h4>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="image1"
                                        id="image1"
                                        placeholder="image1"
                                        value={image1}
                                        onChange={(e) => setImage1(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="image2"
                                        id="image2"
                                        placeholder="image2"
                                        value={image2}
                                        onChange={(e) => setImage2(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="image3"
                                        id="image3"
                                        placeholder="image3"
                                        value={image3}
                                        onChange={(e) => setImage3(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="image4"
                                        id="image4"
                                        placeholder="image4"
                                        value={image4}
                                        onChange={(e) => setImage4(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="formInput">
                            <input
                                type="file"
                                name="image5"
                                id="image5"
                                placeholder="Title"
                                value={image5}
                                onChange={(e) => setImage5(e.target.value)}
                            />
                        </div>
                        <div className="formInput">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="formInput">
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                rows={5}
                                cols={5}
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="text"
                                        name="detail1"
                                        id="detail1"
                                        placeholder="add . then add content"
                                        value={detailData}
                                        onChange={(e) => setDetailData(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="formBtn">
                                    <button onClick={handleAddInput} type="button">Add</button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="text"
                                        name="detail1"
                                        id="detail1"
                                        placeholder="add . then add content"
                                        value={tagsData}
                                        onChange={(e) => setTagsData(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="formBtn">
                                    <button onClick={handleAddTags} type="button">Add</button>
                                </div>
                            </div>
                        </div>

                        <div className="formInput">
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="formInput">
                            <select
                                value={selectCategory}
                                onChange={(e) => setSelectCategory(e.target.value)}
                            >
                                <option selected>Choose Category</option>
                                {category &&
                                    category.map((curCat) => {
                                        return (
                                            <>
                                                <option value={curCat._id}>{curCat.name}</option>
                                            </>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className="formBtn">
                            <button onClick={handleSubmit} type="button">Done</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
