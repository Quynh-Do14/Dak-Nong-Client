import React from 'react'
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper'
import { ROUTE_PATH } from '../../core/common/appRouter'
import useTranslate from '../../core/common/hook/useTranslate';

const Article = ({ data = [] }) => {
    const { translate } = useTranslate();
    return (
        <section className="deals home-three-blog">
            <div className="blog-icon">
                <img src="assets/images/icons/blog-icon.png" alt="icon" />
            </div>
            <div className="container-fluid padding-common">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-title">
                            <h3>{translate('todayArticle')}</h3>
                        </div>
                    </div>
                    {data.map((it, index) => (
                        <div key={index} className="mb-20 col-xl-3 col-lg-4 col-md-6 col-xs-12">
                            < div className="blog-content" >
                                <div className="blog-image">
                                    <a href="blog-details.html"><img src={
                                        it.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(it.hinhAnh)
                                            :
                                            it.hinhAnh
                                    } alt="image" className='img-page' /></a>
                                </div>
                                <div className="blog-info">
                                    <div className="blog-info">
                                        <div className="footer-info">
                                            <ul className='flex justify-content-start mb-10'>
                                                <li><i className="color-orange mr-10 fa fa-user"></i>Duong Nguyen </li>
                                                <li><i className="color-orange mr-10 fa fa-calendar"></i> <span>{convertDateOnly(it.ngayDang)} </span></li>
                                            </ul>
                                            <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`} className="blog-title text-truncate-title-relation">{it.tieuDe} </a>
                                            <p className='text-truncate-description'>{it.tieuDeCon} </p>
                                            <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}>{translate("viewMore")} </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </section >
    )
}

export default Article