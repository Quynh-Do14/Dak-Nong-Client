import React, { useState } from "react";
import "../../../asset/css/popup.css";
import { Modal } from "antd";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../core/common/appRouter";
import Constants from "../../../core/common/constant";
import { validateEmail, validateInputPassword } from "../../utils/validate";
import { WarningMessage } from "../toast/toastMessage";
import { validateFields } from "../../utils/helper";
import useTranslate from "../../../core/common/hook/useTranslate";
import { MessageError } from "../controls/MessageError";

const LoginPopup = (props) => {
  const {
    title,
    visible,
    onCancel,
    onOpenRegister,
    setLoading,
    isCurrentPage,
  } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [submittedTime, setSubmittedTime] = useState(null);
  const navigate = useNavigate();
  const { translate } = useTranslate();

  const isValidData = () => {
    onBlurEmail(true);
    onBlurPassword(true);

    setValidate({ ...validate });
    let checkEmail = !!email;
    let checkPassword = !!password;

    return !(!checkEmail || !checkPassword);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onBlurEmail = (isImplicitChange = false) => {
    let checkEmail = validateEmail(email);
    setEmail(email.trim());
    validateFields(
      isImplicitChange,
      "email",
      !checkEmail,
      setValidate,
      validate,
      !checkEmail
        ? email
          ? `${translate("correctFormat")} ${translate("email")}`
          : `${translate("pleaseEnter")} ${translate("email")}`
        : ""
    );
  };

  const onBlurPassword = (isImplicitChange = false) => {
    let checkPassword = validateInputPassword(password);
    setPassword(password.trim());
    validateFields(
      isImplicitChange,
      "password",
      !checkPassword,
      setValidate,
      validate,
      !checkPassword
        ? password
          ? `${translate("correctFormat")} ${translate("password")}`
          : `${translate("pleaseEnter")} ${translate("password")}`
        : ""
    );
  };

  const onSubmit = async (e) => {
    await setSubmittedTime(Date.now());
    if (isValidData()) {
      onCancel();
      const login = await api.login(
        {
          email: email,
          password: password,
        },
        onCancel,
        setLoading,
        ""
      );
      if (login.success == true) {
        sessionStorage.setItem(Constants.TOKEN, login.data.token);
        sessionStorage.setItem("firstName", login.data.user.data.firstName);
        sessionStorage.setItem("lastName", login.data.user.data.lastName);
        sessionStorage.setItem("role", login.data.user.role);
        if (!isCurrentPage) {
          navigate(ROUTE_PATH.HOME_PAGE);
        }
      }
      return false;
    } else {
      WarningMessage(
        translate("enterMissingInformation"),
        translate("pleaseEnterCompleteInformation")
      );
    }
  };
  return (
    <Modal
      visible={visible}
      centered
      width={400}
      footer={false}
      onCancel={onCancel}
      className="modal-dialog"
    >
      <div className="modal-content">
        <div className="modal-header border-bottom-0">
          <button
            onClick={onCancel}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-title text-center">
            <h2 style={{ marginBottom: 16, color: "#094174" }}>{title} </h2>
            <div className="text-muted fw-semibold fs-8">
              Đăng nhập tài khoản{" "}
              <a
                href="#"
                className="fw-bold"
                style={{
                  color: "#fe7524",
                }}
              >
                của bạn{" "}
              </a>
              !
            </div>
          </div>
          <div className="d-flex flex-column text-center">
            <form>
              <div className="form-input mb-3">
                <input
                  value={email}
                  onChange={onChangeEmail}
                  onBlur={() => onBlurEmail(false)}
                  type="email"
                  className="form-control"
                  id="email1"
                  placeholder={`${translate("enterEmail")}...`}
                />
                <MessageError
                  isError={validate.email?.isError || false}
                  message={validate.email?.message || ""}
                />
              </div>
              <div className="form-input mb-3">
                <input
                  value={password}
                  onChange={onChangePassword}
                  onBlur={() => onBlurPassword(false)}
                  type="password"
                  className="form-control"
                  id="password1"
                  placeholder={`${translate("enterPassword")}...`}
                />
                <MessageError
                  isError={validate.password?.isError || false}
                  message={validate.password?.message || ""}
                />
              </div>
              <button
                onClick={onSubmit}
                type="button"
                className="btn-login btn-block btn-round"
              >
                {translate("signIn")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-footer d-flex justify-content-center">
        <div className="signup-section">
          {translate("alreadyAcount")}?{" "}
          <a
            onClick={onOpenRegister}
            style={{
              color: "#094174 !important",
              fontWeight: "bold",
            }}
          >
            {" "}
            {translate("register")}
          </a>
          .
        </div>
      </div>
    </Modal>
  );
};

export default LoginPopup;
