import { Modal } from 'antd';
import React from 'react'

const ViewVideoModal = (props) => {
    const {
        source = "",
        visible,
        onCancel,
    } = props;
    return (
        <Modal
            visible={visible}
            centered
            footer={false}
            // onCancel={onCancel}
            className='bg-white '
            width={"65%"}
            style={{
                height: "70%",
            }}
        // maskClosable={false}
        >
            <div onClick={onCancel} className="modal-video-close">x</div>
            <div className='d-flex justify-content-center align-items-center'>
                <iframe className='view-video' src={source} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </Modal >
    )
}

export default ViewVideoModal