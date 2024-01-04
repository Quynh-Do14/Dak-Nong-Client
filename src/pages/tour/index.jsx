import React, { useEffect, useState } from "react";
import BannerCommon from "../../infratructure/common/controls/banner";
import { ROUTE_PATH } from "../../core/common/appRouter";
import MainLayout from "../../infratructure/common/layout/main-layout";
import api from "../../infratructure/api";
import Constants from "../../core/common/constant";
import { showImageCommon } from "../../infratructure/utils/helper";
import PaginationCommon from "../../infratructure/common/controls/pagination";
import LoadingFullPage from "../../infratructure/common/controls/loading";
import SearchTour from "./search";
let timeout;
const TourPage = () => {
  const [listDiaDiem, setListDiaDiem] = useState([]);

  const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
  const [dsDanhMucDiaDiem, setDsDanhMucDiaDiem] = useState([]);

  const [pagination, setPagination] = useState({});
  const [totalItem, setTotalItem] = useState();

  const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
  const [changePage, setChangePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuanHuyen, setSearchQuanHuyen] = useState("");
  const [searchDanhMuc, setSearchDanhMuc] = useState(
    Constants.CategoryConfig.Location.value
  );

  const onGetListDiemDenAsync = async ({
    searchText = "",
    limit = pageSize,
    page = changePage,
    danhMuc = "",
    quanhuyen = "",
  }) => {
    const response = await api.getAllDiaDiem(
      `dichvu/top?${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&idQuanHuyen=${quanhuyen}&search=${searchText}&idDanhMuc=${danhMuc}`,
      setLoading
    );
    setListDiaDiem(response.data.diaDiems);
    setPagination(response.data.pagination);
    setTotalItem(response.data.totalItems);
  };

  const onGetQuanHuyenAsync = async () => {
    const response = await api.getAllQuanHuyen(``, setLoading);
    const resGetDanhMucConCuaDanhMuc = await api.getDanhMucConCuaDanhMuc(
      `idDanhMuc=${1}`,
      setLoading
    );
    setDsQuanHuyen(response.data.quanHuyens);
    setDsDanhMucDiaDiem(resGetDanhMucConCuaDanhMuc.result);
  };

  const onSearch = async (
    searchText = "",
    limit = pageSize,
    page = changePage,
    danhMuc = 1,
    quanhuyen = ""
  ) => {
    onGetListDiemDenAsync({
      searchText: searchText,
      limit: limit,
      page: page,
      danhMuc: danhMuc,
      quanhuyen: quanhuyen,
    });
  };

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch(
        e.target.value,
        pageSize,
        changePage,
        searchDanhMuc,
        searchQuanHuyen
      ).then((_) => {});
    }, Constants.DEBOUNCE_SEARCH);
  };

  const onPreviousPage = () => {
    setChangePage(changePage - 1);
    onSearch(
      searchText,
      pageSize,
      changePage - 1,
      searchDanhMuc,
      searchQuanHuyen
    ).then((_) => {});
  };

  const onNextPage = () => {
    setChangePage(changePage + 1);
    onSearch(
      searchText,
      pageSize,
      changePage + 1,
      searchDanhMuc,
      searchQuanHuyen
    ).then((_) => {});
  };
  useEffect(() => {
    onSearch().then((_) => {});
    onGetQuanHuyenAsync().then((_) => {});
  }, []);

  const onSelectDanhMuc = (e) => {
    setSearchDanhMuc(e.target.value);
    onSearch(
      searchText,
      pageSize,
      changePage,
      e.target.value,
      searchQuanHuyen
    ).then((_) => {});
  };

  const onSelectQuanHuyen = (e) => {
    setSearchQuanHuyen(e.target.value);
    onSearch(
      searchText,
      pageSize,
      changePage,
      searchDanhMuc,
      e.target.value
    ).then((_) => {});
  };

  return (
    <MainLayout className={"bg-white"}>
      <BannerCommon
        title={"chooseSchedule"}
        redirect={ROUTE_PATH.HOME_PAGE}
        redirectPage={"homePage"}
        currentPage={"Tour"}
      />
      <SearchTour
        searchText={searchText}
        onChangeSearchText={onChangeSearchText}
        dsQuanHuyen={dsQuanHuyen}
        dsDanhMucDiaDiem={dsDanhMucDiaDiem}
        onSelectDanhMuc={onSelectDanhMuc}
        onSelectQuanHuyen={onSelectQuanHuyen}
      />
      <section
        className="deals"
        style={{
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{
            position: "absolute",
            top: -65,
            left: 174,
          }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="common-title">
                <div className="deal-icon">
                  <img src="assets/images/icons/doler.png" alt="doler" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container deals-slider-wrapper">
          <div className="deals-slider owl-carousel owl-theme row">
            {listDiaDiem.map((it, index) => (
              <div key={index} className="pl-10 mb-30 pr-10 col-lg-4 col-xs-12">
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
                        <i className="fa fa-star pr-5"></i>
                        {it.soSaoTrungBinh} ({it.luotXem} Lượt xem){" "}
                      </li>
                      <li>
                        <span>
                          {" "}
                          {it.giaVe === Constants.FreePrice ||
                          Constants.Undefined
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
                    <p>
                      <i className="flaticon-map"></i>
                      {it.diaChi}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LoadingFullPage loading={loading} />
    </MainLayout>
  );
};

export default TourPage;
