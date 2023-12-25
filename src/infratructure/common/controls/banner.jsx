import React from 'react'
import banner from '../../../asset/img/extra/banner.png'
const BannerCommon = (props) => {
    const { title, redirect, redirectPage, currentPage } = props;
    return (
        <section className="common-banner">
            <div className="common-banner-image" style={{ background: `url(${banner})`, backgroundSize: "cover" }}></div>

            <div className="common-banner-title">
                <a href={redirect}>{redirectPage} </a>
                <span>/ {currentPage} </span>
                <h3>{title}</h3>
            </div>
        </section>
    )
}

export default BannerCommon;