import React from 'react'
import banner from '../../../asset/img/banner.png'
const BannerCommon = (props) => {
    const { title, redirect, redirectPage, currentPage } = props;
    return (
        <section className="page-banner overlay pt-170 pb-220 bg_cover" style={{ backgroundImage: `url(${banner})` }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="page-banner-content text-center text-white">
                            <h1 className="page-title">{title} </h1>
                            <ul className="breadcrumb-link text-white">
                                <li><a href={redirect}>{redirectPage} </a></li>
                                <li className="active">{currentPage} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerCommon;