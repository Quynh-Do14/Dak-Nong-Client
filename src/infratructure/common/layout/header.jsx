import React, { useEffect, useState } from "react";
import Constants from "../../../core/common/constant";
import LoginPopup from "../popup/login-popup";
import LoadingFullPage from "../controls/loading";
import { ROUTE_PATH } from "../../../core/common/appRouter";
import { SuccessMessage } from "../toast/toastMessage";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../popup/confirm-modal";
import RegisterPopup from "../popup/register-modal";
import { Drawer, Dropdown, Menu, Select, Space, Switch } from "antd";
import { useRecoilState } from "recoil";
import { LanguageState } from "../../../core/common/atoms/language/languageState";
import useTranslate from "../../../core/common/hook/useTranslate";

const HeaderPage = () => {
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const [isOpenShowDrawer, setIsOpenShowDrawer] = useState(false);
  const [swicthLanguage, setSwicthLanguage] = useState(
    sessionStorage.getItem("language") == "en"
      ? true
      : false
  );
  const [selectLanguage, setSelectLanguage] = useState(
    sessionStorage.getItem("language")
      ? sessionStorage.getItem("language")
      : "vi"
  );
  const [dataLanguage, setDataLanguage] = useRecoilState(LanguageState);
  const navigate = useNavigate();
  const location = useLocation();
  let pathname = location.pathname;
  const { translate } = useTranslate();

  const onOpenPopupLogin = () => {
    setIsOpenPopupLogin(true);
  };

  const onClosePopupLogin = () => {
    setIsOpenPopupLogin(false);
  };
  let storage = sessionStorage.getItem(Constants.TOKEN);

  const onLogout = () => {
    setLoading(true);
    sessionStorage.clear();
    onCloseModalLogout();
    navigate(ROUTE_PATH.HOME_PAGE);
    setTimeout(() => setLoading(false), 2000);
    SuccessMessage(translate("logOutSuccess"), translate("logOutMessage"));
  };

  const onOpenModalLogout = () => {
    setIsOpenModalLogout(true);
  };

  const onCloseModalLogout = () => {
    setIsOpenModalLogout(false);
  };

  const onOpenModalRegister = () => {
    setIsOpenModalRegister(true);
  };

  const onCloseModalRegister = () => {
    setIsOpenModalRegister(false);
  };
  // Ngôn ngữ

  const onChangeLanguage = (value) => {
    setSelectLanguage(value);
    setDataLanguage(value);

    if (value == "en") {
      sessionStorage.setItem("language", "en");
      setSwicthLanguage(true);
    }
    if (value == "vi") {
      sessionStorage.setItem("language", "vi");
      setSwicthLanguage(false);
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const onSwitchLanguage = (value) => {
    setSwicthLanguage(value);
    if (value == true) {
      setSelectLanguage("en");
      sessionStorage.setItem("language", "en");
    }
    if (value == false) {
      setSelectLanguage("vi");
      sessionStorage.setItem("language", "vi");
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }
  // Ngôn ngữ

  useEffect(() => {
    if (sessionStorage.getItem("language") == "en") {
      setIsEnglish(true);
    } else {
      setIsEnglish(false);
    }
  }, [sessionStorage.getItem("language")]);
  // Drawer
  const onOpenShowDrawer = () => {
    setIsOpenShowDrawer(true);
  };

  const onCloseShowDrawer = () => {
    setIsOpenShowDrawer(false);
  };

  const onNavigateQuanHuyen = (it) => {
    navigate("/quanHuyen", {
      state: {
        it,
      },
    });
  };
  // Drawer
  const listAction = () => {
    return (
      <Menu>
        <Menu.Item className="title-action">
          <nav className="main-menu navbar-expand-md navbar-light">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className=" navigation clearfix">
                <li className="menu-drop-item dropdown d-flex">
                  <a>{translate("english")} </a>{" "}
                  <Switch
                    value={selectLanguage}
                    checked={isEnglish}
                    onChange={onChangeLanguage}
                  />
                </li>
              </ul>
            </div>
          </nav>
        </Menu.Item>
        <Menu.Item className="title-action">
          <nav className="main-menu navbar-expand-md navbar-light">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className=" navigation clearfix">
                {storage ? (
                  <li
                    onClick={onOpenModalLogout}
                    className="menu-drop-item dropdown"
                  >
                    <a>
                      <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                      {translate("logOut")}{" "}
                    </a>
                  </li>
                ) : (
                  <li
                    onClick={onOpenPopupLogin}
                    className="menu-drop-item dropdown"
                  >
                    {" "}
                    <a>
                      <i className="fa fa-sign-in" aria-hidden="true"></i>{" "}
                      {translate("signIn")}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div>
      <header className="main-header style-one bg-white position-fixed">
        <div className="header-lower">
          <div className="header_bottom p_relative">
            <div className="auto_container">
              <div className="outer-box">
                <div className="logo-box">
                  <figure className="logo">
                    <a href="index.html">
                      <img
                        src="assets/images/logo.png"
                        alt=""
                        className="logo-header"
                      />
                    </a>
                  </figure>
                </div>
                <div onClick={onOpenShowDrawer} className="menu-area">
                  <div className="mobile-nav-toggler">
                    <i className="icon-bar"></i>
                    <i className="icon-bar"></i>
                    <i className="icon-bar"></i>
                  </div>

                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation clearfix">
                        {Constants.Menu.List.map((it, index) => (
                          <li key={index} className="dropdown">
                            <a
                              href={it.link}
                              className={`${pathname == it.link ? "active" : ""
                                }`}
                            >
                              {translate(it.label)}
                            </a>
                            {/* {it.children
                                                            ?
                                                            <ul>
                                                                {
                                                                    it.children.map((it, index) => (
                                                                        <li key={index}><a onClick={() => onNavigateQuanHuyen(it)} class="">{it.tenHuyen} </a></li>
                                                                    ))
                                                                }
                                                            </ul>
                                                            :
                                                            null
                                                        } */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="menu-area dropdown-action">
                  <div className="header-right-option">
                    <Select
                      value={selectLanguage}
                      style={{ width: "100%", height: "100%" }}
                      defaultValue="Tiếng Việt"
                      onChange={onChangeLanguage}
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      <Select.Option value="vi">VIE </Select.Option>
                      <Select.Option value="en">ENG </Select.Option>
                    </Select>
                  </div>
                  {/* <Dropdown overlay={listAction()} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i style={{ fontSize: 30 }} className="flaticon-menu-1"></i></button>
                                            </Space>
                                        </a>
                                    </Dropdown> */}
                  <nav className="main-menu navbar-expand-md navbar-light ml-20">
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation clearfix">
                        {storage ? (
                          <li onClick={onOpenModalLogout} className="dropdown">
                            <a>{translate("logOut")} </a>
                          </li>
                        ) : (
                          <li onClick={onOpenPopupLogin} className="dropdown">
                            <a>{translate("signIn")} </a>
                          </li>
                        )}
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
                <figure className="logo">
                  <a href="index.html">
                    <img src="assets/images/logo.png" alt="" />
                  </a>
                </figure>
              </div>
              <div className="menu-area">
                <nav className="main-menu clearfix"></nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`${isOpenShowDrawer ? "mobile-menu-visible" : ""}`}>
        <div className="mobile-menu">
          <div onClick={onCloseShowDrawer} className="close-btn">
            <i className="fas fa-times"></i>
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <a href="index.html">
                <img src="assets/images/logo.png" alt="logo" />
              </a>
            </div>
            <div className="menu-outer">
              <div
                className="collapse navbar-collapse show clearfix"
                id="navbarSupportedContent"
              >
                <ul className="navigation clearfix">
                  {Constants.Menu.List.map((it, index) => (
                    <li key={index} className="dropdown">
                      <a
                        href={it.link}
                        className={`${pathname == it.link ? "active" : ""}`}
                      >
                        {translate(it.label)}
                      </a>
                    </li>
                  ))}
                  <li className="menu-drop-item dropdown">
                    <a>
                      {translate("english")}{" "}
                      <Switch
                        className="ml-10"
                        value={swicthLanguage}
                        defaultChecked
                        onChange={onSwitchLanguage}
                      />
                    </a>
                  </li>

                  {storage ? (
                    <li
                      onClick={onOpenModalLogout}
                      className="menu-drop-item dropdown"
                    >
                      <a>
                        {translate("logOut")}{" "}
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                      </a>
                    </li>
                  ) : (
                    <li
                      onClick={onOpenPopupLogin}
                      className="menu-drop-item dropdown pointer"
                    >
                      {" "}
                      <a>
                        {translate("signIn")}{" "}
                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
          <div onClick={onCloseShowDrawer} className="menu-backdrop"></div>
        </div>
      </div>
      <LoginPopup
        title={translate("signIn")}
        visible={isOpenPopupLogin}
        onCancel={onClosePopupLogin}
        setLoading={setLoading}
        onOpenRegister={onOpenModalRegister}
      />

      <RegisterPopup
        title={translate("register")}
        visible={isOpenModalRegister}
        onCancel={onCloseModalRegister}
        setLoading={setLoading}
      />
      <ConfirmModal
        title={translate("logOut")}
        message={translate("logOutConfirm")}
        visible={isOpenModalLogout}
        onOk={onLogout}
        onCancel={onCloseModalLogout}
      />
      <LoadingFullPage loading={loading} />
    </div>
  );
};
export default HeaderPage;
