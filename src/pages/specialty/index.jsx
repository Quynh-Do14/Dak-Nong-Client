import React, { useEffect, useState } from 'react';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infratructure/common/layout/main-layout';
import api from '../../infratructure/api';
import Constants from '../../core/common/constant';
import { convertDateOnly, convertTimeOnly, showImageCommon, translationData } from '../../infratructure/utils/helper';
import PaginationCommon from '../../infratructure/common/controls/pagination';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import SearchTour from './search';
import SearchFestival from './search';
import SearchSpecialty from './search';
import useTranslate from '../../core/common/hook/useTranslate';
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
    const { translate } = useTranslate();

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
        setQH(e);
        onSearch(searchText, pageSize, changePage, e).then((_) => { });
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
                title={"chooseSchedule"}
                redirect={ROUTE_PATH.HOME_PAGE}
                redirectPage={"homePage"}
                currentPage={"specialty"}
            />
            <SearchSpecialty
                dsQuanHuyen={dsQuanHuyen}
                searchQuanHuyen={qH}
                onChangeQH={onChangeQH}
                onChangeSearchText={onChangeSearchText}
                searchText={searchText}
            />
            <section className="deals position-relative">
                <div className="container-fluid padding-common">
                    <div className="deals-slider owl-carousel owl-theme row">
                        {listDacSan.map((it, index) => (
                            <div key={index} className="pl-10 pr-10 mb-20 col-xl-3 col-lg-4 col-md-6 col-xs-12">
                                <div className="deals-content ">
                                    <div className="deals-image custom-image">
                                        <a href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}>
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
                                            <li className="d-flex align-items-center">
                                                <div className="mr-10">
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <div>
                                                    {it.soSaoTrungBinh} ({it.luotXem} {translate("view")}){" "}
                                                </div>
                                            </li>
                                            {/* <li>
                                                <span>
                                                    {" "}
                                                    {it.giaVe === Constants.FreePrice || Constants.Undefined
                                                        ? Constants.FreePrice
                                                        : `Chỉ từ: ${it.giaVe}`}{" "}
                                                </span>
                                            </li> */}
                                        </ul>
                                        <a
                                            href={`${ROUTE_PATH.VIEW_SPECIALTY}?${it.idDiaDiem}`}
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
                    </div>
                </div>
            </section>
            <LoadingFullPage loading={loading} />
        </MainLayout>
    )
}

export default SpecialtyPage