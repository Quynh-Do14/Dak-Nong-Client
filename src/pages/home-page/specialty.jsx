import React, { useState } from "react";
import { showImageCommon, translationData } from "../../infratructure/utils/helper";
import Constants from "../../core/common/constant";
import { ROUTE_PATH } from "../../core/common/appRouter";
import useTranslate from "../../core/common/hook/useTranslate";

const Specialty = ({ data = [] }) => {
    const { translate } = useTranslate();
    return (
        <section className="deals bg-white">
            <div className="container-fluid padding-common">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-title">
                            <h3>{translate("specialty")} </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid padding-common">
                <div className="deals-slider owl-carousel owl-theme row">
                    {data.map((it, index) => (
                        <div key={index} className="pl-10 pr-10 mb-20 col-xl-3 col-lg-4 col-md-6 col-xs-12">
                            <div className="deals-content ">
                                <div className="deals-image custom-image">
                                    <a href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}>
                                        <img
                                            src={
                                                it.hinhAnh?.indexOf("http") == -1
                                                    ? showImageCommon(it.hinhAnh)
                                                    : it.hinhAnh
                                            }
                                            alt="image"
                                            className="img-page"
                                        />
                                    </a>
                                </div>
                                <div className="deals-info">
                                    <ul>
                                        <li className="d-flex align-items-center">
                                            <div className="mr-10">
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div>
                                                {it.soSaoTrungBinh} ({it.luotXem} {translate("view")}){" "}
                                            </div>
                                        </li>
                                        <li>
                                            {/* <span>
                                                {" "}
                                                {it.giaVe === Constants.FreePrice || Constants.Undefined
                                                    ? Constants.FreePrice
                                                    : `Chỉ từ: ${it.giaVe}`}{" "}
                                            </span> */}
                                        </li>
                                    </ul>
                                    <a
                                        href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}
                                        className="deals-info-link text-truncate-origin"
                                    >
                                        {translationData(it.tenDiaDiem, it.tenDiaDiemUS)}
                                        {" "}
                                    </a>
                                    <p className="text-truncate-address-destination">
                                        <i className="flaticon-map"></i>
                                        {translationData(it.diaChi, it.diaChiUS)}
                                        {" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Specialty;
