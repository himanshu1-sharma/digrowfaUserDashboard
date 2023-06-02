import React, { useState, useEffect } from "react";
import Header from "../Includes/Header/Header";
import LeftPanel from "../Includes/LeftPanel/LeftPanel";
import { UserState } from "../Context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import Accordion from "react-bootstrap/Accordion";
import addIcon from "../../img/icons/addIconWhite.png";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { BASEURL, APP_BASEURL } from "../Constant";
import Form from "react-bootstrap/Form";
import editProfile from "../../img/icons/editProfile.webp";

const AddUser = () => {
    const { user, setUser } = UserState();
    const navigate = useNavigate();
    const [addUserModal, setAddUserModal] = React.useState(false);
    const [digrowfaUser, setDigrowfaUser] = useState();
    const [selectUser, setSelectUser] = useState("");
    const [selectAddType, setSelectAddType] = useState("");
    const [addProductShow, setAddProductShow] = React.useState(false);
    const [addServiceShow, setAddServiceShow] = React.useState(false);
    const [addStoryShow, setAddStoryShow] = React.useState(false);
    const [addShoutShow, setAddShoutShow] = React.useState(false);
    const [selectUserId, setSelectedUserId] = useState();

    const fetchDigrowfaUser = async () => {
        await Axios.get(`${BASEURL}api/crm/admin/get-all-demo-users`).then(
            (data) => {
                setDigrowfaUser(data.data.data);
            }
        );
    };

    const handleAddDataSubmit = async (e) => {
        e.preventDefault();
        // console.log("select user", selectUser)
        // console.log("selectAddType", selectAddType)
        setSelectUser("");
        setSelectAddType("");

        if (selectAddType === "product") {
            setAddProductShow(true);
            setSelectedUserId(selectUser);
        } else if (selectAddType === "service") {
            setAddServiceShow(true);
            setSelectedUserId(selectUser);
        } else if (selectAddType === "story") {
            setAddStoryShow(true);
            setSelectedUserId(selectUser);
        } else if (selectAddType === "shout") {
            setAddShoutShow(true);
            setSelectedUserId(selectUser);
        }
    };

    useEffect(() => {
        fetchDigrowfaUser();
        if (!(user && (user.role === "all" || user.role === "user"))) {
            navigate("/login");
        }
    }, [user]);

    return (
        <>
            <ToastContainer />
            <AddUserModal show={addUserModal} onHide={() => setAddUserModal(false)} />
            <AddProductModal
                show={addProductShow}
                onHide={() => setAddProductShow(false)}
                selectUserId={selectUserId}
            />
            <AddServiceModal
                show={addServiceShow}
                onHide={() => setAddServiceShow(false)}
                selectUserId={selectUserId}
            />
            <AddStoryModal
                show={addStoryShow}
                onHide={() => setAddStoryShow(false)}
                selectUserId={selectUserId}
            />
            <AddShoutModal
                show={addShoutShow}
                onHide={() => setAddShoutShow(false)}
                selectUserId={selectUserId}
            />
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="mobileHide">
                            <LeftPanel />
                        </div>
                    </div>
                    <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="dashboardMainBox">
                            <div className="title">
                                <h4>Add User</h4>
                            </div>
                            <div className="dashboardAccordion">
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Add User</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="categoryBtnList">
                                                <ul>
                                                    <li>
                                                        <button
                                                            className="dashboardAddBtn"
                                                            onClick={() => setAddUserModal(true)}
                                                        >
                                                            <img
                                                                src={addIcon}
                                                                alt="addIcon"
                                                                className="img-fluid"
                                                            />{" "}
                                                            Add User
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Add User Data</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="categoryBtnList">
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div className="formInput">
                                                                <Form.Select
                                                                    value={selectUser}
                                                                    onChange={(e) =>
                                                                        setSelectUser(e.target.value)
                                                                    }
                                                                >
                                                                    <option>Select User</option>
                                                                    {digrowfaUser &&
                                                                        digrowfaUser.map((curElt) => {
                                                                            return (
                                                                                <>
                                                                                    <option value={curElt._id}>
                                                                                        {curElt.name}
                                                                                    </option>
                                                                                </>
                                                                            );
                                                                        })}
                                                                </Form.Select>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div className="formInput">
                                                                <Form.Select
                                                                    value={selectAddType}
                                                                    onChange={(e) =>
                                                                        setSelectAddType(e.target.value)
                                                                    }
                                                                >
                                                                    <option>Choose what you want to add</option>
                                                                    <option value="product">Product</option>
                                                                    <option value="service">Service</option>
                                                                    <option value="story">Story</option>
                                                                    <option value="shout">Shout</option>
                                                                </Form.Select>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div className="formBtn mt-2">
                                                                <button onClick={handleAddDataSubmit}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;

// ========add user=========
function AddUserModal(props) {
    const [chooseCategory, setChooseCategory] = useState();
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [categoryId, setCategoryId] = useState([]);
    const [countrycode, setCountrycode] = useState("91")
    const [phoneno, setPhoneno] = useState("")
    const [imgPrev, setImgPrev] = useState(editProfile);

    const fetchCategory = async () => {
        await Axios.get(`${BASEURL}api/category`).then((data) => {
            setChooseCategory(data.data.data);
        });
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImgPrev(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log("profilepic", image);

            const formData = new FormData()
            formData.append("name", name);
            formData.append("categoryid", categoryId);
            formData.append("email", email);
            formData.append("profilePic", image);
            formData.append("password", password);
            formData.append("username", username);
            formData.append("countrycode", countrycode);
            formData.append("phoneno", phoneno);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }

            await Axios.post(`${BASEURL}api/crm/admin/create-user`, formData, config).then((data) => {
                if (data.data.errorcode === 0) {
                    toast.success(`${data.data.msg}`, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    props.onHide();
                } else {
                    toast.error(`${data.data.msg}`, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="addCategoryModal">
                    <div className="closeModalBtn" onClick={props.onHide}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h4>Add User</h4>
                    <form>
                        <div className="profileFormGroupImg">
                            <label for="file">
                                <img
                                    src={editProfile}
                                    alt="editProfile"
                                    className="img-fluid"
                                />
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={(e) => uploadFileHandler(e)}
                                hidden
                            />
                            <div
                                className="studentProfilePic"
                                style={{ backgroundImage: `url(${imgPrev})` }}
                            ></div>
                        </div>
                        <div className="formInput">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="formInput">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {/* <div className="formInput">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div> */}
                        <div className="formInput">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="formInput">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="formInput">
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option selected>Choose Category</option>
                                {chooseCategory &&
                                    chooseCategory.map((curElt) => {
                                        return (
                                            <>
                                                <option value={curElt._id}>{curElt.name}</option>
                                            </>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="formBtn">
                            <button onClick={handleSubmit}>Done</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

// =====add product=====

function AddProductModal(props) {
    // console.log("selectUserId", props.selectUserId)
    const [category, setcategory] = useState();
    const [selectCategory, setSelectCategory] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState([]);
    const [detailData, setDetailData] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsData, setTagsData] = useState("");
    const [price, setPrice] = useState("");
    const [calltoactionName, setCalltoactionName] = useState("")
    const [calltoactionValue, setCalltoactionValue] = useState("")
    let [calltoaction, setCalltoaction] = useState({});
    const [isProduct, setIsProduct] = useState(true);
    const [categoryID, setCategoryID] = useState("63ea0145f5a7b2a2e5ff6e48");
    const [offerPrice, setOfferPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("userid", props.selectUserId);
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
            // console.log("calltoaction", JSON.stringify(calltoaction));
            // console.log("categoryId", categoryID);
            // console.log("offerprice", offerPrice);

            const formData = new FormData();
            formData.append("userid", props.selectUserId);
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);
            formData.append("image4", image4);
            formData.append("image5", image5);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("detail", JSON.stringify(detail));
            formData.append("tags", JSON.stringify(tags));
            formData.append("price", price);
            formData.append("superCategoryId", selectCategory);
            formData.append("isProduct", isProduct);
            formData.append("calltoaction", JSON.stringify(calltoaction));
            formData.append("categoryId", categoryID);
            formData.append("offerprice", offerPrice);
            console.log("calltoaction", calltoaction)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            await Axios.post(`${BASEURL}api/crm/add-product-service`, formData, config).then(
                (data) => {
                    if (data.data.errorcode === 0) {
                        toast.success(`${data.data.msg}`, {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        props.onHide();
                        setcategory("")
                        setSelectCategory("")
                        setImage1("")
                        setImage2("")
                        setImage3("")
                        setImage4("")
                        setImage5("")
                        setTitle("")
                        setDescription("")
                        setDetail([])
                        setTags([])
                        setOfferPrice("")
                        setCalltoactionName("")
                        setCalltoactionValue("")
                    } else {
                        toast.error(`${data.data.msg}`, {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            );
        } catch (error) {
            console.log(error.message);
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

    const uploadImage1 = (e) => {
        const image1 = e.target.files[0];
        setImage1(image1);
    };
    const uploadImage2 = (e) => {
        const image2 = e.target.files[0];
        setImage2(image2);
    };
    const uploadImage3 = (e) => {
        const image3 = e.target.files[0];
        setImage3(image3);
    };
    const uploadImage4 = (e) => {
        const image4 = e.target.files[0];
        setImage4(image4);
    };
    const uploadImage5 = (e) => {
        const image5 = e.target.files[0];
        setImage5(image5);
    };

    const handleAddInput = () => {
        setDetail([...detail, detailData]);
        setDetailData("")
    };

    const handleRemoveDetail = (index) => {
        const newDetail = [...detail];
        newDetail.splice(index, 1);
        setDetail(newDetail);
    };

    const handleAddTags = () => {
        setTags([...tags, tagsData]);
        setTagsData("");
    };
    const handleRemoveTags = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const addCallToCation = async () => {
        let action = calltoactionName;
        let value = calltoactionValue
        setCalltoaction({ [action]: value })
        setCalltoactionName("")
        setCalltoactionValue("")


    }
    console.log("calltocation", calltoaction)


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
                                        onChange={(e) => uploadImage1(e)}
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
                                        onChange={(e) => uploadImage2(e)}
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
                                        onChange={(e) => uploadImage3(e)}
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
                                        onChange={(e) => uploadImage4(e)}
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
                                onChange={(e) => uploadImage5(e)}
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
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="detail1"
                                            id="detail1"
                                            placeholder="add detail"
                                            value={detailData}
                                            onChange={(e) => setDetailData(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={handleAddInput} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="tagsList">
                                    <ul>
                                        {detail &&
                                            detail.map((curTag, index) => {
                                                return (
                                                    <>
                                                        <li>
                                                            {curTag}{" "}
                                                            <span
                                                                onClick={(index) => handleRemoveDetail(index)}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            placeholder="add tags"
                                            value={tagsData}
                                            onChange={(e) => setTagsData(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={handleAddTags} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">

                                <div className="tagsList">
                                    <ul>
                                        {tags &&
                                            tags.map((curTag, index) => {
                                                return (
                                                    <>
                                                        <li>
                                                            {curTag}{" "}
                                                            <span
                                                                onClick={(index) => handleRemoveTags(index)}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="formInput">
                                    <select
                                        value={calltoactionName}
                                        onChange={(e) => setCalltoactionName(e.target.value)}
                                    >
                                        <option selected>Choose Call to Action</option>
                                        <option value="email">email</option>
                                        <option value="phone">Phone</option>
                                        <option value="whatsapp">whatsapp</option>
                                        <option value="website">website</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="formInput">
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="calltoaction"
                                            id="calltoaction"
                                            placeholder={calltoactionName === "phone" ? "Enter Phone Number" :
                                                calltoactionName === "email" ? "Enter Email" :
                                                    calltoactionName === "whatsapp" ? "Enter Whatsapp Number" :
                                                        calltoactionName === "website" ? "Enter Website Url" : null
                                            }
                                            value={calltoactionValue}
                                            onChange={(e) => setCalltoactionValue(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={addCallToCation} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                {`call to action = ${calltoactionName}: ${calltoactionValue}`}
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
                            <input
                                type="number"
                                name="offerprice"
                                id="offerprice"
                                placeholder="offer price"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
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
                            <button onClick={handleSubmit} type="button">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

// =======add service======

function AddServiceModal(props) {
    // console.log("selectUserId", props.selectUserId)
    const [category, setcategory] = useState();
    const [selectCategory, setSelectCategory] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState([]);
    const [detailData, setDetailData] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsData, setTagsData] = useState("");
    const [price, setPrice] = useState("");
    const [calltoactionName, setCalltoactionName] = useState("")
    const [calltoactionValue, setCalltoactionValue] = useState("")
    let [calltoaction, setCalltoaction] = useState({});
    const [isService, setIsService] = useState(true);
    const [categoryID, setCategoryID] = useState("63ea0145f5a7b2a2e5ff6e48");
    const [offerPrice, setOfferPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("userid", props.selectUserId);
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
            // console.log("isService", isService);
            // console.log("calltoaction", calltoaction);
            // console.log("categoryId", categoryID);
            // console.log("offerprice", offerPrice);

            const formData = new FormData();
            formData.append("userid", props.selectUserId);
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);
            formData.append("image4", image4);
            formData.append("image5", image5);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("detail", JSON.stringify(detail));
            formData.append("tags", JSON.stringify(tags));
            formData.append("price", price);
            formData.append("superCategoryId", selectCategory);
            formData.append("isService", isService);
            formData.append("calltoaction", JSON.stringify(calltoaction));
            formData.append("categoryId", categoryID);
            formData.append("offerprice", offerPrice);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            await Axios.post(`${BASEURL}api/crm/add-product-service`, formData, config).then(
                (data) => {
                    if (data.data.errorcode === 0) {
                        toast.success(`${data.data.msg}`, {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        props.onHide();
                        setcategory("")
                        setSelectCategory("")
                        setImage1("")
                        setImage2("")
                        setImage3("")
                        setImage4("")
                        setImage5("")
                        setTitle("")
                        setDescription("")
                        setDetail([])
                        setTags([])
                        setOfferPrice("")
                        calltoactionName("")
                        calltoactionValue("")
                    } else {
                        toast.error(`${data.data.msg}`, {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCategory = async () => {
        try {
            await Axios.get(`${BASEURL}api/category/service`).then((data) => {
                setcategory(data.data.data);
            });
        } catch (error) {
            console.log(error.msg);
        }
    };

    const uploadImage1 = (e) => {
        const image1 = e.target.files[0];
        setImage1(image1);
    };
    const uploadImage2 = (e) => {
        const image2 = e.target.files[0];
        setImage2(image2);
    };
    const uploadImage3 = (e) => {
        const image3 = e.target.files[0];
        setImage3(image3);
    };
    const uploadImage4 = (e) => {
        const image4 = e.target.files[0];
        setImage4(image4);
    };
    const uploadImage5 = (e) => {
        const image5 = e.target.files[0];
        setImage5(image5);
    };

    const handleAddInput = () => {
        setDetail([...detail, detailData]);
        setDetailData("")
    };

    const handleRemoveDetail = (index) => {
        const newDetail = [...detail];
        newDetail.splice(index, 1);
        setDetail(newDetail);
    };

    const handleAddTags = () => {
        setTags([...tags, tagsData]);
        setTagsData("");
    };
    const handleRemoveTags = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const addCallToCation = async () => {
        let action = calltoactionName;
        let value = calltoactionValue
        setCalltoaction({ [action]: value })
        setCalltoactionName("")
        setCalltoactionValue("")

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
                    <h4>Add Service</h4>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="image1"
                                        id="image1"
                                        placeholder="image1"
                                        onChange={(e) => uploadImage1(e)}
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
                                        onChange={(e) => uploadImage2(e)}
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
                                        onChange={(e) => uploadImage3(e)}
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
                                        onChange={(e) => uploadImage4(e)}
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
                                onChange={(e) => uploadImage5(e)}
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
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="detail1"
                                            id="detail1"
                                            placeholder="add detail"
                                            value={detailData}
                                            onChange={(e) => setDetailData(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={handleAddInput} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="tagsList">
                                    <ul>
                                        {detail &&
                                            detail.map((curTag, index) => {
                                                return (
                                                    <>
                                                        <li>
                                                            {curTag}{" "}
                                                            <span
                                                                onClick={(index) => handleRemoveDetail(index)}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            placeholder="add tags"
                                            value={tagsData}
                                            onChange={(e) => setTagsData(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={handleAddTags} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">

                                <div className="tagsList">
                                    <ul>
                                        {tags &&
                                            tags.map((curTag, index) => {
                                                return (
                                                    <>
                                                        <li>
                                                            {curTag}{" "}
                                                            <span
                                                                onClick={(index) => handleRemoveTags(index)}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="formInput">
                                    <select
                                        value={calltoactionName}
                                        onChange={(e) => setCalltoactionName(e.target.value)}
                                    >
                                        <option selected>Choose Call to Action</option>
                                        <option value="email">email</option>
                                        <option value="phone">Phone</option>
                                        <option value="whatsapp">whatsapp</option>
                                        <option value="website">website</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="formInput">
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="calltoaction"
                                            id="calltoaction"
                                            placeholder={calltoactionName === "phone" ? "Enter Phone Number" :
                                                calltoactionName === "email" ? "Enter Email" :
                                                    calltoactionName === "whatsapp" ? "Enter Whatsapp Number" :
                                                        calltoactionName === "website" ? "Enter Website Url" : null
                                            }
                                            value={calltoactionValue}
                                            onChange={(e) => setCalltoactionValue(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={addCallToCation} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                {`call to action = ${calltoactionName}: ${calltoactionValue}`}
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
                            <input
                                type="number"
                                name="offerprice"
                                id="offerprice"
                                placeholder="offer price"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
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
                            <button onClick={handleSubmit} type="button">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

// ========story======

function AddStoryModal(props) {
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsData, setTagsData] = useState("");
    const [link, setLink] = useState("");
    const [media, setMedia] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const handleAddTags = () => {
        setTags([...tags, tagsData]);
        setTagsData("");
    };
    const handleRemoveTags = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const uploadMedia = (e) => {
        const file = e.target.files[0];
        setMedia(file);
    };
    const uploadThumbnail = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("userid", props.selectUserId);
            // console.log("story-media", media);
            // console.log("description", description);
            // console.log("tags", tags);
            const formData = new FormData();
            formData.append("userid", props.selectUserId);
            formData.append("story-media", media);
            formData.append("thumbnail", thumbnail);
            formData.append("description", description);
            formData.append("tags", tags);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            await Axios.post(
                `${BASEURL}api/crm/post-story`,
                formData,
                config
            ).then((data) => {
                if (data.data.errorcode === 0) {
                    toast.success(`${data.data.msg}`, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    props.onHide();
                } else {
                    toast.error(`${data.data.msg}`, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

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
                    <h4>Add Story</h4>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="image1"
                                        id="image1"
                                        placeholder="image1"
                                        onChange={(e) => uploadMedia(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="formInput">
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        id="thumbnail"
                                        placeholder="thumbnail"
                                        onChange={(e) => uploadThumbnail(e)}
                                    />
                                </div>
                            </div>
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
                            <div className="col-7">
                                <div className="formInput">
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            placeholder="add tags"
                                            value={tagsData}
                                            onChange={(e) => setTagsData(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={handleAddTags} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="tagsList">
                                    <ul>
                                        {tags &&
                                            tags.map((curTag, index) => {
                                                return (
                                                    <>
                                                        <li>
                                                            {curTag}{" "}
                                                            <span
                                                                onClick={(index) => handleRemoveTags(index)}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="formInput">
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder="Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>
                        <div className="formBtn">
                            <button onClick={handleSubmit} type="button">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

// ========shout======

function AddShoutModal(props) {
    // console.log("props", props)

    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsData, setTagsData] = useState("");
    const [link, setLink] = useState("");
    const [media, setMedia] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [category, setcategory] = useState();
    const [topic, setTopic] = useState();
    const [selectCategory, setSelectCategory] = useState("");
    const [selectTopic, setSelectTopic] = useState("");
    const [addCategories, setAddCategories] = useState([]);
    const [addTopics, setAddTopics] = useState([]);
    const [duration, setDuration] = useState(2);

    const handleAddTags = () => {
        setTags([...tags, tagsData]);
        setTagsData("");
    };

    const handleAddTopics = () => {
        if (addTopics.length === 5) {
            alert("You can't add more than 5 topics");
            return;
        }
        if (!addCategories.includes(selectCategory)) {
            setAddCategories([...addCategories, selectCategory]);
            setAddTopics([...addTopics, { category: selectCategory, topic: selectTopic }]);
        }
        else {
            let i;
            for (i = 0; i < addTopics.length; ++i) {
                if (addTopics[i].selectCategory === selectCategory && addTopics[i].selectTopic === selectTopic)
                    break;
            }
            if (i === addTopics.length)
                setAddTopics([...addTopics, { category: selectCategory, topic: selectTopic }]);
            else
                alert("You have already added this topic");
        }
        // setSelectCategory("");
        setSelectTopic("");
    }

    const uploadMedia = (e) => {
        const file = e.target.files[0];
        setMedia(file);
    };
    const uploadThumbnail = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("userid :", props.selectUserId);
            // console.log("shoutfile :", media);
            // console.log("thumbnail :", thumbnail);
            // console.log("category :", addCategories);
            // console.log("topics :", addTopics);
            // console.log("duration :", duration);
            // console.log("tags :", tags);
            // console.log("link :", link);
            // console.log("text :", text);
            if (addCategories.length < 1) {
                alert('Please select atleast one category')
                return;
            }
            const formData = new FormData();
            formData.append("userId", props.selectUserId);
            formData.append("shoutfile", media);
            formData.append("thumbnail", thumbnail);
            formData.append("category", JSON.stringify(addCategories));
            formData.append("topics", JSON.stringify(addTopics));
            formData.append("duration", duration);
            formData.append("tags", JSON.stringify(tags));
            formData.append("link", link);
            formData.append("text", text);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            await Axios.post(`${BASEURL}api/crm/upload-shout`, formData, config)
                .then((data) => {
                    if (data.data.errorcode === 0) {
                        toast.success(`${data.data.msg}`, {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        alert("Shout uploaded successfully");
                        props.onHide();
                    } else {
                        toast.error(`${data.data.msg}`, {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        alert("Shout uploaded failed");
                    }
                });
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCategory = async () => {
        try {
            await Axios.get(`${BASEURL}api/crm/get-categories`).then(
                (data) => {
                    setcategory(data.data.data);
                    console.log("data.data.data", data.data.data);
                }
            );
        } catch (error) {
            console.log(error.msg);
        }
    };

    const setCategoryAndTopics = (e) => {
        setSelectCategory(e.target.value);
        for (let cat of category) {
            if (cat._id === e.target.value) {
                setTopic(cat.topics);
                break;
            }
        }
    }


    const handleRemoveTags = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

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
                    <h4>Add Shout</h4>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <Form.Label>Video</Form.Label>
                                    <input
                                        type="file"
                                        name="image1"
                                        id="image1"
                                        placeholder="image1"
                                        onChange={(e) => uploadMedia(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="formInput">
                                    <Form.Label>Thumbnail</Form.Label>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        id="thumbnail"
                                        placeholder="thumbnail"
                                        onChange={(e) => uploadThumbnail(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="formInput">
                                    <select
                                        value={selectCategory}
                                        onChange={(e) => setCategoryAndTopics(e)}
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
                            </div>
                            <div className="col-6">
                                {/* <div className="formInput">
                                    <input
                                        type="text"
                                        name="duration"
                                        id="duration"
                                        placeholder="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </div> */}
                                <div className="formInput">
                                    <select
                                        value={selectTopic}
                                        onChange={(e) => setSelectTopic(e.target.value)}
                                    >
                                        <option selected>Choose Topic</option>
                                        {topic &&
                                            topic.map((curTopic) => {
                                                return (
                                                    <>
                                                        <option value={curTopic?._id}>{curTopic?.topic}</option>
                                                    </>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className="formBtn">
                                <button onClick={handleAddTopics} type="button">
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="formInput">
                            <textarea
                                type="text"
                                name="text"
                                id="text"
                                rows={5}
                                cols={5}
                                placeholder="Add Text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-7">
                                <div className="formInput">
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            placeholder="add tags"
                                            value={tagsData}
                                            onChange={(e) => setTagsData(e.target.value)}
                                        />
                                        <div className="formBtn">
                                            <button onClick={handleAddTags} type="button">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="tagsList">
                                    <ul>
                                        {tags &&
                                            tags.map((curTag, index) => {
                                                return (
                                                    <>
                                                        <li>
                                                            {curTag}{" "}
                                                            <span
                                                                onClick={(index) => handleRemoveTags(index)}
                                                            >
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="formInput">
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder="Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>
                        <div className="formBtn">
                            <button onClick={handleSubmit} type="button">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}