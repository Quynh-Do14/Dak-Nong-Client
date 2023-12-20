import React from 'react'

const LoadingFullPage = ({ loading = false }) => {
    if (loading) {
        return (
            <div className="preloader">
                <div className="loader">
                    <div className="pre-shadow"></div>
                    <div className="pre-box"></div>
                </div>
            </div>
        )
    }
}

export default LoadingFullPage