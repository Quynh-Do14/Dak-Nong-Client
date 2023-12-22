import React from 'react'
import { showImageCommon } from '../../infratructure/utils/helper'
import Constants from '../../core/common/constant'
import { ROUTE_PATH } from '../../core/common/appRouter'

const Destination = ({ data = [] }) => {
    return (
        <section className="deals">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="common-title">
                            <h3>Địa điểm du lịch</h3>
                            <div className="deal-icon">
                                <img src="assets/images/icons/doler.png" alt="doler" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container deals-slider-wrapper">
                <div className="deals-slider owl-carousel owl-theme row">
                    {data.map((it, index) => (
                        <div key={index} className="pl-10 pr-10 col-lg-4 col-xs-12">
                            <div className='deals-content '>
                                <div className="deals-image custom-image">
                                    <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}><img src={
                                        it.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(it.hinhAnh)
                                            :
                                            it.hinhAnh
                                    } alt="image" className='img-page' /></a>
                                </div>
                                <div className="deals-info">
                                    <ul>
                                        <li><i className="fa fa-star"></i>{it.soSaoTrungBinh} ({it.luotXem} Lượt xem) </li>
                                        <li><span> {it.giaVe === Constants.FreePrice || Constants.Undefined ? Constants.FreePrice : `Chỉ từ: ${it.giaVe}`} </span></li>
                                    </ul>
                                    <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`} className="deals-info-link text-truncate">{it.tenDiaDiem} </a>
                                    <p><i className="flaticon-map"></i>{it.diaChi} </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Destination