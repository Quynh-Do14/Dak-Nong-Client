import React, { useEffect, useState } from "react";
import BannerCommon from "../../infratructure/common/controls/banner";
import { ROUTE_PATH } from "../../core/common/appRouter";
import MainLayout from "../../infratructure/common/layout/main-layout";
import api from "../../infratructure/api";
import Constants from "../../core/common/constant";
import { showImageCommon, translationData } from "../../infratructure/utils/helper";
import PaginationCommon from "../../infratructure/common/controls/pagination";
import LoadingFullPage from "../../infratructure/common/controls/loading";
import SearchTour from "./search";
import useTranslate from "../../core/common/hook/useTranslate";
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

  const { translate } = useTranslate();

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
      ).then((_) => { });
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
    ).then((_) => { });
  };

  const onNextPage = () => {
    setChangePage(changePage + 1);
    onSearch(
      searchText,
      pageSize,
      changePage + 1,
      searchDanhMuc,
      searchQuanHuyen
    ).then((_) => { });
  };
  useEffect(() => {
    onSearch().then((_) => { });
    onGetQuanHuyenAsync().then((_) => { });
  }, []);

  const onSelectDanhMuc = (e) => {
    setSearchDanhMuc(e);
    onSearch(
      searchText,
      pageSize,
      changePage,
      e,
      searchQuanHuyen
    ).then((_) => { });
  };

  const onSelectQuanHuyen = (e) => {
    setSearchQuanHuyen(e);
    onSearch(
      searchText,
      pageSize,
      changePage,
      searchDanhMuc,
      e
    ).then((_) => { });
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
        searchDanhMuc={searchDanhMuc}
        dsDanhMucDiaDiem={dsDanhMucDiaDiem}
        onSelectDanhMuc={onSelectDanhMuc}
        searchQuanHuyen={searchQuanHuyen}
        onSelectQuanHuyen={onSelectQuanHuyen}
      />
      <section className="deals position-relative">
        <div className="container position-absolute">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-title">
                <div className="deal-icon">
                  <img
                    src="assets/images/icons/doler.png"
                    alt="doler"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid padding-common">
          <div className="row">
            {listDiaDiem.map((it, index) => (
              <div key={index} className="pl-10 mb-30 pr-10 col-xl-3 col-lg-4 col-md-6 col-xs-12">
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
                        <i className="fa fa-star pr-2"></i>
                        {it.soSaoTrungBinh} ({it.luotXem} {translate("view")}){" "}
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
            <PaginationCommon
              changePage={changePage}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
              pagination={pagination}
            />
          </div>
        </div>
      </section >
      <LoadingFullPage loading={loading} />
    </MainLayout >
  );
};

export default TourPage;
