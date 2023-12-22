import React from 'react'

const LoadingFullPage = ({ loading = false }) => {
    if (loading) {
        return (
            <div className="loader-wrap">
                <div className="preloader">
                    <div className="preloader-close">x</div>
                    <div id="handle-preloader" className="handle-preloader home-1">
                        <div className="loading">
                            <div className="pre-plane">
                                <img src="assets/images/shape/plan-shape.png" alt="plane" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadingFullPage