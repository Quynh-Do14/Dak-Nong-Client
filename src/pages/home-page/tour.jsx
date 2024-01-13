import React from 'react'
import { showImageCommon, translationData } from '../../infratructure/utils/helper'
import Constants from '../../core/common/constant'
import { ROUTE_PATH } from '../../core/common/appRouter'
import useTranslate from '../../core/common/hook/useTranslate'

const Tour = ({ data = [] }) => {
    const { translate } = useTranslate();

    return (
        <section className="portfolio position-relative">
            <div className="container-fluid padding-common">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-title">
                            <h3>{translate("destination")} </h3>
                        </div>
                    </div>
                    {data.map((it, index) => (
                        <div key={index} className="mb-20 col-xl-3 col-lg-4 col-md-6 col-xs-12">
                            <div className="portfolio-content">
                                <div className="portfolio-info">
                                    <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}>
                                        <img
                                            src={
                                                it?.hinhAnh?.indexOf("http") == -1
                                                    ? showImageCommon(it?.hinhAnh)
                                                    : it?.hinhAnh
                                            }
                                            alt="img"
                                        />
                                    </a>
                                    <div className="personal-info">
                                        <ul>
                                            <li>
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li>
                                                <span>5.0</span>
                                            </li>
                                        </ul>
                                        <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}>
                                            <h6 className="text-truncate-title-destination-2">
                                                {translationData(it.tenDiaDiem, it.tenDiaDiemUS)}
                                            </h6>
                                        </a>
                                        <span>{it.tenQuanHuyen}</span>
                                    </div>
                                </div>
                                <p className="text-truncate-description">
                                    {translationData(it.moTa, it.moTaUS)}
                                </p>
                                <div className="qutetion">
                                    <img
                                        src="assets/images/icons/qutation.png"
                                        alt="qutation"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default Tour