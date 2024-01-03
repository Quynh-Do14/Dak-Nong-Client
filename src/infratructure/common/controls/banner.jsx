import React from 'react'
import banner from '../../../asset/img/extra/banner.png'
import useTranslate from '../../../core/common/hook/useTranslate';
const BannerCommon = (props) => {
    const { title, redirect, redirectPage, currentPage } = props;
    const {translate} = useTranslate();
    return (
        <section className="common-banner">
            <div className="common-banner-image" style={{ background: `url(${banner})`, backgroundSize: "cover" }}></div>

            <div className="common-banner-title">
                <a href={redirect}>{redirectPage} </a>
                <span>/ {translate(currentPage)} </span>
                <h3>{translate(title)}</h3>
            </div>
        </section>
    )
}

export default BannerCommon;