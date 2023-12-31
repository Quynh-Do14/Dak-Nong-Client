import React, { useEffect, useState } from 'react';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infratructure/common/layout/main-layout';
import api from '../../infratructure/api';
import Constants from '../../core/common/constant';
import { convertDateOnly, convertTimeOnly, showImageCommon } from '../../infratructure/utils/helper';
import PaginationCommon from '../../infratructure/common/controls/pagination';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import SearchTour from './search';
import SearchFestival from './search';
import SearchSpecialty from './search';
let timeout
const SpecialtyPage = () => {
    const [listDacSan, setListDacSan] = useState([]);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [changePage, setChangePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [qH, setQH] = useState("");
    const [searchText, setSearchText] = useState("");
    const [dsQuanHuyen, setDsQuanHuyen] = useState([])

    const onGetListDacSanAsync = async ({ searchText = "", limit = pageSize, page = 1, qH = "" }) => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Specialty.value}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&searchDiaChi=${searchText}&idQuanHuyen=${qH}`,
            setLoading
        )
        setListDacSan(response.data.diaDiems);
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }

    const onGetQuanHuyenAsync = async () => {
        const response = await api.getAllQuanHuyen(
            ``,
            setLoading
        );
        setDsQuanHuyen(response.data.quanHuyens);
    };


    const onSearch = async (searchText = "", limit = pageSize, page = 1, qH = "") => {
        onGetListDacSanAsync({ searchText: searchText, limit: limit, page: page, qH: qH })
    }
    useEffect(() => {
        onSearch().then(_ => { })
        onGetQuanHuyenAsync().then(_ => { })
    }, []);

    const onChangeSearchText = async (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, changePage, qH).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onChangeQH = (e) => {
        setQH(e.target.value);
        onSearch(searchText, pageSize, changePage, e.target.value).then((_) => { });
    }

    const onPreviousPage = () => {
        setChangePage(changePage - 1);
        onSearch(searchText, pageSize, changePage - 1, qH).then((_) => { });
    }

    const onNextPage = () => {
        setChangePage(changePage + 1);
        onSearch(searchText, pageSize, changePage + 1, qH).then((_) => { });
    }

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"Lựa chọn những lịch trình tốt nhất"}
                redirect={ROUTE_PATH.HOME_PAGE}
                redirectPage={"Trang chủ"}
                currentPage={"Tour"}
            />
            <SearchSpecialty
                dsQuanHuyen={dsQuanHuyen}
                onChangeQH={onChangeQH}
                onChangeSearchText={onChangeSearchText}
                searchText={searchText}
            />
            <div className="tour-package">
                <div className="container">
                    <div className="row">
                        {listDacSan.map((it, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="tour-package-container">
                                    <div className="activities-image">
                                        <a href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}><img src={
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
                                        </div>
                                        <ul className='position-relative'>
                                            <li><i className="fa fa-clock"></i>{convertTimeOnly(it.gioMoCua)} </li>
                                            -
                                            <li><i className="fa fa-clock"></i>{convertTimeOnly(it.gioDongCua)} </li>
                                        </ul>
                                        <a className='text-truncate-origin' href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}>{it.tenDiaDiem}</a>
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

export default SpecialtyPage