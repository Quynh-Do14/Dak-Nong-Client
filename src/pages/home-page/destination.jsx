import React, { useState } from "react";
import { showImageCommon } from "../../infratructure/utils/helper";
import Constants from "../../core/common/constant";
import { ROUTE_PATH } from "../../core/common/appRouter";
import useTranslate from "../../core/common/hook/useTranslate";

const Destination = ({ data = [] }) => {
  const { translate } = useTranslate();
  return (
    <section className="deals bg-white">
      <div className="container-fluid padding-common">
        <div className="row">
          <div className="col-lg-12">
            <div className="common-title">
              <h3>{translate("destination")} </h3>
              <div className="deal-icon">
                <img src="assets/images/icons/doler.png" alt="doler" />
              </div>
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
                  <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}>
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
                    <li>
                      <i className="fa fa-star pr-2"></i>
                      {it.soSaoTrungBinh} ({it.luotXem} Lượt xem){" "}
                    </li>
                    <li>
                      <span>
                        {" "}
                        {it.giaVe === Constants.FreePrice || Constants.Undefined
                          ? Constants.FreePrice
                          : `Chỉ từ: ${it.giaVe}`}{" "}
                      </span>
                    </li>
                  </ul>
                  <a
                    href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}
                    className="deals-info-link text-truncate-origin"
                  >
                    {it.tenDiaDiem}{" "}
                  </a>
                  <p className="text-truncate-address-destination">
                    <i className="flaticon-map"></i>
                    {it.diaChi.replace(", tỉnh Đăk Nông", "")}{" "}
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

export default Destination;
