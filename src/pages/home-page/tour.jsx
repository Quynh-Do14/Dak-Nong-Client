import React from 'react'
import { showImageCommon } from '../../infratructure/utils/helper'
import Constants from '../../core/common/constant'

const Tour = ({ data = [] }) => {
    return (
        <section className="place">
            <div className="place-slider owl-carousel owl-theme">
                {data.map((it, index) => (
                    <div key={index} className="popular-ture-content place-content">
                        <div className="popular-ture-image">
                            <img src={
                                it.hinhAnh?.indexOf("http") == -1
                                    ?
                                    showImageCommon(it.hinhAnh)
                                    :
                                    it.hinhAnh
                            } alt="image" />
                        </div>
                        <div className="popular-ture-overlay place-overlay">
                            <div className="popular-ture-text place-text">
                                <ul>
                                    <li><i className="fa fa-star"></i>{it.soSaoTrungBinh} ({it.luotXem} Lượt xem) </li>
                                    <li><span> {it.giaVe === Constants.FreePrice || Constants.Undefined ? Constants.FreePrice : `Chỉ từ: ${it.giaVe}`} </span></li>
                                </ul>
                                <a href="">{it.tenDiaDiem}</a>
                                <h6><i className="flaticon-placeholder"></i>{it.diaChi} </h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Tour