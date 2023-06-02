import React, { useState, useEffect } from 'react'
import LeftPanel from '../Includes/LeftPanel/LeftPanel'
import '../DashboardPages/Dashboard.css'
import { Link } from 'react-router-dom'
import userIcon from '../../img/icons/userWhite.png'
import Header from '../Includes/Header/Header'
import { BASEURL } from '../Constant'
import Axios from 'axios'
import { UserState } from '../Context'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [data, setData] = useState()
    const { user, setUser } = UserState()
    const navigate = useNavigate()

    const fetchDummyData = async () => {
        try {
            await Axios.get(`${BASEURL}api/crm/admin/get-all-demo-users`)
                .then(data => {
                    setData(data.data.data)
                })
        } catch (error) {
            console.log(error.msg)
        }
    }


    useEffect(() => {
        if (user && user.token) {
            fetchDummyData()
        }
        else {
            navigate('/login')
        }
    }, [user])

    return (
        <>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='mobileHide'>
                            <LeftPanel />
                        </div>
                    </div>
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dashboardMainBox'>
                            <div className='title'>
                                <h4>Dashboard</h4>
                            </div>
                            <div className='dashboardCardBox'>
                                <div className='row'>
                                    {user && (user.role === "all" || user.role === "user") &&
                                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12'>
                                            <Link to='/users'>
                                                <div className='dashboardCard one'>
                                                    <div className='dashboardCardHeader'>
                                                        <ul>
                                                            <li>Digrowfa User</li>
                                                            <li>
                                                                <div className='dashboardCardIcon'>
                                                                    <img src={userIcon} alt="userIcon" className='img-fluid' />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='dashboardCardBody'>
                                                        <h2>{data?.length}</h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard