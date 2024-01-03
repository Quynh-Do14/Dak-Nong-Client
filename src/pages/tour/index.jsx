import React, { useEffect, useState } from 'react';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infratructure/common/layout/main-layout';
import api from '../../infratructure/api';
import Constants from '../../core/common/constant';
import { showImageCommon } from '../../infratructure/utils/helper';
import PaginationCommon from '../../infratructure/common/controls/pagination';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import SearchTour from './search';
let timeout
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
    const [searchDanhMuc, setSearchDanhMuc] = useState(Constants.CategoryConfig.Location.value);

    const onGetListDiemDenAsync = async ({ searchText = "", limit = pageSize, page = changePage, danhMuc = "", quanhuyen = "" }) => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&idQuanHuyen=${quanhuyen}&search=${searchText}&idDanhMuc=${danhMuc}`,
            setLoading
        )
        setListDiaDiem(response.data.diaDiems);
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }

    const onGetQuanHuyenAsync = async () => {
        const response = await api.getAllQuanHuyen(
            ``,
            setLoading
        );
        const resGetDanhMucConCuaDanhMuc = await api.getDanhMucConCuaDanhMuc(
            `idDanhMuc=${1}`,
            setLoading
        );
        setDsQuanHuyen(response.data.quanHuyens);
        setDsDanhMucDiaDiem(resGetDanhMucConCuaDanhMuc.result);
    };

    const onSearch = async (searchText = "", limit = pageSize, page = changePage, danhMuc = 1, quanhuyen = "") => {
        onGetListDiemDenAsync({ searchText: searchText, limit: limit, page: page, danhMuc: danhMuc, quanhuyen: quanhuyen });
    };

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, changePage, searchDanhMuc, searchQuanHuyen).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onPreviousPage = () => {
        setChangePage(changePage - 1);
        onSearch(searchText, pageSize, changePage - 1, searchDanhMuc, searchQuanHuyen).then((_) => { });
    }

    const onNextPage = () => {
        setChangePage(changePage + 1);
        onSearch(searchText, pageSize, changePage + 1, searchDanhMuc, searchQuanHuyen).then((_) => { });
    }
    useEffect(() => {
        onSearch().then((_) => { });
        onGetQuanHuyenAsync().then((_) => { });
    }, []);

    const onSelectDanhMuc = (e) => {
        setSearchDanhMuc(e.target.value)
        onSearch(searchText, pageSize, changePage, e.target.value, searchQuanHuyen).then((_) => { });
    }

    const onSelectQuanHuyen = (e) => {
        setSearchQuanHuyen(e.target.value)
        onSearch(searchText, pageSize, changePage, searchDanhMuc, e.target.value).then((_) => { });
    }

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
            <div className="tour-package">
                <div className="container">
                    <div className="row">
                        {listDiaDiem.map((it, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="tour-package-container">
                                    <div className="activities-image">
                                        <a href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}><img src={
                                            it.hinhAnh?.indexOf("http") == -1
                                                ?
                                                showImageCommon(it.hinhAnh)
                                                :
                                                it.hinhAnh
                                        } className='img-page' alt="photo" /></a>
                                    </div>
                                    <div className="activities-content">
                                        <div className="tour-package-info">
                                            <div className="rating">
                                                <p><i className="fa fa-star"></i> {it.soSaoTrungBinh} ({it.luotXem} Lượt xem) </p>
                                            </div>
                                            <div className="doller">
                                                <span> {it.giaVe === Constants.FreePrice || Constants.Undefined ? Constants.FreePrice : `Chỉ từ: ${it.giaVe}`} </span>
                                            </div>
                                        </div>
                                        <a className='text-truncate-origin' href={`${ROUTE_PATH.VIEW_TOUR}?${it.idDiaDiem}`}>{it.tenDiaDiem}</a>
                                        <ul>
                                            <h6 className='text-truncate-address'><i className="flaticon-placeholder"></i>{it.diaChi} </h6>
                                        </ul>
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
            </div>
            <LoadingFullPage loading={loading} />
        </MainLayout>
    )
}

export default TourPage