import React, { useEffect, useState } from 'react';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infratructure/common/layout/main-layout';
import api from '../../infratructure/api';
import Constants from '../../core/common/constant';
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper';
import PaginationCommon from '../../infratructure/common/controls/pagination';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import SearchTour from './search';
import SearchFestival from './search';
let timeout
const FestivalPage = () => {
    const [listLeHoi, setListLeHoi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [changePage, setChangePage] = useState(1);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const onGetListLeHoiAsync = async ({ searchText = "", limit = pageSize, page = 1, startDate = "", endDate = "" }) => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Festival.value}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&startDate=${startDate}&endDate=${endDate}&search=${searchText}`,
            setLoading
        )
        setListLeHoi(response.data.diaDiems);
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }
    const onSearch = async (searchText = "", limit = pageSize, page = 1, startDate = "", endDate = "") => {
        onGetListLeHoiAsync({ searchText: searchText, limit: limit, page: page, startDate: startDate, endDate: endDate, })
    }
    useEffect(() => {
        onSearch().then(_ => { })
    }, []);

    const onChangeSearchText = async (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, changePage, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };
    const onChangeStartDate = async (e) => {
        setStartDate(e.target.value);
        if (endDate != "") {
            await onSearch(searchText, pageSize, changePage, e.target.value, endDate).then((_) => { });
        }
    }

    const onChangeEndDate = async (e) => {
        setEndDate(e.target.value);
        if (startDate != "") {
            await onSearch(searchText, pageSize, changePage, startDate, e.target.value).then((_) => { });
        }
    }
    const onPreviousPage = () => {
        setChangePage(changePage - 1);
        onSearch(searchText, pageSize, changePage - 1, startDate, endDate).then((_) => { });
    }

    const onNextPage = () => {
        setChangePage(changePage + 1);
        onSearch(searchText, pageSize, changePage + 1, startDate, endDate).then((_) => { });
    }

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"Lựa chọn những lịch trình tốt nhất"}
                redirect={ROUTE_PATH.HOME_PAGE}
                redirectPage={"Trang chủ"}
                currentPage={"Tour"}
            />
            <SearchFestival
                searchText={searchText}
                onChangeSearchText={onChangeSearchText}
                startDate={startDate}
                onChangeStartDate={onChangeStartDate}
                endDate={endDate}
                onChangeEndDate={onChangeEndDate}
            />
            <div className="tour-package">
                <div className="container">
                    <div className="row">
                        {listLeHoi.map((it, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="tour-package-container">
                                    <div className="activities-image">
                                        <a href={`${ROUTE_PATH.VIEW_FESTIVAL}?${it.idDiaDiem}`}><img src={
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
                                            <li><i className="fa fa-calendar mr-10"></i>{convertDateOnly(it.gioMoCua)} </li>
                                            -
                                            <li><i className="fa fa-calendar mr-10"></i>{convertDateOnly(it.gioDongCua)} </li>
                                        </ul>
                                        <a className='text-truncate-origin' href={`${ROUTE_PATH.VIEW_FESTIVAL}?${it.idDiaDiem}`}>{it.tenDiaDiem}</a>
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

export default FestivalPage