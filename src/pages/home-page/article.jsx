import React from 'react'
import { convertDateOnly, showImageCommon } from '../../infratructure/utils/helper'

const Article = ({ data = [] }) => {
    return (
        <section className="deals home-three-blog">
            <div className="blog-icon">
                <img src="assets/images/icons/blog-icon.png" alt="icon" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-title">
                            <h3>Bài viết hôm nay</h3>
                        </div>
                    </div>
                    {data.map((it, index) => (
                        <div key={index} className="col-lg-4">
                            <div className="blog-content">
                                <div className="blog-image">
                                    <a href="blog-details.html"><img src={
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
                                            <ul className='flex justify-center'>
                                                {/* <li><i className="fa-regular fa-user"></i> </li> */}
                                                <li><i className="fa fa-calendar"></i> <span>{convertDateOnly(it.ngayDang)} </span></li>
                                            </ul>
                                            <a href="" className="blog-title text-truncate-title">{it.tieuDe} </a>
                                            <p className='text-truncate-description'>{it.tieuDeCon} </p>
                                            <a href="">Xem thêm </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Article