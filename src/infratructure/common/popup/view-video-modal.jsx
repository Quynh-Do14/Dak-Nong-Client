import { Modal } from 'antd';
import React, { useRef } from 'react'

const ViewVideoModal = (props) => {
    const {
        source = "",
        visible,
        onCancel,
    } = props;
    const iframeRef = useRef(null);

    const handleClose = () => {
        // Gửi lệnh dừng video đến thẻ iframe khi đóng popup
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const iframeSrc = iframe.src;

            // Gửi lệnh dừng video
            iframe.src = iframeSrc.replace('autoplay=1', 'autoplay=0');
        }

        // Gọi hàm đóng popup
        onCancel();
    };
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
            <div onClick={handleClose} className="modal-video-close">x</div>
            <div className='d-flex justify-content-center align-items-center'>
                <iframe
                    ref={iframeRef}
                    className='view-video'
                    src={source}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
        </Modal >
    )
}

export default ViewVideoModal