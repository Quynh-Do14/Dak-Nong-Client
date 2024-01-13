import React from 'react'
import Constants from '../../../core/common/constant'
import { ViewStarCommon } from './view-star';
import { convertNumber, showImageCommon, translationData } from '../../utils/helper';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import useTranslate from '../../../core/common/hook/useTranslate';

const RelationDestination = (props) => {
    const { title, data = [] } = props;
    const { translate } = useTranslate();

    return (

        <div>
            <div className="pkg-common-title mt-30">
                <h4>{title}</h4>
            </div>

            <div className="container">
                <div className="row">
                    {data.map((it, index) => (
                        <div key={index} className="pl-10 mb-30 pr-10 col-xl-4 col-lg-4 col-md-6 col-xs-12">
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
                                        <li className="d-flex align-items-center">
                                            <div className="mr-10">
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div>
                                                {it.soSaoTrungBinh} ({it.luotXem} {translate("view")}){" "}
                                            </div>
                                        </li>
                                        <li>
                                            <span>
                                                {" "}
                                                {it.giaVe === Constants.FreePrice ?
                                                    (translationData(it.giaVe, it.giaVeUS))
                                                    :
                                                    it.giaVe == null
                                                        ? translate("free")
                                                        : `Chỉ từ: ${it.giaVe}`
                                                }
                                                {" "}
                                            </span>
                                        </li>
                                    </ul>
                                    <a
                                        href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}
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
        </div>

    )
}

export default RelationDestination