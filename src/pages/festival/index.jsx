import React, { useEffect, useState } from 'react';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infratructure/common/layout/main-layout';
import api from '../../infratructure/api';
import Constants from '../../core/common/constant';
import { convertDateOnly, showImageCommon, translationData } from '../../infratructure/utils/helper';
import PaginationCommon from '../../infratructure/common/controls/pagination';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import SearchTour from './search';
import SearchFestival from './search';
import useTranslate from '../../core/common/hook/useTranslate';
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

    const [dsQuanHuyen, setDsQuanHuyen] = useState([])
    const [qH, setQH] = useState("");

    const { translate } = useTranslate();

    const onGetListLeHoiAsync = async ({ searchText = "", limit = pageSize, page = 1, qH = "", startDate = "", endDate = "" }) => {
        const response = await api.getAllDiaDiem(
            `dichvu/top?idDanhMuc=${Constants.CategoryConfig.Festival.value}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&idQuanHuyen=${qH}&startDate=${startDate}&endDate=${endDate}&search=${searchText}`,
            setLoading
        )
        setListLeHoi(response.data.diaDiems);
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


    const onSearch = async (searchText = "", limit = pageSize, page = 1, qH = "", startDate = "", endDate = "") => {
        onGetListLeHoiAsync({ searchText: searchText, limit: limit, page: page, qH: qH, startDate: startDate, endDate: endDate, })
    }
    useEffect(() => {
        onSearch().then(_ => { })
        onGetQuanHuyenAsync().then(_ => { })

    }, []);

    const onChangeSearchText = async (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, changePage, qH, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };
    const onChangeStartDate = async (e) => {
        setStartDate(e);
        if (endDate != "") {
            await onSearch(searchText, pageSize, changePage, qH, e, endDate).then((_) => { });
        }
    }

    const onChangeEndDate = async (e) => {
        setEndDate(e);
        if (startDate != "") {
            await onSearch(searchText, pageSize, changePage, qH, startDate, e).then((_) => { });
        }
    }

    const onChangeQH = (e) => {
        setQH(e);
        onSearch(searchText, pageSize, changePage, e, startDate, endDate).then((_) => { });
    }

    const onPreviousPage = () => {
        setChangePage(changePage - 1);
        onSearch(searchText, pageSize, changePage - 1, qH, startDate, endDate).then((_) => { });
    }

    const onNextPage = () => {
        setChangePage(changePage + 1);
        onSearch(searchText, pageSize, changePage + 1, qH, startDate, endDate).then((_) => { });
    }

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"chooseSchedule"}
                redirect={ROUTE_PATH.HOME_PAGE}
                redirectPage={"homePage"}
                currentPage={"festival"}
            />
            <SearchFestival
                searchText={searchText}
                onChangeSearchText={onChangeSearchText}
                startDate={startDate}
                onChangeStartDate={onChangeStartDate}
                endDate={endDate}
                onChangeEndDate={onChangeEndDate}
                searchQuanHuyen={qH}
                onChangeQH={onChangeQH}
                dsQuanHuyen={dsQuanHuyen}
            />
            <section className="deals position-relative">
                <div className="container-fluid padding-common">
                    <div className="row">
                        {listLeHoi.map((it, index) => (
                            <div key={index} className="pl-10 pr-10 mb-60 col-xl-3 col-lg-4 col-md-6 col-xs-12">
                                <div className="activites-container">
                                    <div className="activities-image position-relative">
                                        <a href={`${ROUTE_PATH.VIEW_FESTIVAL}?${it.idDiaDiem}`}>
                                            <img src={
                                                it.hinhAnh?.indexOf("http") == -1
                                                    ?
                                                    showImageCommon(it.hinhAnh)
                                                    :
                                                    it.hinhAnh
                                            } className='img-page' alt="photo" />
                                        </a>
                                    </div>
                                    <div className="activities-content">
                                        <a className='text-truncate-title-festival position-relative' href={`${ROUTE_PATH.VIEW_FESTIVAL}?${it.idDiaDiem}`}>
                                            {translationData(it.tenDiaDiem, it.tenDiaDiemUS)}
                                        </a>
                                        <ul className='position-relative'>
                                            <li className='d-flex align-items-center text-truncate-date-festival'><i className="fa fa-calendar mr-10"></i>{it.gioMoCua} </li>
                                            {it.gioDongCua && "-"}
                                            {it.gioDongCua && <li><i className="fa fa-calendar mr-10"></i>{it.gioDongCua} </li>}
                                        </ul>
                                        <p className='text-truncate-description'>
                                            {translationData(it.moTa, it.moTaUS)}
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
            </section>
            <LoadingFullPage loading={loading} />
        </MainLayout>
    )
}

export default FestivalPage