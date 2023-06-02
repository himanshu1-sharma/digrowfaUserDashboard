import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Pages/DashboardPages/Dashboard'
import Management from '../Pages/DashboardPages/Management'
import Users from '../Pages/DashboardPages/Users'
import ScrollToTop from '../Pages/ScrollToTop'
import Login from '../Pages/DashboardPages/Login'
import UserDetail from '../Pages/DashboardPages/DataTable/UserDetail'
import AddUser from '../Pages/DashboardPages/AddUser'
import UserNotification from '../Pages/DashboardPages/UserNotification'
import UserChatPanel from '../Pages/DashboardPages/DataTable/UserChatPanel'

const Routers = () => {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/all-user-notification" element={<UserNotification />} />
                    <Route path="/user-detail/:name/:id" element={<UserDetail />} />
                    <Route path="/user-chat-room/:name/:id" element={<UserChatPanel />} />
                </Routes>
            </ScrollToTop>
        </>
    )
}

export default Routers