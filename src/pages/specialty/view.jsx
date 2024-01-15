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

const SpecialtyDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailSpecialty, setDetailSpecialty] = useState({});
    const [tabSelect, setTabSelect] = useState(0);
    const location = useLocation()
    const param = location.search.replace("?", "");
    const { translate } = useTranslate();

    const onGetDetailDacSanAsync = async () => {
        const response = await api.getDiaDiemById(
            `dichvu/top/${param}?idDanhMuc=${Constants.CategoryConfig.Specialty.value}`,
            setLoading
        )
        setDetailSpecialty(response.diaDiem);
    }

    useEffect(() => {
        onGetDetailDacSanAsync().then(_ => { });
    }, []);

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"chooseSchedule"}
                redirect={ROUTE_PATH.SPECIALTY}
                redirectPage={"specialty"}
                currentPage={"detail"}
            />
            <section className="package-details">
                <div className="title-name-view-page">{translationData(detailSpecialty.tenDiaDiem, detailSpecialty.tenDiaDiemUS)}</div>
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
                                                    detailSpecialty.hinhAnh?.indexOf("http") == -1
                                                        ?
                                                        showImageCommon(detailSpecialty.hinhAnh)
                                                        :
                                                        detailSpecialty.hinhAnh
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
                                    <h4>{translate("detail")} </h4>
                                </div>
                                <p className='text-align-justify'>{translationData(detailSpecialty.moTa, detailSpecialty.moTaUS)}</p>
                                <div className="pkg-list-info">
                                    <ul>
                                        <li><h6>{translate("specialtyName")} :</h6> <span>{translationData(detailSpecialty.tenDiaDiem, detailSpecialty.tenDiaDiemUS)} </span></li>
                                        <li><h6>{translate("address")} :</h6> <span>{translationData(detailSpecialty.diaChi, detailSpecialty.diaChiUS)}</span></li>
                                        <li><h6>{translate("phoneNumber")} :</h6> <span>{detailSpecialty.sdtLienHe}</span></li>
                                        <li><h6>{translate("email")} :</h6> <span>{detailSpecialty.emailLienHe}</span></li>
                                        {/* <li><h6>{translate("price")} :</h6> <span>{detailSpecialty.giaVe === Constants.FreePrice || Constants.Undefined ? Constants.FreePrice : `Chỉ từ: ${detailSpecialty.giaVe}`}</span></li>
                                        <li><h6>{translate("openTime")} :</h6> <span>{convertTimeOnly(detailSpecialty.gioMoCua)} - {convertTimeOnly(detailSpecialty.gioDongCua)}</span></li> */}
                                    </ul>
                                </div>
                                <div className="pkg-info-container">
                                    <ul>
                                        <li className="d-flex align-items-center">
                                            <div className="mr-10">
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div>
                                                {detailSpecialty.soSaoTrungBinh}
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <div className="mr-10">
                                                <i className="fa fa-eye"></i>
                                            </div>
                                            <div>
                                                ({detailSpecialty.luotXem} {translate("view")}){" "}
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

export default SpecialtyDetail