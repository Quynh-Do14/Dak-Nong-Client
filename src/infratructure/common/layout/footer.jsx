import React from 'react'
import { ROUTE_PATH } from '../../../core/common/appRouter'
const FooterPage = () => {
    return (
        <footer className="common-footer p_relative">
            <div className="footer__middle  p_relative d_block">
                <div className="container">
                    <div className="footer__middle__content">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-6 col-sm-12 footer_column">
                                <div className="footer_widget left">
                                    <div className="footer__logo">
                                        <figure>
                                            <img src="assets/images/footer-logo.png" alt="" />
                                        </figure>
                                    </div>
                                    <div className="widget_content">
                                        <p>Hãy đến với Đắk Nông <br />
                                            Để có những trải nghiệm du lich thực sự đáng nhớ
                                            <br />
                                            Đắk Nông, vùng đất tuyệt vời !
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 footer_column">
                                <div className="footer_widget links_widget ml_100">
                                    <div className="widget_title">
                                        <h4>Bản đồ</h4>
                                    </div>
                                    <div className="widget_content">

                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 footer_column">
                                <div className="footer_widget links_widget ml_100">
                                    <div className="widget_title">
                                        <h4>Thông tin liên hệ</h4>
                                    </div>
                                    <div className="widget_content">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default FooterPage;