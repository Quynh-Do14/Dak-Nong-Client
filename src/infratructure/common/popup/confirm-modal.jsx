import { Modal } from 'antd'
import React from 'react'

const ConfirmModal = (props) => {
    const {
        title,
        message,
        visible,
        onOk,
        onCancel,
    } = props;
    return (
        <Modal
            visible={visible}
            centered
            width={400}
            footer={false}
            onOk={onOk}
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
                    <h6 className="d-flex justify-content-center">
                        {message}
                    </h6>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button onClick={onCancel} type="button" className="btn btn-confirm btn-info btn-round">Hủy</button>
                    <button onClick={onOk} type="button" className="btn btn-confirm btn-info btn-round">Đăng xuất</button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal