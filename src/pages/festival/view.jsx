import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import BannerCommon from '../../infratructure/common/controls/banner'
import { ROUTE_PATH } from '../../core/common/appRouter'
import LoadingFullPage from '../../infratructure/common/controls/loading'
import { useLocation } from 'react-router-dom'
import api from '../../infratructure/api'
import Constants from '../../core/common/constant'
import RelationDestination from '../../infratructure/common/controls/relation-destination'
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper'
import useTranslate from '../../core/common/hook/useTranslate'

const FestivalDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailFestival, setDetailFestival] = useState({});
    const [isOpenListImage, setIsOpenListImage] = useState(false);
    const [tabSelect, setTabSelect] = useState(0);

    const location = useLocation();
    const search = location.search.replace("?", "");
    const { translate } = useTranslate();
    const onGetDetailDiemDenAsync = async () => {
        const response = await api.getDiaDiemById(
            `dichvu/top/${search}?idDanhMuc=${Constants.CategoryConfig.Festival.value}`,
            setLoading
        );
        setDetailFestival(response.diaDiem);
    };

    useEffect(() => {
        onGetDetailDiemDenAsync().then((_) => { });
    }, []);

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={detailFestival.tenDiaDiem}
                redirect={ROUTE_PATH.FESTIVAL}
                redirectPage={"festival"}
                currentPage={"detail"}
            />
            <section className="package-details">
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
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                            <div className="pkg-nav-contant">
                                                <img src={
                                                    detailFestival.hinhAnh?.indexOf("http") == -1
                                                        ?
                                                        showImageCommon(detailFestival.hinhAnh)
                                                        :
                                                        detailFestival.hinhAnh
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
                                </div>

                                <div className="pkg-common-title">
                                    <h4>Mô tả chi tiết</h4>
                                </div>
                                <p className='text-align-justify'>{detailFestival.moTa} </p>

                                <div className="pkg-list-info">
                                    <ul>
                                        <li><h6>{translate("festivalName")} :</h6> <span>{detailFestival.tenDiaDiem} </span></li>
                                        <li><h6>{translate("address")} :</h6> <span>{detailFestival.diaChi} </span></li>
                                        <li><h6>{translate("phoneNumber")} :</h6> <span>{detailFestival.sdtLienHe}</span></li>
                                        <li><h6>{translate("email")} :</h6> <span>{detailFestival.emailLienHe}</span></li>
                                        <li><h6>{translate("price")} :</h6> <span>{detailFestival.giaVe === Constants.FreePrice || Constants.Undefined ? Constants.FreePrice : `Chỉ từ: ${detailFestival.giaVe}`}</span></li>
                                        <li><h6>{translate("openTime")} :</h6> <span>{convertDateOnly(detailFestival.gioMoCua)} - {convertDateOnly(detailFestival.gioDongCua)}</span></li>
                                    </ul>
                                </div>
                                <div className="pkg-info-container">
                                    <ul>
                                        <li><i className="fa fa-star"></i>{detailFestival.soSaoTrungBinh} </li>
                                        <li><i className="fa fa-eye"></i> {detailFestival.luotXem} {translate("view")}</li>
                                        <li><i className="fa fa-wifi"></i> Wi-fi</li>
                                    </ul>
                                    <ul>
                                        <li><i className="fa fa-gear"></i> {translate("serviceAttentive")}</li>
                                        <li><i className="fa fa-car"></i> {translate("transportation")} </li>
                                    </ul>
                                </div>
                                <p className='text-align-justify'>{detailFestival.moTa} </p>

                                {/* <div className="faq-accordion ">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h4 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Why are your tours so expensive?
                                                </button>
                                            </h4>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some injected or words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h4 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    How will contact with us?
                                                </button>
                                            </h4>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some injected or words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h4 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    How to book the new tour for 2 persons?
                                                </button>
                                            </h4>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some injected or words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <RelationDestination
                                    title={"Lịch trình liên quan"}
                                    data={dsDiaDiemLienQuan}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <LoadingFullPage loading={loading} />
        </MainLayout >
    )
}

export default FestivalDetail