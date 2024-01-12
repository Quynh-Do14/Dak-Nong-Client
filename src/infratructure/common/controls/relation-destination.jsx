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

            <div className="row">
                {data.map((it, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                        <div className="tour-package-container">
                            <div className="activities-image">
                                <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}><img src={
                                    it.hinhAnh?.indexOf("http") == -1
                                        ?
                                        showImageCommon(it.hinhAnh)
                                        :
                                        it.hinhAnh
                                } className='img-page' alt="photo" /></a>
                            </div>
                            <div className="activities-content">
                                <div className="tour-package-info">
                                    <div className="rating">
                                        <p><i className="fa fa-star pr-2"></i> {it.soSaoTrungBinh} ({it.luotXem} {translate("view")}) </p>
                                    </div>
                                    <div className="doller">
                                        <span>
                                            {it.giaVe === Constants.FreePrice ?
                                                (translationData(it.giaVe, it.giaVeUS))
                                                :
                                                it.giaVe == null
                                                    ? translate("free")
                                                    : `Chỉ từ: ${it.giaVe}`
                                            } </span>
                                    </div>
                                </div>
                                <a className='text-truncate-origin' href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}>
                                    {translationData(it.tenDiaDiem, it.tenDiaDiemUS)}
                                </a>
                                <ul>
                                    <h6 className='text-truncate-address'><i className="flaticon-placeholder"></i>
                                        {translationData(it.diaChi, it.diaChiUS)}
                                    </h6>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default RelationDestination