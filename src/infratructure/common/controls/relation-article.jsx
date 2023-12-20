import React from 'react'
import Constants from '../../../core/common/constant'
import { convertDateOnly, showImageCommon } from '../../utils/helper';
import { ROUTE_PATH } from '../../../core/common/appRouter';

const RelationArticle = (props) => {
    const { title, data = [] } = props;
    return (
        <div className="sidebar-widget-area">
            <div className="sidebar-widget recent-post-widget mb-40 wow fadeInUp">
                <h4 className="widget-title">{title} </h4>
                <ul className="recent-post-list">
                    {data?.map((it, index) => (
                        <li key={index} className="post-thumbnail-content">
                            <img src={
                                it.hinhAnh?.indexOf("http") == -1
                                    ?
                                    showImageCommon(it.hinhAnh)
                                    :
                                    it.hinhAnh
                            } alt="Image" className='object-cover' />
                            <div className="post-title-date">
                                <h5><a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}>{it.tieuDe} </a></h5>
                                <span className="posted-on"><i className="far fa-calendar-alt"></i><a href="#">{convertDateOnly(it.ngayDang)} </a></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RelationArticle