import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import { SideBarData } from './SideBarData'

import UserIcon from '../../assets/images/icons/profile-user.svg';
import LogoIcon from '../../assets/images/s-logo.svg';

import './styles.css'

function SideBar() {
    const { user } = useAuth();
    const location = useLocation()

    return (
        <div id="dashboard-sidebar">
            <div className="logo-content btn">
                <Link to="/">
                    <img src={LogoIcon} alt="Stor" className="logo-icon icon" />
                    <h2 className="title">stor</h2>
                </Link>
            </div>
            <div className="menu">
                <ul className="sidebar-list">
                    {
                        SideBarData.map((value, key) => {
                            return (
                                <li 
                                key={key} 
                                id={location.pathname === value.link ? "active" : ""}
                                className="btn"
                                >
                                    <Link to={value.link}>
                                        <div className="icon">{value.icon}</div>
                                        <span className="title">{value.title}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="avatar">
                <Link to="profil">
                    <img src={user?.image ? user?.image?.url : UserIcon} alt={user?.image?.name} />
                    <h4>{user?.name} {user?.surname}</h4>
                </Link>
            </div>
        </div>
    )
}

export default SideBar;