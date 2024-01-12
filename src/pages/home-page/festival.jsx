import React from 'react'
import { convertDateOnly, showImageCommon, translationData } from '../../infratructure/utils/helper'
import { ROUTE_PATH } from '../../core/common/appRouter'
import useTranslate from '../../core/common/hook/useTranslate';

const Festival = ({ data = [] }) => {
    const { translate } = useTranslate();
    return (
        <section className="deals">
            <div className="home-two-pattern-layer" style={{ backgroundImage: "url(assets/images/shape/home-about-map.png)" }}></div>
            <div className="plane-shape2">
                <img src="assets/images/shape/plane-shape-2.png" alt="plane" />
            </div>
            <div className="container-fluid padding-common">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-title">
                            <h3>{translate("traditionalFestival")}</h3>
                        </div>
                    </div>
                    {data.map((it, index) => (
                        <div key={index} className="pl-10 pr-10 mb-20 col-xl-3 col-lg-4 col-md-6 col-xs-12">
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
                                    <a className='text-truncate-title-festival position-relative' href={`${ROUTE_PATH.VIEW_FESTIVAL}?${it.idDiaDiem}`}>
                                        {translationData(it.tenDiaDiem, it.tenDiaDiemUS)}
                                    </a>
                                    <ul className='position-relative'>
                                        <li className='d-flex align-items-center'><i className="fa fa-calendar mr-10"></i>{it.gioMoCua} </li>
                                        {it.gioDongCua && "-"}
                                        {it.gioDongCua && <li><i className="fa fa-calendar mr-10"></i>{it.gioDongCua} </li>}
                                    </ul>
                                    <p className='text-truncate-description'>
                                        {translationData(it.moTa, it.moTaUS)}
                                    </p>
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