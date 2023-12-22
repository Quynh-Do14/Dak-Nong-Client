import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import api from '../../infratructure/api';
import { useLocation } from 'react-router-dom';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper';
import RelationArticle from '../../infratructure/common/controls/relation-article';

const ArticleDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailArticle, setDetailArticle] = useState({});
    const [listTinTucLienQuan, setListTinTucLienQuan] = useState([]);

    const location = useLocation()
    const search = location.search.replace("?", "")
    const onGetDetailTinTucAsync = async () => {
        const response = await api.getAllTinTuc(
            `loaitin/${search}?type=1`,
            setLoading
        )
        setDetailArticle(response.tinTuc);

    }
    const onGetListTinTucAsync = async () => {
        const response = await api.getAllTinTuc(
            `loaitin?type=1&limit=3`,
            setLoading
        );
        setListTinTucLienQuan(response.data.tinTucs);
    };

    useEffect(() => {
        onGetDetailTinTucAsync().then(_ => { });
        onGetListTinTucAsync().then(_ => { });
    }, []);
    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={detailArticle.tieuDe}
                redirect={ROUTE_PATH.ARTICLE}
                redirectPage={"Bài viết"}
                currentPage={"Thông tin chi tiết"}
            />
            <section className="destination-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="destination-details-left-container">
                                <div className="blog-details-image">
                                    <a href="blog.html"><img src={
                                        detailArticle.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(detailArticle.hinhAnh)
                                            :
                                            detailArticle.hinhAnh
                                    } alt="image" /></a>
                                </div>
                                <div className="footer-info blog-details-info">
                                    <ul>
                                        <li><i className="fa fa-user"></i> Authore</li>
                                        <li><i className="fa fa-calendar"></i> <span> {convertDateOnly(detailArticle.ngayDang)}</span></li>
                                    </ul>
                                </div>
                                <p className='text-align-justify'>{detailArticle.tieuDeCon} </p>
                                <p className='text-align-justify'>{detailArticle.moTaNgan} </p>
                                <p className='text-align-justify'>{detailArticle.chiTiet} </p>
                                <div className="dd-image-container">
                                    <div className="blog-details-bottom-image">
                                        <a href="blog.html"><img src="assets/images/gallery/blog-details-01.png" alt="image" /></a>
                                    </div>
                                    <div className="blog-details-bottom-image">
                                        <a href="blog.html"><img src="assets/images/gallery/blog-details-02.png" alt="image" /></a>
                                    </div>
                                </div>

                                <div className="blog-details-cms">
                                    <div className="quotetion">
                                        <img src="assets/images/icons/quotetion.png" alt="mark" />
                                    </div>
                                    <h4></h4>
                                    <p className='text-align-justify'>{detailArticle.moTaNgan} </p>
                                </div>
                            </div>
                        </div>
                        <RelationArticle
                            title={"Bài viết liên quan"}
                            data={listTinTucLienQuan}
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default ArticleDetail