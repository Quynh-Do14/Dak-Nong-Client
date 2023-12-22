import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import Constants from '../../core/common/constant';
import api from '../../infratructure/api';
import { ROUTE_PATH } from '../../core/common/appRouter';
import BannerCommon from '../../infratructure/common/controls/banner';
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper';
import SearchArticle from './search';
import LoadingFullPage from '../../infratructure/common/controls/loading';
import PaginationCommon from '../../infratructure/common/controls/pagination';
let timeout
const ArticlePage = () => {
    const [listTinTuc, setListTinTuc] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [changePage, setChangePage] = useState(1);


    const onGetListTinTucAsync = async ({ searchText = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllTinTuc(
            `loaitin?type=1${searchText ? searchText != "" ? `&search=${searchText}` : `` : ``}&limit=${limit}&page=${page}`,
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
        onSearch().then((_) => { });
    }, []);

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, changePage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onPreviousPage = () => {
        setChangePage(changePage - 1);
        onSearch(searchText, pageSize, changePage - 1).then((_) => { });
    }

    const onNextPage = () => {
        setChangePage(changePage + 1);
        onSearch(searchText, pageSize, changePage + 1).then((_) => { });
    }
    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"Bài viết hôm nay"}
                redirect={ROUTE_PATH.HOME_PAGE}
                redirectPage={"Trang chủ"}
                currentPage={"Bài viết"}
            />
            <SearchArticle
                searchText={searchText}
                onChangeSearchText={onChangeSearchText}
            />
            <div className="blog">
                <div className="container">
                    <div className="row">
                        {listTinTuc.map((it, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div className="blog-content">
                                    <div className="blog-image">
                                        <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`} ><img src={
                                            it.hinhAnh?.indexOf("http") == -1
                                                ?
                                                showImageCommon(it.hinhAnh)
                                                :
                                                it.hinhAnh
                                        } alt="image" className='img-page' /></a>
                                    </div>
                                    <div className="blog-info">
                                        <div class="blog-info">
                                            <div class="footer-info">
                                                <ul className='flex justify-center mb-10'>
                                                    {/* <li><i className="fa-regular fa-user"></i> </li> */}
                                                    <li><i className="fa fa-calendar"></i> <span>{convertDateOnly(it.ngayDang)} </span></li>
                                                </ul>
                                                <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`} className="blog-title text-truncate-title">{it.tieuDe} </a>
                                                <p className='text-truncate-description'>{it.tieuDeCon} </p>
                                                <a href={`${ROUTE_PATH.VIEW_ARTICLE}?${it.idTinTuc}`} >Xem thêm </a>
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
            </div>
            <LoadingFullPage loading={loading} />
        </MainLayout>
    )
}

export default ArticlePage