import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import BannerCommon from '../../infratructure/common/controls/banner'
import { ROUTE_PATH } from '../../core/common/appRouter'
import LoadingFullPage from '../../infratructure/common/controls/loading'
import { useLocation } from 'react-router-dom'
import api from '../../infratructure/api'
import Constants from '../../core/common/constant'
import RelationDestination from '../../infratructure/common/controls/relation-destination'
import { showImageCommon } from '../../infratructure/utils/helper'
import useTranslate from '../../core/common/hook/useTranslate'

const TourDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailTour, setDetailTour] = useState({});
    const [dsDiaDiemLienQuan, setDiaDiemLienQuan] = useState([]);
    const [tabSelect, setTabSelect] = useState(0);
    const location = useLocation();

    const param = location.search.replace("?", "");
    const { translate } = useTranslate();

    const onGetDetailDiemDenAsync = async () => {
        const response = await api.getDiaDiemById(
            `dichvu/top/${param}?idDanhMuc=${Constants.CategoryConfig.Location.value}`,
            setLoading
        );
        setDetailTour(response.diaDiem);
        const responses = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${response.diaDiem.idDanhMuc}&${Constants.Params.limit
            }=${3}&idQuanHuyen=${response.diaDiem.idQuanHuyen}`,
            setLoading
        );
        setDiaDiemLienQuan(responses.data.diaDiems);
    };

    useEffect(() => {
        onGetDetailDiemDenAsync().then((_) => { });
    }, []);

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={detailTour.tenDiaDiem}
                redirect={ROUTE_PATH.TOUR}
                redirectPage={"Tour"}
                currentPage={"detail"}
            />
            <section className="package-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="package-details-left-container">
                                <div className="package-tab">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            {Constants.TabDetailTour.list.map((it, index) => (
                                                <button key={index} onClick={() => setTabSelect(index)} className={`nav-link ${tabSelect == index ? "active" : ""}`} id="nav-home-tab" type="button" role="tab"><i className={`${it.icon} mr-10`}></i>{translate(it.name)} </button>
                                            ))}
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-20" id="nav-tabContent">
                                        {
                                            tabSelect === 0
                                                ?
                                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                                    <div className="pkg-nav-contant">
                                                        <img src={
                                                            detailTour.hinhAnh?.indexOf("http") == -1
                                                                ?
                                                                showImageCommon(detailTour.hinhAnh)
                                                                :
                                                                detailTour.hinhAnh
                                                        } alt="img" className='' />
                                                    </div>
                                                </div>
                                                :
                                                tabSelect === 1 && detailTour.uriVideo
                                                    ?
                                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                                        <div className="pkg-nav-contant">
                                                            <div className="nav-list">

                                                                <video style={{ width: "100%" }} controls>
                                                                    <source src={detailTour.uriVideo} type="video/mp4" />
                                                                </video>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                                        <div className="pkg-nav-contant">
                                                            <img src={
                                                                detailTour.hinhAnh?.indexOf("http") == -1
                                                                    ?
                                                                    showImageCommon(detailTour.hinhAnh)
                                                                    :
                                                                    detailTour.hinhAnh
                                                            } alt="img" className='' />
                                                        </div>
                                                    </div>
                                        }


                                    </div>
                                </div>

                                <div className="pkg-common-title">
                                    <h4>{translate("detail")} </h4>
                                </div>
                                <p className='text-align-justify'>{detailTour.moTa} </p>

                                <div className="pkg-list-info">
                                    <ul>
                                        <li><h6>{translate("destination")} :</h6> <span>{detailTour.tenDiaDiem} </span></li>
                                        <li><h6>{translate("type")} :</h6> <span>{detailTour.tenDanhMuc}</span></li>
                                        <li><h6>{translate("address")} :</h6> <span>{detailTour.diaChi} </span></li>
                                        <li><h6>{translate("price")} :</h6> <span>{detailTour.giaVe === Constants.FreePrice || Constants.Undefined ? Constants.FreePrice : `Chỉ từ: ${detailTour.giaVe}`}</span></li>
                                        <li><h6>{translate("openTime")} :</h6> <span>{detailTour.gioMoCua} - {detailTour.gioDongCua}</span></li>
                                    </ul>
                                </div>
                                <div className="pkg-info-container">
                                    <ul>
                                        <li><i className="fa fa-star"></i>{detailTour.soSaoTrungBinh} </li>
                                        <li><i className="fa fa-eye"></i> {detailTour.luotXem} {translate("view")} </li>
                                        <li><i className="fa fa-wifi"></i> Wi-fi</li>
                                    </ul>
                                    <ul>
                                        <li><i className="fa fa-gear"></i> {translate("serviceAttentive")}</li>
                                        <li><i className="fa fa-car"></i> {translate("transportation")} </li>
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

                                <RelationDestination
                                    title={translate("relatedSchedule")}
                                    data={dsDiaDiemLienQuan}
                                />
                            </div>
                        </div>

                        {/* <div className="col-lg-4">
                            <div className="package-details-right-container">
                                <div className="destination-common-title">
                                    <h4>{translate("makeReservation")}</h4>
                                </div>

                                <div className="package-details-right-form">
                                    <form>
                                        <div className="form-label">
                                            <label><i className="fa fa-pencil"></i></label>
                                            <input type="text" placeholder="Họ và tên *" required />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-envelope"></i></label>
                                            <input type="email" placeholder="Email *" required />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-phone"></i></label>
                                            <input type="text" placeholder="SĐT" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-calendar"></i></label>
                                            <input type="text" placeholder="Check - In" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-calendar"></i></label>
                                            <input type="text" placeholder="Check - Out" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-user"></i></label>
                                            <input type="text" placeholder="Số người" />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-pencil"></i></label>
                                            <input type="text" placeholder="Số vé *" required />
                                        </div>
                                        <div className="form-label">
                                            <label><i className="fa fa-circle-question"></i></label>
                                            <input type="text" placeholder="Ghi chú" />
                                        </div>
                                        <button type="submit">Đăng kí</button>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section >
            <LoadingFullPage loading={loading} />
        </MainLayout >
    )
}

export default TourDetail