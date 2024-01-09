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
import useTranslate from '../../../core/common/hook/useTranslate';
import { MessageError } from '../controls/MessageError';

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
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [validate, setValidate] = useState({})
    const [submittedTime, setSubmittedTime] = useState(null);

    const { translate } = useTranslate();

    const isValidData = () => {
        onBlurEmail(true);
        onBlurPassword(true);
        // onBlurUserName(true);
        onBlurPhoneNumber(true);
        onBlurFirstName(true);
        onBlurLastName(true);
        onBlurAddress(true);
        setValidate({ ...validate });
        let checkEmail = !!email;
        let checkPassword = !!password;
        // let checkUserName = !!userName;
        let checkphoneNumber = !!phoneNumber;
        let checkFirstName = !!firstName;
        let checkLastName = !!lastName;
        let checkAddress = !!address;

        return !(!checkEmail ||
            !checkPassword ||
            // !checkUserName ||
            !checkphoneNumber ||
            !checkFirstName ||
            !checkAddress ||
            !checkLastName
        );

    };

    const onBlurEmail = (isImplicitChange = false) => {
        let checkEmail = validateEmail(email);
        setEmail(email.trim())
        validateFields(isImplicitChange, "email", !checkEmail, setValidate, validate, !checkEmail ? email ? `${translate("correctFormat")} ${translate("email")}` : `${translate("pleaseEnter")} ${translate("email")}` : "");
    }

    const onBlurPassword = (isImplicitChange = false) => {
        let checkPassword = validateInputPassword(password);
        setPassword(password.trim())
        validateFields(isImplicitChange, "password", !checkPassword, setValidate, validate, !checkPassword ? password ? `${translate("correctFormat")} ${translate("password")}` : `${translate("pleaseEnter")} ${translate("password")}` : "");
    };

    // const onBlurUserName = (isImplicitChange = false) => {
    //     let checkUserName = !!userName;
    //     setUserName(userName.trim())
    //     validateFields(isImplicitChange, "userName", !checkUserName, setValidate, validate, !userName ? "Vui lòng nhập tên người dùng" : "");
    // };


    const onBlurPhoneNumber = (isImplicitChange = false) => {
        let checkphoneNumber = !!phoneNumber;
        setPhoneNumber(phoneNumber.trim())
        validateFields(isImplicitChange, "phoneNumber", !checkphoneNumber, setValidate, validate, !phoneNumber ? `${translate("pleaseEnter")} ${translate("phoneNumber")}` : "");
    };


    const onBlurFirstName = (isImplicitChange = false) => {
        let checkFirstName = !!firstName;
        setFirstName(firstName.trim())
        validateFields(isImplicitChange, "firstName", !checkFirstName, setValidate, validate, !firstName ? `${translate("pleaseEnter")} ${translate("firstName")}` : "");
    };


    const onBlurLastName = (isImplicitChange = false) => {
        let checkLastName = !!lastName;
        setLastName(lastName.trim())
        validateFields(isImplicitChange, "lastName", !checkLastName, setValidate, validate, !lastName ? `${translate("pleaseEnter")} ${translate("lastName")}` : "");
    };


    const onBlurAddress = (isImplicitChange = false) => {
        let checkAddress = !!address;
        setAddress(address.trim())
        validateFields(isImplicitChange, "address", !checkAddress, setValidate, validate, !address ? `${translate("pleaseEnter")} ${translate("address")}` : "");
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

    const onChangephoneNumber = (e) => {
        setPhoneNumber(e.target.value);
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
            onCancel();
            await api.register({
                email: email,
                password: password,
                // userName: userName,
                address: address,
                phoneNumber: phoneNumber,
                firstName: firstName,
                lastName: lastName
            },
                onCancel,
                setLoading
            );
            return false;

        }
        else {
            WarningMessage(translate("enterMissingInformation"), translate("pleaseEnterCompleteInformation"))
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
                                <input value={email} onChange={onChangeEmail} onBlur={() => onBlurEmail(false)} type="email" className="form-control" id="email1" placeholder={`${translate("enterEmail")}...`} />
                                <MessageError isError={validate.email?.isError || false}
                                    message={validate.email?.message || ""} />
                            </div>
                            <div className="form-group">
                                <input value={password} onChange={onChangePassword} onBlur={() => onBlurPassword(false)} type="password" className="form-control" id="password1" placeholder={`${translate("enterPassword")}...`} />
                                <MessageError isError={validate.password?.isError || false}
                                    message={validate.password?.message || ""} />
                            </div>
                            <div className="form-group">
                                <input value={firstName} onChange={onChangeFirstName} onBlur={() => onBlurFirstName(false)} type="text" className="form-control" id="firstName1" placeholder={`${translate("enterFirstName")}...`} />
                                <MessageError isError={validate.firstName?.isError || false}
                                    message={validate.firstName?.message || ""} />
                            </div>
                            <div className="form-group">
                                <input value={lastName} onChange={onChangeLastName} onBlur={() => onBlurLastName(false)} type="text" className="form-control" id="lastName1" placeholder={`${translate("enterLastName")}...`} />
                                <MessageError isError={validate.lastName?.isError || false}
                                    message={validate.lastName?.message || ""} />
                            </div>
                            <div className="form-group">
                                <input value={phoneNumber} onChange={onChangephoneNumber} onBlur={() => onBlurPhoneNumber(false)} type="text" className="form-control" id="phoneNumber1" placeholder={`${translate("enterPhoneNumber")}...`} />
                                <MessageError isError={validate.phoneNumber?.isError || false}
                                    message={validate.phoneNumber?.message || ""} />
                            </div>
                            <div className="form-group">
                                <input value={address} onChange={onChangeAddress} onBlur={() => onBlurAddress(false)} type="text" className="form-control" id="address1" placeholder={`${translate("enterAddress")}...`} />
                                <MessageError isError={validate.address?.isError || false}
                                    message={validate.address?.message || ""} />
                            </div>
                            <button onClick={onRegister} type="button" className="btn btn-info btn-block btn-round">{`${translate("register")}`}</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                <div className="signup-section">{`${translate("alreadyAcount")}`}? <a onClick={onCancel} className="text-info"> {`${translate("signIn")}`}</a>.</div>
            </div>
        </Modal>
    )
}

export default RegisterPopup