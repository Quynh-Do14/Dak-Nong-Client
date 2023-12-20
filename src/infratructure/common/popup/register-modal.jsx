import React, { useState } from 'react'
import "../../../asset/css/popup.css"
import { Modal } from 'antd'
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import Constants from '../../../core/common/constant';
import { validateEmail, validateInputPassword } from '../../utils/validate';
import { WarningMessage } from '../toast/toastMessage';
import { validateFields } from '../../utils/helper';

const RegisterPopup = (props) => {
    const {
        title,
        visible,
        onCancel,
        setLoading,
    } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [sdt, setSdt] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [validate, setValidate] = useState({})
    const [submittedTime, setSubmittedTime] = useState(null);

    const isValidData = () => {
        onBlurEmail(true);
        onBlurPassword(true);
        // onBlurUserName(true);
        onBlurSdt(true);
        onBlurFirstName(true);
        onBlurLastName(true);
        onBlurAddress(true);
        setValidate({ ...validate });
        let checkEmail = !!email;
        let checkPassword = !!password;
        // let checkUserName = !!userName;
        let checkSdt = !!sdt;
        let checkFirstName = !!firstName;
        let checkLastName = !!lastName;
        let checkAddress = !!address;

        return !(!checkEmail ||
            !checkPassword ||
            // !checkUserName ||
            !checkSdt ||
            !checkFirstName ||
            !checkAddress ||
            !checkLastName
        );

    };

    const onBlurEmail = (isImplicitChange = false) => {
        let checkEmail = validateEmail(email);
        setEmail(email.trim())
        validateFields(isImplicitChange, "email", !checkEmail, setValidate, validate, !checkEmail ? email ? `Vui lòng nhập đúng định dạng email` : `Vui lòng nhập email` : "");
    }

    const onBlurPassword = (isImplicitChange = false) => {
        let checkPassword = validateInputPassword(password);
        setPassword(password.trim())
        validateFields(isImplicitChange, "password", !checkPassword, setValidate, validate, !checkPassword ? password ? `Vui lòng nhập đúng định dạng mật khẩu` : `Vui lòng nhập mật khẩu` : "");
    };

    // const onBlurUserName = (isImplicitChange = false) => {
    //     let checkUserName = !!userName;
    //     setUserName(userName.trim())
    //     validateFields(isImplicitChange, "userName", !checkUserName, setValidate, validate, !userName ? "Vui lòng nhập tên người dùng" : "");
    // };


    const onBlurSdt = (isImplicitChange = false) => {
        let checkSdt = !!sdt;
        setSdt(sdt.trim())
        validateFields(isImplicitChange, "sdt", !checkSdt, setValidate, validate, !sdt ? "Vui lòng nhập số điện thoại" : "");
    };


    const onBlurFirstName = (isImplicitChange = false) => {
        let checkFirstName = !!firstName;
        setFirstName(firstName.trim())
        validateFields(isImplicitChange, "firstName", !checkFirstName, setValidate, validate, !firstName ? "Vui lòng nhập tên" : "");
    };


    const onBlurLastName = (isImplicitChange = false) => {
        let checkLastName = !!lastName;
        setLastName(lastName.trim())
        validateFields(isImplicitChange, "lastName", !checkLastName, setValidate, validate, !lastName ? "Vui lòng nhập họ" : "");
    };


    const onBlurAddress = (isImplicitChange = false) => {
        let checkAddress = !!address;
        setAddress(address.trim())
        validateFields(isImplicitChange, "address", !checkAddress, setValidate, validate, !address ? "Vui lòng nhập địa chỉ" : "");
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    // const onChangeUserName = (e) => {
    //     setUserName(e.target.value);
    // };

    const onChangeSdt = (e) => {
        setSdt(e.target.value);
    };

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    };
    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    };


    const onRegister = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.register({
                email: email,
                password: password,
                // userName: userName,
                address: address,
                sdt: sdt,
                firstName: firstName,
                lastName: lastName
            },
                onCancel,
                setLoading
            );
            return false;

        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    return (
        <Modal
            visible={visible}
            centered
            width={400}
            footer={false}
            onCancel={onCancel}
        >
            <div className="modal-content">
                <div className="modal-header border-bottom-0">
                    <button onClick={onCancel} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-title text-center">
                        <h4>{title} </h4>
                    </div>
                    <div className="d-flex flex-column text-center">
                        <form>
                            <div className="form-group">
                                <input value={email} onChange={onChangeEmail} onBlur={onBlurEmail} type="email" className="form-control" id="email1" placeholder="Nhập Email.." />
                            </div>
                            <div className="form-group">
                                <input value={password} onChange={onChangePassword} onBlur={onBlurPassword} type="password" className="form-control" id="password1" placeholder="Nhập Mật khẩu..." />
                            </div>
                            <div className="form-group">
                                <input value={firstName} onChange={onChangeFirstName} onBlur={onBlurFirstName} type="text" className="form-control" id="firstName1" placeholder="Nhập Tên..." />
                            </div>
                            <div className="form-group">
                                <input value={lastName} onChange={onChangeLastName} onBlur={onBlurLastName} type="text" className="form-control" id="lastName1" placeholder="Nhập Họ..." />
                            </div>
                            <div className="form-group">
                                <input value={sdt} onChange={onChangeSdt} onBlur={onBlurSdt} type="text" className="form-control" id="sdt1" placeholder="Nhập SĐT..." />
                            </div>
                            <div className="form-group">
                                <input value={address} onChange={onChangeAddress} onBlur={onBlurAddress} type="text" className="form-control" id="address1" placeholder="Nhập Địa chỉ..." />
                            </div>
                            <button onClick={onRegister} type="button" className="btn btn-info btn-block btn-round">Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                <div className="signup-section">Bạn đã có tài khoản? <a onClick={onCancel} className="text-info"> Đăng nhập</a>.</div>
            </div>
        </Modal>
    )
}

export default RegisterPopup