import React, { useEffect, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import Constants from "../../core/common/constant";
import api from "../../infratructure/api";
import Tour from "./tour";
import Article from "./article";
import { showImageCommon, translationData } from "../../infratructure/utils/helper";
import Destination from "./destination";
import Festival from "./festival";
import SlideBanner from "../../infratructure/common/controls/slide-banner";
import Specialty from "./specialty";
import LoadingFullPage from "../../infratructure/common/controls/loading";
import { ROUTE_PATH } from "../../core/common/appRouter";
import sail from "../../asset/img/shape/sail.png";
import useTranslate from "../../core/common/hook/useTranslate";
import ViewVideoModal from "../../infratructure/common/popup/view-video-modal";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [listTinTuc, setListTinTuc] = useState([]);
  const [listDiaDiem, setListDiaDiem] = useState([]);
  const [listDiaDiemTop2, setListDiaDiemTop2] = useState([]);
  const [listDiaDiemTop4TuTop2, setListDiaDiemTop4TuTop2] = useState([]);
  const [listDacSan, setListDacSan] = useState([]);
  const [listLeHoi, setListLeHoi] = useState([]);

  const [isOpenModalVideo, setIsOpenModalVideo] = useState(false);
  const [sourceVideo, setSourceVideo] = useState("");

  const { translate } = useTranslate();

  const onGetListDiemDenAsync = async () => {
    const response = await api.getAllDiaDiem(
      `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Location.value}&${Constants.Params.limit}=4`,
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
      `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Specialty.value}&${Constants.Params.limit}=4`,
      setLoading
    );
    setListDacSan(response.data.diaDiems);
    // setPagination(response.data.pagination);
    // setTotalItem(response.data.totalItems);
  };

  const onGetListLeHoiAsync = async () => {
    const response = await api.getAllDiaDiem(
      `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Festival.value}&${Constants.Params.limit}=4`,
      setLoading
    );
    setListLeHoi(response.data.diaDiems);
    // setPagination(response.data.pagination);
    // setTotalItem(response.data.totalItems);
  };

  const onGetListTinTucAsync = async () => {
    const response = await api.getAllTinTuc(
      `loaitin?type=1&limit=4`,
      setLoading
    );
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
  useEffect(() => {
    setLoading1(true);
    setTimeout(() => setLoading1(false), 1000);
  }, []);

  const onOpenModalVideo = (it) => {
    setIsOpenModalVideo(true);
    setSourceVideo(it?.link);
  };
  const onCloseModalVideo = () => {
    setIsOpenModalVideo(false);
    setSourceVideo("");
  };
  return (
    <MainLayout>
      <SlideBanner />
      {/* //////////////// */}
      <section className="category home3-category bg-white">
        <div className="sail-image">
          <img src={sail} alt="shape" className="mt-200" />
        </div>
        <div className="add-spring">
          <img src={sail} alt="shape" />
        </div>
        <div className="container-fluid padding-common">
          <div className="row">
            <div className="col-lg-12">
              <div className="align-title">
                <h5>{translate("type")} </h5>
                <h3>{translate("mostProminent")} </h3>
              </div>
            </div>
            {Constants.TypeTourism.list.map((it, index) => (
              <div
                key={index}
                className="col-xl-2 col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center"
              >
                <div
                  className="category-content wow fadeInUp"
                  data-wow-delay="00ms"
                  data-wow-duration="1000ms"
                >
                  <div className="category-content-inner">
                    <div className="category-image-container">
                      <div className="category-image">
                        {/* <img src={it.icon} alt="icon" /> */}
                        <div className="banner-vedio-image-2">
                          <img src={it.img} alt="" className="border-radius-ellipse" />
                          <div className="missiom-video-btn">
                            <a onClick={() => onOpenModalVideo(it)} className="hv-popup-link"><i className="fas fa-play"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5>{translate(it.name)} </h5>
                    {/* <span>30 Địa Điểm</span> */}
                    <a onClick={() => onOpenModalVideo(it)} className="category-btn">
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* //////////////// */}

      <section
        className="popular-ture home3-popular-ture"
        style={{
          backgroundColor: "#eeeeee",
          paddingTop: 0,
        }}
      >
        <div
          className="home-two-pattern-layer"
          style={{
            backgroundImage: "url(assets/images/shape/destination-map.png)",
          }}
        ></div>
        <div className="container-fluid padding-common">
          <div className="row">
            <div
              style={{
                height: 48,
              }}
            ></div>
            <div className="col-lg-12">
              <div className="align-title">
                <h3>{translate("exploreTravel")}</h3>
              </div>
            </div>
            {Constants.DataHomePage.list.map((it, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-6 mb-20">
                <div className="choose-content wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1000ms">
                  <a href={it.link} className="mt-0 mb-0">
                    <div className="">
                      <img src={it.img} alt="icon" />
                    </div>
                  </a>
                  <div className="choose-bottom-icon">
                    <img src={it.iconBot} alt="icon" />
                  </div>
                  <span>{translate(it.name)} </span>
                  <a className="text-truncate-title-explore" href={it.link}>{translate(it.name)}</a>
                  <p className="text-truncate-description-explore">{translate(it.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* //////////////// */}

      <Destination data={listDiaDiem} />
      {/* //////////////// */}
      <section className="divider">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="divider-content">
                <h5>{translate("readyFor")}</h5>
                <h2>
                  <span>
                    {" "}
                    {translate("experienceTravel")}
                    <svg
                      className="banner-text-shape"
                      width="247"
                      height="38"
                      viewBox="0 0 247 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="signature3"
                        d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277"
                        stroke="#FE7524"
                        stroke-width="5"
                        stroke-linecap="round"
                      />
                      <path
                        id="signature4"
                        d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236"
                        stroke="#FE7524"
                        stroke-width="5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </h2>
              </div>
              <div className="btn-group">
                <div className="header-link-btn">
                  <a href={ROUTE_PATH.TOUR} className="btn-1">
                    {translate("exploreNow")} <span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //////////////// */}
      <Article data={listTinTuc} />

      {/* //////////////// */}
      <Tour data={listDiaDiem} />
      {/* //////////////// */}
      <Specialty data={listDacSan} />
      {/* //////////////// */}
      <section className="divider">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="divider-content">
                <h5>{translate("experienceThese")} </h5>
                <h2>
                  {translate("specialtyOf")}
                  <span>
                    {translate("daknong")}
                    <svg
                      className="banner-text-shape"
                      width="247"
                      height="38"
                      viewBox="0 0 247 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="signature3"
                        d="M3.18577 22.2125C3.18577 22.2125 155.675 -3.21963 241.039 14.2277"
                        stroke="#FE7524"
                        stroke-width="5"
                        stroke-linecap="round"
                      />
                      <path
                        id="signature4"
                        d="M3.55141 17.792C3.55141 17.792 158.876 1.54075 243.929 23.8236"
                        stroke="#FE7524"
                        stroke-width="5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </h2>
              </div>
              <div className="btn-group">
                <div className="header-link-btn">
                  <a href={ROUTE_PATH.SPECIALTY} className="btn-1">
                    {translate("exploreNow")} <span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //////////////// */}
      <Festival data={listLeHoi} />

      <LoadingFullPage loading={loading1} />
      <ViewVideoModal
        source={sourceVideo}
        visible={isOpenModalVideo}
        onCancel={onCloseModalVideo}
      />
    </MainLayout >
  );
};

export default HomePage;
