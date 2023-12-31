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

const LoginPopup = (props) => {
    const {
        title,
        visible,
        onCancel,
        onOpenRegister,
        setLoading,
        isCurrentPage
    } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState({})
    const [submittedTime, setSubmittedTime] = useState(null);
    const navigate = useNavigate();
    const { translate } = useTranslate();

    const isValidData = () => {
        onBlurEmail(true);
        onBlurPassword(true);

        setValidate({ ...validate });
        let checkEmail = !!email;
        let checkPassword = !!password;

        return !(!checkEmail ||
            !checkPassword
        );
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
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

    const onSubmit = async (e) => {
        await setSubmittedTime(Date.now());
        onCancel();
        if (isValidData()) {
            const login = await api.login({
                email: email,
                password: password,
            },
                onCancel,
                setLoading,
                ""
            );
            if (login.success == true) {
                sessionStorage.setItem(Constants.TOKEN, login.data.token)
                if (!isCurrentPage) {
                    navigate(ROUTE_PATH.HOME_PAGE);
                }
            }
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
            className='modal-dialog'
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
                                <input value={email} onChange={onChangeEmail} onBlur={onBlurEmail} type="email" className="form-control" id="email1" placeholder="Nhập Email..." />
                            </div>
                            <div className="form-group">
                                <input value={password} onChange={onChangePassword} onBlur={onBlurPassword} type="password" className="form-control" id="password1" placeholder="Nhập Mật khẩu..." />
                            </div>
                            <button onClick={onSubmit} type="button" className="btn btn-info btn-block btn-round">{translate("signIn")}</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                <div className="signup-section">Bạn chưa có tài khoản? <a onClick={onOpenRegister} className="text-info"> Đăng kí</a>.</div>
            </div>
        </Modal>
    )
}

export default LoginPopup