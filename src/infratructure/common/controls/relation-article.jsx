import React from 'react'
import Constants from '../../../core/common/constant'
import { convertDateOnly, showImageCommon, translationData } from '../../utils/helper';
import { ROUTE_PATH } from '../../../core/common/appRouter';

const RelationArticle = (props) => {
    const { title, data = [] } = props;
    return (

        <div className="col-lg-4">
            <div className="destination-details-right-container">
                <div className="destination-right-title">
                    <h4>{title}</h4>
                    <div className="destination-right-title-image">
                        <img src="assets/images/shape/title-shape.png" alt="shape" />
                    </div>
                </div>
                <div className="destination-right-list">
                    {data?.map((it, index) => (
                        <div key={index} className="destination-right-list-content mb-10">
                            <div className="destination-right-list-image">
                                <img src={
                                    it.hinhAnh?.indexOf("http") == -1
                                        ?
                                        showImageCommon(it.hinhAnh)
                                        :
                                        it.hinhAnh
                                } alt="img" className='img-page-detail' />
                            </div>
                            <div className="destination-right-list-info">
                                <a className='text-truncate-title-relation' href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}>
                                    {translationData(it.tieuDe, it.tieuDeUS)}
                                </a>
                                {/* <ul>
                                    <li><i className="fa-solid fa-star"></i>4.45 (313 Reviews) </li>
                                    <li><span>From</span><h5> $500.00</h5> </li>
                                </ul> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelationArticle