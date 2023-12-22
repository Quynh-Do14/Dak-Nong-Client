import React from 'react'
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper'
import { ROUTE_PATH } from '../../core/common/appRouter'

const Festival = ({ data = [] }) => {
    return (
        <section className="deals">
            <div className="home-two-pattern-layer" style={{ backgroundImage: "url(assets/images/shape/home-about-map.png)" }}></div>
            <div className="plane-shape2">
                <img src="assets/images/shape/plane-shape-2.png" alt="plane" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-title">
                            <h3>Lễ hội</h3>
                        </div>
                    </div>
                    {data.map((it, index) => (
                        <div key={index} className="col-lg-4">
                            <div className="activites-container">
                                <div className="activities-image position-relative">
                                    <img src={
                                        it.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(it.hinhAnh)
                                            :
                                            it.hinhAnh
                                    } className='img-page' alt="photo" />
                                </div>
                                <div className="activities-content">
                                    <a className='text-truncate position-relative' href={`${ROUTE_PATH.VIEW_FESTIVAL}?${it.idDiaDiem}`}>{it.tenDiaDiem} </a>
                                    <ul className='position-relative'>
                                        <li><i className="fa fa-calendar mr-10"></i>{convertDateOnly(it.gioMoCua)} </li>
                                        -
                                        <li><i className="fa fa-calendar mr-10"></i>{convertDateOnly(it.gioDongCua)} </li>
                                    </ul>
                                    <p className='text-truncate-description'>{it.moTa} </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Festival