import React, { forwardRef, useEffect, useState } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from "@material-ui/icons";

import { BASEURL } from "../../Constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../Context";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const UserList = () => {
    const [data, setData] = useState("");

    const fetchData = async () => {
        try {
            await Axios.get(`${BASEURL}api/crm/admin/get-all-user-notification`)
                .then(data => {
                    console.log(data.data.data)
                })
        } catch (error) {
            console.log(error.msg)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns = [
        { title: "ID", field: "_id" },
        {
            title: "NAME",
            field: "name",
        },
    ];




    return (
        <>
            <ToastContainer />

            <MaterialTable
                title={"All Users Notification"}
                // data={data}
                columns={columns}
                icons={tableIcons}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    pageSize: 20,
                }}
            />

        </>
    );
};

export default UserList;


