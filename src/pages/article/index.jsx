import React, { useEffect, useState } from "react";
import MainLayout from "../../infratructure/common/layout/main-layout";
import Constants from "../../core/common/constant";
import api from "../../infratructure/api";
import { ROUTE_PATH } from "../../core/common/appRouter";
import BannerCommon from "../../infratructure/common/controls/banner";
import {
  convertDateOnly,
  showImageCommon,
  translationData,
} from "../../infratructure/utils/helper";
import SearchArticle from "./search";
import LoadingFullPage from "../../infratructure/common/controls/loading";
import PaginationCommon from "../../infratructure/common/controls/pagination";
import useTranslate from "../../core/common/hook/useTranslate";
import moment from "moment";

let timeout;
const ArticlePage = () => {
  const [listTinTuc, setListTinTuc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [postDate, setPostDate] = useState("");
  const [pagination, setPagination] = useState({});
  const [totalItem, setTotalItem] = useState();
  const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
  const [changePage, setChangePage] = useState(1);
  const [sortBy, setSortby] = useState("DESC");

  const { translate } = useTranslate();
  const onGetListTinTucAsync = async ({
    searchText = "",
    postDate = postDate,
    sortBy = sortBy,
    limit = pageSize,
    page = 1,
  }) => {
    const response = await api.getAllTinTuc(
      `loaitin?type=1${searchText ? (searchText != "" ? `&search=${searchText}` : ``) : ``
      }&ngayDang=${postDate}&sort=${sortBy}&limit=${limit}&page=${page}`,
      setLoading
    );
    setListTinTuc(response.data.tinTucs);
    setPagination(response.data.pagination);
    setTotalItem(response.data.totalItems);
  };
  const onSearch = async (searchText = "", postDate = "", sortBy = "", limit = pageSize, page = 1) => {
    onGetListTinTucAsync({ searchText: searchText, postDate: postDate, sortBy: sortBy, limit: limit, page: page });
  };
  useEffect(() => {
    onSearch().then((_) => { });
  }, []);

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch(e.target.value, postDate, sortBy, pageSize, changePage).then((_) => { });
    }, Constants.DEBOUNCE_SEARCH);
  };

  useEffect(() => {
    if (postDate == null) {
      setPostDate("");
    }
  }, [postDate]);
  const onChangePostDate = (value, dateString) => {
    setPostDate(value)
    onSearch(searchText, dateString, sortBy, pageSize, changePage - 1).then((_) => { });
  }

  const onSortBy = (value) => {
    setSortby(value);
    onSearch(searchText, postDate, value, pageSize, changePage - 1).then((_) => { });
  };

  const onPreviousPage = () => {
    setChangePage(changePage - 1);
    onSearch(searchText, postDate, sortBy, pageSize, changePage - 1).then((_) => { });
  };

  const onNextPage = () => {
    setChangePage(changePage + 1);
    onSearch(searchText, postDate, sortBy, pageSize, changePage + 1).then((_) => { });
  };

  return (
    <MainLayout className={"bg-white"}>
      <BannerCommon
        title={"todayNews"}
        redirect={ROUTE_PATH.HOME_PAGE}
        redirectPage={"homePage"}
        currentPage={"news"}
      />
      <SearchArticle
        searchText={searchText}
        onChangeSearchText={onChangeSearchText}
        postDate={postDate}
        onChangePostDate={onChangePostDate}
        sortBy={sortBy}
        onSortBy={onSortBy}
      />
      <section className="deals position-relative">
        <div className="container position-absolute">
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

        <div className="container-fluid padding-common">
          <div className="row">
            {listTinTuc.map((it, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
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
                        <ul className="flex justify-content-between flex-wrap mb-10">
                          <li className='white-space-nowrap'>
                            <i className="color-orange mr-10 fa fa-user"></i>
                            Duong Nguyen{" "}
                          </li>
                          <li className='white-space-nowrap'>
                            <i className="color-orange mr-10 fa fa-calendar"></i>{" "}
                            <span>{convertDateOnly(it.ngayDang)} </span>
                          </li>
                        </ul>
                        <a
                          href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                          className="blog-title text-truncate-title-article"
                        >
                          {translationData(it.tieuDe, it.tieuDeUS)}
                          {" "}
                        </a>
                        <p className="text-truncate-description">
                          {translationData(it.tieuDeCon, it.tieuDeConUS)}
                          {" "}
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
