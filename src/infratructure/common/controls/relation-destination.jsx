import React from 'react'
import Constants from '../../../core/common/constant'
import { ViewStarCommon } from './view-star';
import { convertNumber, showImageCommon } from '../../utils/helper';
import { ROUTE_PATH } from '../../../core/common/appRouter';

const RelationDestination = (props) => {
    const { title, data = [] } = props;
    return (
        <section className="places-seciton pt-95 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center mb-45 wow fadeInDown">
                            <h2>{title} </h2>
                        </div>
                    </div>
                </div>
                <div className="slider-active-3-item-dot wow fadeInUp row">
                    {data.map((it, index) => (
                        <div key={index} className="col-xl-4 col-md-6 col-sm-12 places-column">
                            <div className="single-place-item mb-60">
                                <div className="place-img">
                                    <img src={
                                        it.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(it.hinhAnh)
                                            :
                                            it.hinhAnh
                                    } height={220} alt="Image" className='object-cover' />
                                </div>
                                <div className="place-content">
                                    <div className="info">
                                        <div>{ViewStarCommon(convertNumber(it.soSaoTrungBinh))}</div>
                                        <h4 className="title text-truncate-title"><a>{it.tenDiaDiem} </a></h4>
                                        <p className="location text-truncate-title"><i className="far fa-map-marker-alt "></i>{it.diaChi} </p>
                                        <p className="price"><i className="fas fa-usd-circle"></i> {it.giaVe === Constants.FreePrice || Constants.Undefined ? it.giaVe : `Chỉ từ: ${it.giaVe}`}</p>
                                        <div className="meta">
                                            <span><i className="far fa-clock"></i>{it.gioMoCua} </span>
                                            <span>-</span>
                                            <span><i className="far fa-clock"></i>{it.gioDongCua} </span>
                                            <span><a href={`${ROUTE_PATH.VIEW_DESTINATION}?${it.idDiaDiem}`}>Xem chi tiết<i className="far fa-long-arrow-right"></i></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RelationDestination