import React, { useEffect, useState } from 'react'
import MainLayout from '../../infratructure/common/layout/main-layout'
import api from '../../infratructure/api';
import { useLocation } from 'react-router-dom';
import BannerCommon from '../../infratructure/common/controls/banner';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { convertDateOnly, showImageCommon, translationData } from '../../infratructure/utils/helper';
import RelationArticle from '../../infratructure/common/controls/relation-article';
import useTranslate from '../../core/common/hook/useTranslate';

const ArticleDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detailArticle, setDetailArticle] = useState({});
    const [listTinTucLienQuan, setListTinTucLienQuan] = useState([]);

    const location = useLocation();
    const search = location.search.replace("?", "");
    const { translate } = useTranslate();
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
    let arrChiTiet = [];
    let arrChiTietFirst = [];
    let arrChiTietLast = [];
    arrChiTiet = translationData(detailArticle.chiTiet, detailArticle.chiTietUS)?.split("\n");
    arrChiTietFirst = arrChiTiet?.splice(0, 2)
    arrChiTietLast = arrChiTiet?.slice(0, 0).concat(arrChiTiet?.slice(2));

    return (
        <MainLayout className={"bg-white"}>
            <BannerCommon
                title={"todayNews"}
                redirect={ROUTE_PATH.ARTICLE}
                redirectPage={"artical"}
                currentPage={"news"}
            />
            <section className="package-details">
                <div className="title-name-view-page">{translationData(detailArticle.tieuDe, detailArticle.tieuDeUS)}</div>
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

                                <div className="blog-details-cms mb-20">
                                    <div className="quotetion">
                                        <img src="assets/images/icons/quotetion.png" alt="mark" />
                                    </div>
                                    <h4></h4>
                                    <p className='text-align-justify'>
                                        {translationData(detailArticle.tieuDeCon, detailArticle.tieuDeConUS)}
                                    </p>
                                    <div className="quotetion-end">
                                        <img src="assets/images/icons/quotetion.png" alt="mark" />
                                    </div>
                                </div>

                                <p className='text-align-justify'>
                                    {translationData(detailArticle.moTaNgan, detailArticle.moTaNganUS)}
                                </p>

                                <div className="blog-details-image">
                                    <a href="blog.html"><img src={
                                        detailArticle.hinhAnh?.indexOf("http") == -1
                                            ?
                                            showImageCommon(detailArticle.hinhAnh2)
                                            :
                                            detailArticle.hinhAnh2
                                    } alt="image" /></a>
                                </div>
                                <div className='mt-20'>
                                    <p className='text-align-justify'> {
                                        arrChiTietFirst?.map((it, index) => (
                                            <div key={index}>
                                                <div>{it}</div>
                                            </div>
                                        ))
                                    } </p>
                                    <div className="blog-details-image">
                                        <a href="blog.html"><img src={
                                            detailArticle.hinhAnh?.indexOf("http") == -1
                                                ?
                                                showImageCommon(detailArticle.hinhAnh3)
                                                :
                                                detailArticle.hinhAnh3
                                        } alt="image" /></a>
                                    </div>
                                    <div className='mt-20'>
                                        <p className='text-align-justify'> {
                                            arrChiTietLast?.map((it, index) => (
                                                <div key={index}>
                                                    <div>{it}</div>
                                                </div>
                                            ))
                                        } </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RelationArticle
                            title={translate("relatedNews")}
                            data={listTinTucLienQuan}
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default ArticleDetail