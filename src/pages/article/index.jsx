import React, { useEffect, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import Constants from "../../core/common/constant";
import api from "../../infratructure/api";
import { ROUTE_PATH } from "../../core/common/appRouter";
import BannerCommon from "../../infratructure/common/controls/banner";
import {
  convertDateOnly,
  showImageCommon,
} from "../../infratructure/utils/helper";
import SearchArticle from "./search";
import LoadingFullPage from "../../infratructure/common/controls/loading";
import PaginationCommon from "../../infratructure/common/controls/pagination";
import useTranslate from "../../core/common/hook/useTranslate";
let timeout;
const ArticlePage = () => {
  const [listTinTuc, setListTinTuc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({});
  const [totalItem, setTotalItem] = useState();
  const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
  const [changePage, setChangePage] = useState(1);

  const { translate } = useTranslate();
  const onGetListTinTucAsync = async ({
    searchText = "",
    limit = pageSize,
    page = 1,
  }) => {
    const response = await api.getAllTinTuc(
      `loaitin?type=1${
        searchText ? (searchText != "" ? `&search=${searchText}` : ``) : ``
      }&limit=${limit}&page=${page}`,
      setLoading
    );
    setListTinTuc(response.data.tinTucs);
    setPagination(response.data.pagination);
    setTotalItem(response.data.totalItems);
  };
  const onSearch = async (searchText = "", limit = pageSize, page = 1) => {
    onGetListTinTucAsync({ searchText: searchText, limit: limit, page: page });
  };
  useEffect(() => {
    onSearch().then((_) => {});
  }, []);

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch(e.target.value, pageSize, changePage).then((_) => {});
    }, Constants.DEBOUNCE_SEARCH);
  };

  const onPreviousPage = () => {
    setChangePage(changePage - 1);
    onSearch(searchText, pageSize, changePage - 1).then((_) => {});
  };

  const onNextPage = () => {
    setChangePage(changePage + 1);
    onSearch(searchText, pageSize, changePage + 1).then((_) => {});
  };
  return (
    <MainLayout className={"bg-white"}>
      <BannerCommon
        title={"todayArticle"}
        redirect={ROUTE_PATH.HOME_PAGE}
        redirectPage={"homePage"}
        currentPage={"article"}
      />
      <SearchArticle
        searchText={searchText}
        onChangeSearchText={onChangeSearchText}
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
                  <img
                    src="assets/images/icons/banner-icon-01.png"
                    alt="doler"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {listTinTuc.map((it, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="blog-content">
                  <div className="blog-image">
                    <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}>
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
                  <div className="blog-info">
                    <div className="blog-info">
                      <div className="footer-info">
                        <ul className="flex justify-content-start mb-10">
                          <li>
                            <i className="color-orange mr-10 fa fa-user"></i>
                            Duong Nguyen{" "}
                          </li>
                          <li>
                            <i className="color-orange mr-10 fa fa-calendar"></i>{" "}
                            <span>{convertDateOnly(it.ngayDang)} </span>
                          </li>
                        </ul>
                        <a
                          href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}
                          className="blog-title text-truncate-title"
                        >
                          {it.tieuDe}{" "}
                        </a>
                        <p className="text-truncate-description">
                          {it.tieuDeCon}{" "}
                        </p>
                        <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}>
                          {translate("viewMore")}{" "}
                        </a>
                      </div>
                    </div>
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
      </section>
      <LoadingFullPage loading={loading} />
    </MainLayout>
  );
};

export default ArticlePage;
