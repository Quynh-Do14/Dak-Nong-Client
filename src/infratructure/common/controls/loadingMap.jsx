import React, { useEffect, useState } from 'react'

const LoadingFullPageMap = ({ loading = false }) => {
    if (loading) {
        return (
            <div className="loader-wrap">
                <div className="preloader">
                    <div className="preloader-close">x</div>
                    <div id="handle-preloader" className="handle-preloader home-1" style={{
                        backgroundColor: '#FE752440'
                    }}>
                        <div className="loading">
                            <div className="pre-plane">
                                <img src="assets/images/shape/banner-plan.png" alt="plane" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadingFullPageMap