import React, { useState } from 'react'
import Constants from '../../../core/common/constant';
import LoginPopup from '../popup/login-popup';
import LoadingFullPage from '../controls/loading';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { SuccessMessage } from '../toast/toastMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from '../popup/confirm-modal';
import RegisterPopup from '../popup/register-modal';

const HeaderPage = () => {
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
    const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
    const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let pathname = location.pathname;
    const onOpenMobileMenu = () => {
        setIsOpenMobileMenu(true);
    }

    const onCloseMobileMenu = () => {
        setIsOpenMobileMenu(false);
    }

    const onOpenPopupLogin = () => {
        setIsOpenPopupLogin(true);
    }

    const onClosePopupLogin = () => {
        setIsOpenPopupLogin(false);
    }
    let storage = sessionStorage.getItem(Constants.TOKEN);

    const onLogout = () => {
        sessionStorage.clear();
        onCloseModalLogout();
        navigate(ROUTE_PATH.HOME_PAGE);
        window.location.reload();
        SuccessMessage("Đăng  xuất thành công", "Bạn đã đăng xuất khỏi hệ thống")
    };

    const onOpenModalLogout = () => {
        setIsOpenModalLogout(true);
    }

    const onCloseModalLogout = () => {
        setIsOpenModalLogout(false);
    }

    const onOpenModalRegister = () => {
        setIsOpenModalRegister(true);
    }

    const onCloseModalRegister = () => {
        setIsOpenModalRegister(false);
    }

    return (
        <div>
            <header className="main-header style-one bg-white position-fixed">

                <div className="header-lower">
                    <div className="header_bottom p_relative">
                        <div className="auto_container">
                            <div className="outer-box">
                                <div className="logo-box">
                                    <figure className="logo"><a href="index.html"><img src="assets/images/logo.png" alt="" /></a></figure>
                                </div>
                                <div className="menu-area">
                                    <div className="mobile-nav-toggler">
                                        <i className="icon-bar"></i>
                                        <i className="icon-bar"></i>
                                        <i className="icon-bar"></i>
                                    </div>
                                    <nav className="main-menu navbar-expand-md navbar-light">
                                        <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                            <ul className="navigation clearfix">
                                                {Constants.Menu.List.map((it, index) => (
                                                    <li key={index} className="dropdown"><a href={it.link} className={`${pathname == it.link ? "active" : ""}`}>{it.label}</a>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="menu-area">
                                    <nav className="main-menu navbar-expand-md navbar-light">
                                        <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                            <ul className="navigation clearfix">
                                                <li className="dropdown"><a>Đăng nhập </a></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky-header">
                    <div className="auto_container">
                        <div className="outer-box">
                            <div className="logo-box">
                                <figure className="logo"><a href="index.html"><img src="assets/images/logo.png" alt="" /></a></figure>
                            </div>
                            <div className="menu-area">
                                <nav className="main-menu clearfix">
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mobile-menu">
                <div className="menu-backdrop"></div>
                <div className="close-btn"><i className="fas fa-times"></i></div>
                <nav className="menu-box">
                    <div className="nav-logo"><a href="index.html"><img src="assets/images/logo.png" alt="logo" /></a></div>
                    <div className="menu-outer">
                        {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
                    </div>
                    <div className="contact-info">
                        <h4>Contact Info</h4>
                        <ul>
                            <li>Chicago 12, Melborne City, USA</li>
                        </ul>
                    </div>
                    <div className="social-links">
                        <div className="banner-media">
                            <ul>
                                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default HeaderPage;