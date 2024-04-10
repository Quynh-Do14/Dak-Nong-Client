import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import BannerCommon from '../../infratructure/common/controls/banner'
import { ROUTE_PATH } from '../../core/common/appRouter'
import LoadingFullPage from '../../infratructure/common/controls/loading'
import { useLocation } from 'react-router-dom'
import api from '../../infratructure/api'
import Constants from '../../core/common/constant'
import RelationDestination from '../../infratructure/common/controls/relation-destination'
import { convertTimeOnly, showImageCommon, translationData } from '../../infratructure/utils/helper'
import useTranslate from '../../core/common/hook/useTranslate'
import ListImageDestination from '../tour/list-image'

const HotelDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailHotel, setDetailHotel] = useState({});
    const [tabSelect, setTabSelect] = useState(0);
    const [listImage, setListImage] = useState([]);

    const location = useLocation()
    const param = location.search.replace("?", "");
    const { translate } = useTranslate();

    const onGetDetailDacSanAsync = async () => {
        const response = await api.getDiaDiemById(
            `dichvu/top/${param}?idDanhMuc=${Constants.CategoryConfig.Hotel.value}`,
            setLoading
        )
        setDetailHotel(response.diaDiem);
    }

    useEffect(() => {
        onGetDetailDacSanAsync().then(_ => { });
    }, []);

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"hotelSlogan"}
                redirect={ROUTE_PATH.HOTEL}
                redirectPage={"hotel"}
                currentPage={"detail"}
            />
            <section className="package-details">
                <div className="title-name-view-page">{translationData(detailHotel.tenDiaDiem, detailHotel.tenDiaDiemUS)}</div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="package-details-left-container">
                                <div className="package-tab">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            {Constants.TabDetailTour.list.map((it, index) => (
                                                <button key={index} onClick={() => setTabSelect(index)} className={`nav-link ${tabSelect == index ? "active" : ""}`} id="nav-home-tab" type="button" role="tab"><i className={`${it.icon} mr-10`}></i>{translate(it.name)} </button>
                                            ))}
                                        </div>
                                    </nav>
                                    {tabSelect == 0 ? (
                                        <div>
                                            <div className="tab-content" id="nav-tabContent">
                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                                    <div className="pkg-nav-contant">
                                                        <img src={
                                                            detailHotel.hinhAnh?.indexOf("http") == -1
                                                                ?
                                                                showImageCommon(detailHotel.hinhAnh)
                                                                :
                                                                detailHotel.hinhAnh
                                                        } alt="img" className='mb-20' />
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                                                    <div className="pkg-nav-contant">
                                                        {/* <div className="nav-list">
                                                    <ul>
                                                        <li>
                                                            <img src="assets/images/gallery/footer-recent-01.png" alt="img" />
                                                        </li>
                                                        <li>
                                                            <img src="assets/images/gallery/footer-recent-02.png" alt="img" />
                                                        </li>
                                                    </ul>
                                                </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pkg-common-title">
                                                <h4>{translate("detail")} </h4>
                                            </div>
                                            <p className='text-align-justify'>{translationData(detailHotel.moTa, detailHotel.moTaUS)}</p>
                                            <div className="pkg-list-info">
                                                <ul>
                                                    <li><h6>{translate("hotelName")} :</h6> <span>{translationData(detailHotel.tenDiaDiem, detailHotel.tenDiaDiemUS)} </span></li>
                                                    <li><h6>{translate("address")} :</h6> <span>{translationData(detailHotel.diaChi, detailHotel.diaChiUS)}</span></li>
                                                    <li><h6>{translate("phoneNumber")} :</h6> <span>{detailHotel.sdtLienHe}</span></li>
                                                    <li><h6>{translate("email")} :</h6> <span>{detailHotel.emailLienHe}</span></li>
                                                    <li><h6>{translate("price")} :</h6> <span>
                                                        {detailHotel.giaVe === Constants.FreePrice ?
                                                            (translationData(detailHotel.giaVe, detailHotel.giaVeUS))
                                                            :
                                                            detailHotel.giaVe == null
                                                                ? translate("free")
                                                                : `Chỉ từ: ${detailHotel.giaVe}`
                                                        }
                                                    </span></li>
                                                    <li><h6>{translate("openTime")} :</h6> <span>{detailHotel.gioMoCua} {detailHotel.gioDongCua && `- ${detailHotel.gioDongCua}`}</span></li>
                                                </ul>
                                            </div>
                                            <div className="pkg-info-container">
                                                <ul>
                                                    <li className="d-flex align-items-center">
                                                        <div className="mr-10">
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                        <div>
                                                            {detailHotel.soSaoTrungBinh}
                                                        </div>
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                        <div className="mr-10">
                                                            <i className="fa fa-eye"></i>
                                                        </div>
                                                        <div>
                                                            ({detailHotel.luotXem} {translate("view")}){" "}
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li className="d-flex align-items-center">
                                                        <div className="mr-10">
                                                            <i className="fa fa-gear"></i>
                                                        </div>
                                                        <div>
                                                            {translate("serviceAttentive")}{" "}
                                                        </div>
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                        <div className="mr-10">
                                                            <i className="fa fa-car"></i>
                                                        </div>
                                                        <div>
                                                            {translate("transportation")}{" "}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ) : tabSelect == 1 ? (
                                        <div>
                                            <div className="pkg-nav-contant">
                                                <div className="nav-list">
                                                    {detailHotel.uriVideo ? (
                                                        <video style={{ width: "100%" }} controls>
                                                            <source
                                                                src={showImageCommon(detailHotel.uriVideo)}
                                                                type="video/mp4"
                                                            />
                                                        </video>
                                                    ) : (
                                                        <div className="no-data-view">
                                                            {translate("noVideo")}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : tabSelect == 2 ? (
                                        <div>
                                            <div className="pkg-nav-contant">
                                                <div className="nav-list">
                                                    {listImage.length ? (
                                                        <ListImageDestination data={listImage} />
                                                    ) : (
                                                        <div className="no-data-view">
                                                            {translate("noGallery")}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <LoadingFullPage loading={loading} />
        </MainLayout >
    )
}

export default HotelDetail