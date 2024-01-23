import React from 'react'
import "../../asset/css/download-page.css"
const DownLoadPage = () => {
    return (
        <section className="bg-white">
            <div className='download-page'>
                <div className='container'>
                    <h1 className='title'>Tải ứng dụng </h1>
                    <div className='btn-part'>
                        <div className='btn-download d-flex align-items-center justify-content-center'>
                            <div>
                                <i className="fa fa-android icon-download" aria-hidden="true"></i>
                            </div>
                            <div className='name-btn'>
                                Dành cho Android
                            </div>
                        </div>
                        <div className='btn-download d-flex align-items-center justify-content-center'>
                            <div>
                                <i className="fa fa-apple icon-download" aria-hidden="true"></i>
                            </div>
                            <div className='name-btn'>
                                Dành cho IOS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DownLoadPage