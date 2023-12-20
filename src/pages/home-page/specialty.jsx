import React from 'react'
import { showImageCommon } from '../../infratructure/utils/helper'

const Specialty = ({ data = [] }) => {
    return (
        <section className="add bg-grey">
            <div className="add-spring">
                <img src="assets/images/shape/spring.png" alt="shape" />
            </div>
            <div className="container">
                <div className="row">
                    {data.map((it, index) => (
                        <div key={index} className="col-lg-6">
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
                                    <span className='mt-10 text-truncate-title'>{it.moTa} </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Specialty