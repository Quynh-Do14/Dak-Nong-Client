import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import Constants from '../../core/common/constant'
import api from '../../infratructure/api';
import Tour from './tour';
import Article from './article';
import { showImageCommon } from '../../infratructure/utils/helper';
import Destination from './destination';
import Festival from './festival';
import SlideBanner from '../../infratructure/common/controls/slide-banner';
import Specialty from './specialty';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import { ROUTE_PATH } from '../../core/common/appRouter';
import sail from '../../asset/img/shape/sail.png'
const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [listTinTuc, setListTinTuc] = useState([]);
    const [listDiaDiem, setListDiaDiem] = useState([]);
    const [listDiaDiemTop2, setListDiaDiemTop2] = useState([]);
    const [listDiaDiemTop4TuTop2, setListDiaDiemTop4TuTop2] = useState([]);
    const [listDacSan, setListDacSan] = useState([]);
    const [listLeHoi, setListLeHoi] = useState([]);


    const onGetListDiemDenAsync = async () => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Location.value}&${Constants.Params.limit}=3`,
            setLoading
        );
        setListDiaDiem(response.data.diaDiems);
        // setPagination(response.data.pagination);
        // setTotalItem(response.data.totalItems);
    };

    const onGetTop2DiaDiemDuLich = async () => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Location.value}&${Constants.Params.limit
            }=${2}&${Constants.Params.page}=2`,
            setLoading
        );
        setListDiaDiemTop2(response.data.diaDiems);
        // setPagination(response.data.pagination);
        // setTotalItem(response.data.totalItems);
    };
    const onGetTop4TuTop2DiaDiemDuLich = async () => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Location.value}&${Constants.Params.limit
            }=${4}&page=2`,
            setLoading
        );
        setListDiaDiemTop4TuTop2(response.data.diaDiems);
        // setPagination(response.data.pagination);
        // setTotalItem(response.data.totalItems);
    };

    const onGetListDacSanAsync = async () => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Specialty.value}&${Constants.Params.limit}=2`,
            setLoading
        );
        setListDacSan(response.data.diaDiems);
        // setPagination(response.data.pagination);
        // setTotalItem(response.data.totalItems);
    };

    const onGetListLeHoiAsync = async () => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Festival.value}&${Constants.Params.limit}=3`,
            setLoading
        );
        setListLeHoi(response.data.diaDiems);
        // setPagination(response.data.pagination);
        // setTotalItem(response.data.totalItems);
    };

    const onGetListTinTucAsync = async () => {
        const response = await api.getAllTinTuc(`loaitin?type=1&limit=3`, setLoading);
        setListTinTuc(response.data.tinTucs);
        // setPagination(response.data.pagination);
        // setTotalItem(response.data.totalItems);
    };
    useEffect(() => {
        onGetListDiemDenAsync().then((_) => { });
        onGetListTinTucAsync().then((_) => { });
        onGetListDacSanAsync().then((_) => { });
        onGetListLeHoiAsync().then((_) => { });
        onGetTop2DiaDiemDuLich().then((_) => { });
        onGetTop4TuTop2DiaDiemDuLich().then((_) => { });
    }, []);
    let newArr = listDiaDiemTop2.filter((it, index) => index !== 0)
    console.log(newArr);
    return (

        <MainLayout>
            <SlideBanner />
            {/* //////////////// */}
            {/* //////////////// */}
            <section className="category home3-category bg-white">
                <div className="sail-image">
                    <img src={sail} alt="shape" className='mt-200'/>
                </div>
                <div className="add-spring">
                    <img src={sail} alt="shape" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="align-title">
                                <h5>Loại hình du lịch</h5>
                                <h3>Những loại hình du lịch nổi bật nhất</h3>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="category-content wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1000ms">
                                <div className="category-content-inner">
                                    <div className="category-image-container">
                                        <div className="category-image">
                                            <img src="assets/images/icons/c-1.png" alt="icon" />
                                        </div>
                                    </div>
                                    <h5>Du lịch thành phố</h5>
                                    <span>30 Địa Điểm</span>
                                    <a href="destination-details.html" className="category-btn"><i className="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="category-content wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1200ms">
                                <div className="category-content-inner">
                                    <div className="category-image-container">
                                        <div className="category-image">
                                            <img src="assets/images/icons/c-2.png" alt="icon" />
                                        </div>
                                    </div>
                                    <h5>Thiên nhiên</h5>
                                    <span>30 Địa Điểm</span>
                                    <a href="destination-details.html" className="category-btn"><i className="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="category-content wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1600ms">
                                <div className="category-content-inner">
                                    <div className="category-image-container">
                                        <div className="category-image">
                                            <img src="assets/images/icons/c-4.png" alt="icon" />
                                        </div>
                                    </div>
                                    <h5>Du lịch tâm linh</h5>
                                    <span>30 Địa Điểm</span>
                                    <a href="destination-details.html" className="category-btn"><i className="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="category-content wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1800ms">
                                <div className="category-content-inner">
                                    <div className="category-image-container">
                                        <div className="category-image">
                                            <img src="assets/images/icons/c-5.png" alt="icon" />
                                        </div>
                                    </div>
                                    <h5>Lịch sử văn hóa</h5>
                                    <span>30 Địa Điểm</span>
                                    <a href="destination-details.html" className="category-btn"><i className="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* //////////////// */}
            <section className="popular-ture home3-popular-ture">
                <div className="sail-image">
                    <img src="assets/images/shape/sail.png" alt="shape" />
                </div>
                <div className="spring-arrow-r">
                    <img src="assets/images/shape/spring-arrow-r.png" alt="arrow" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="align-title">
                                <h3>Khám phá du lịch Đắk Nông</h3>
                            </div>
                        </div>
                        {Constants.DataHomePage.list.map((it, index) => (
                            <div key={index} className="col-lg-3 col-md-6">
                                <div className="popular-ture-content wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                                    <div className="popular-ture-image">
                                        <img src={it.img} alt="image" />
                                    </div>
                                    <div className="popular-ture-overlay">
                                        <div className="popular-ture-text">
                                            <a href={it.link}>{it.name} </a>
                                            <h6> {it.description} </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* //////////////// */}
            <Destination
                data={listDiaDiem}
            />
            {/* //////////////// */}
            <section className="divider">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="divider-content">
                                <h5>Sẵn sáng cho những</h5>
                                <h2> trải nghiệm
                                    <span> du lịch mới
                                        <svg className="banner-text-shape" width="247" height="38" viewBox="0 0 247 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path id="signature3" d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
                                            <path id="signature4" d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
                                        </svg>
                                    </span>
                                </h2>
                            </div>
                            <div className="btn-group">
                                <div className="header-link-btn"><a href={ROUTE_PATH.TOUR} className="btn-1">Khám phá ngay <span></span></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* //////////////// */}
            <Article
                data={listTinTuc}
            />
            <Specialty
                data={listDacSan}
            />
            <Festival
                data={listLeHoi}
            />
            {/* //////////////// */}
            <section className="divider">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="divider-content">
                                <h5>Trải nghiệm những</h5>
                                <h2> đặc sản của
                                    <span> Đắk Nông
                                        <svg className="banner-text-shape" width="247" height="38" viewBox="0 0 247 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path id="signature3" d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
                                            <path id="signature4" d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236" stroke="#FE7524" stroke-width="5" stroke-linecap="round" />
                                        </svg>
                                    </span>
                                </h2>
                            </div>
                            <div className="btn-group">
                                <div className="header-link-btn"><a href={ROUTE_PATH.SPECIALTY} className="btn-1">Khám phá ngay <span></span></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* //////////////// */}

            {/* //////////////// */}
            {/* <section className="destination">
                <div className="destination-icon"/>
                    <img src="assets/images/icons/plan.png" alt="icon" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="align-title">
                                <h3>Địa điểm du lịch</h3>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="destination-container">
                                <div className="destination-image">
                                    <a href="destination-details.html"><img src={
                                        listDiaDiem[0]?.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(listDiaDiem[0]?.hinhAnh)
                                            :
                                            listDiaDiem[0]?.hinhAnh
                                    } alt="image" className='img-destination' /></a>
                                </div>
                                <div className="destination-content destination-content-1">
                                    <h6>{listDiaDiem[0]?.tenDiaDiem}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            {
                                listDiaDiemTop2.map((it, index) => (
                                    <div key={index} className="destination-container mb-24">
                                        <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}>
                                            <div className="destination-image">
                                                <a href="destination-details.html"><img src={
                                                    it?.hinhAnh?.indexOf("http") == -1
                                                        ?
                                                        showImageCommon(it?.hinhAnh)
                                                        :
                                                        it?.hinhAnh
                                                } alt="image" className='img-destination-s' /></a>
                                            </div>
                                            <div className="destination-content destination-content-2">
                                                <h6>{it?.tenDiaDiem}</h6>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="align-title">
                            <h3>Địa điểm du lịch</h3>
                            </div>
                        </div>
                        {listDiaDiem.map((it, index) => (

                            <div key={index} className="col-lg-4">
                                <div className="portfolio-content">
                                    <div className="portfolio-info">
                                        <img src={
                                            it?.hinhAnh?.indexOf("http") == -1
                                                ?
                                                showImageCommon(it?.hinhAnh)
                                                :
                                                it?.hinhAnh
                                        } alt="img" />
                                        <div className="personal-info">
                                            <ul>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star"></i></li>
                                                <li><span>5.0</span></li>
                                            </ul>
                                            <h6 className='text-truncate-title'>{it.tenDiaDiem}</h6>
                                            <span>{it.tenQuanHuyen}</span>
                                        </div>
                                    </div>
                                    <p className='text-truncate-description'>{it.moTa} </p>
                                    <div className="qutetion">
                                        <img src="assets/images/icons/qutation.png" alt="qutation" />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            {/* //////////////// */}
            <LoadingFullPage loading={loading} />
        </MainLayout>
    )
}

export default HomePage