import React from 'react'
import banner from '../../../asset/img/extra/banner.png'
import banner2 from '../../../asset/img/banner/banner-bg2.jpg'
import useTranslate from '../../../core/common/hook/useTranslate';
const BannerCommon = (props) => {
    const { title, redirect, redirectPage, currentPage } = props;
    const { translate } = useTranslate();
    return (
        <div className='bg-orange-opacity-2'>
            <section className="common-banner">
                <div className="common-banner-image" style={{ background: `url(${banner2})`, backgroundSize: "cover" }}></div>
                <div className="common-banner-title ">
                    <a href={redirect}>{translate(redirectPage)} </a>
                    <span>/ {translate(currentPage)} </span>
                    <h3>{translate(title)}</h3>
                </div>
                <div className='pt20'>
                </div>
            </section>
        </div>
    )
}

export default BannerCommon;