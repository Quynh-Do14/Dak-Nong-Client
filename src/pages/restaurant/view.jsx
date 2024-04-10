import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import BannerCommon from '../../infratructure/common/controls/banner'
import { ROUTE_PATH } from '../../core/common/appRouter'
import LoadingFullPage from '../../infratructure/common/controls/loading'
import { useLocation } from 'react-router-dom'
import api from '../../infratructure/api'
import Constants from '../../core/common/constant'
import RelationDestination from '../../infratructure/common/controls/relation-destination'
import { convertDateOnly, showImageCommon, translationData } from '../../infratructure/utils/helper'
import useTranslate from '../../core/common/hook/useTranslate'
import ListImageDestination from '../tour/list-image'

const RestaurantDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailRestaurant, setDetailRestaurant] = useState({});
    const [isOpenListImage, setIsOpenListImage] = useState(false);
    const [tabSelect, setTabSelect] = useState(0);
    const [listImage, setListImage] = useState([]);

    const location = useLocation();
    const param = location.search.replace("?", "");
    const { translate } = useTranslate();
    const onGetDetailDiemDenAsync = async () => {
        const response = await api.getDiaDiemById(
            `dichvu/top/${param}?idDanhMuc=${Constants.CategoryConfig.Restaurant.value}`,
            setLoading
        );
        setDetailRestaurant(response.diaDiem);
    };

    useEffect(() => {
        onGetDetailDiemDenAsync().then((_) => { });
    }, []);

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"restaurantSlogan"}
                redirect={ROUTE_PATH.FESTIVAL}
                redirectPage={"restaurant"}
                currentPage={"detail"}
            />
            <section className="package-details">
                <div className="title-name-view-page">{translationData(detailRestaurant.tenDiaDiem, detailRestaurant.tenDiaDiemUS)}</div>
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
                                                            detailRestaurant.hinhAnh?.indexOf("http") == -1
                                                                ?
                                                                showImageCommon(detailRestaurant.hinhAnh)
                                                                :
                                                                detailRestaurant.hinhAnh
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
                                            <p className='text-align-justify'>{translationData(detailRestaurant.moTa, detailRestaurant.moTaUS)}</p>
                                            <div className="pkg-list-info">
                                                <ul>
                                                    <li><h6>{translate("restaurantName")} :</h6> <span>{translationData(detailRestaurant.tenDiaDiem, detailRestaurant.tenDiaDiemUS)} </span></li>
                                                    <li><h6>{translate("address")} :</h6> <span>{translationData(detailRestaurant.diaChi, detailRestaurant.diaChiUS)}</span></li>
                                                    <li><h6>{translate("phoneNumber")} :</h6> <span>{detailRestaurant.sdtLienHe}</span></li>
                                                    <li><h6>{translate("email")} :</h6> <span>{detailRestaurant.emailLienHe}</span></li>
                                                    <li><h6>{translate("price")} :</h6> <span>
                                                        {detailRestaurant.giaVe === Constants.FreePrice ?
                                                            (translationData(detailRestaurant.giaVe, detailRestaurant.giaVeUS))
                                                            :
                                                            detailRestaurant.giaVe == null
                                                                ? translate("free")
                                                                : `Chỉ từ: ${detailRestaurant.giaVe}`
                                                        }
                                                    </span></li>
                                                    <li><h6>{translate("openTime")} :</h6> <span>{detailRestaurant.gioMoCua} {detailRestaurant.gioDongCua && `- ${detailRestaurant.gioDongCua}`}</span></li>
                                                </ul>
                                            </div>
                                            <div className="pkg-info-container">
                                                <ul>
                                                    <li className="d-flex align-items-center">
                                                        <div className="mr-10">
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                        <div>
                                                            {detailRestaurant.soSaoTrungBinh}
                                                        </div>
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                        <div className="mr-10">
                                                            <i className="fa fa-eye"></i>
                                                        </div>
                                                        <div>
                                                            ({detailRestaurant.luotXem} {translate("view")}){" "}
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
                                                    {detailRestaurant.uriVideo ? (
                                                        <video style={{ width: "100%" }} controls>
                                                            <source
                                                                src={showImageCommon(detailRestaurant.uriVideo)}
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

export default RestaurantDetail