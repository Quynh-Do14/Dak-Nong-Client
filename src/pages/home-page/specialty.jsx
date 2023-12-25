import React from 'react'
import { showImageCommon } from '../../infratructure/utils/helper'
import { ROUTE_PATH } from '../../core/common/appRouter'

const Specialty = ({ data = [] }) => {
    return (
        <section className="add bg-grey">
            <div className="add-spring">
                <img src="assets/images/shape/spring.png" alt="shape" />
            </div>
            <div className="container">
                <div className="row">
                    {data.map((it, index) => (
                        <div key={index} className="col-lg-6 pointer">
                            <a href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}>
                                <div className="video-container" >
                                    <div className="add-image">
                                        <img src={
                                            it.hinhAnh?.indexOf("http") == -1
                                                ?
                                                showImageCommon(it.hinhAnh)
                                                :
                                                it.hinhAnh
                                        } className='img-page' alt="image" />
                                    </div>
                                    <div className={`add-content ${index == 1 ? "add-content2 wow fadeInUp" : "wow fadeInDown"}`} data-wow-delay="00ms" data-wow-duration="1500ms">
                                        <p>{it.luotXem} Lượt xem  </p>
                                        <h5>{it.tenDiaDiem} </h5>
                                        <h6>{it.diaChi} </h6>
                                        <p className='text-custom mt-10 text-truncate-description'>{it.moTa} </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Specialty