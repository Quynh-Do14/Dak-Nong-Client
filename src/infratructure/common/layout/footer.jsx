import React from 'react'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import useTranslate from '../../../core/common/hook/useTranslate';
const FooterPage = () => {
    const { translate } = useTranslate();
    return (
        <footer className="common-footer p_relative pt-20">
            <div className="footer__middle  p_relative d_block">
                <div className="container-fluid padding-common">
                    <div className="footer__middle__content">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-6 col-sm-12 footer_column">
                                <div className="footer_widget left">
                                    <div className="footer__logo">
                                        <figure>
                                            <img src="assets/images/logo.png" alt="" />
                                        </figure>
                                    </div>
                                    <div className="widget_content">
                                        <p>{translate("footerInfo")}
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 footer_column">
                                <div className="footer_widget links_widget ml_100">
                                    <div className="widget_title">
                                        <h4>{translate('map')}</h4>
                                    </div>
                                    <div className="widget_content">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800584.98948018!2d107.45319826230282!3d12.250392752844569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173b5ece644a927%3A0x7530e130f4a387ad!2zxJDhuq9rIE7DtG5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1703480892617!5m2!1svi!2s" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 footer_column">
                                <div className="footer_widget links_widget ml_100">
                                    <div className="widget_title">
                                        <h4>{translate("contactInfo")} </h4>
                                    </div>
                                    <div className="widget_content">
                                        <ul className="links_list clearfix text-align-justify ">
                                            <li className=''><a >{translate("address")}: {translate('addressDN')}</a></li>
                                            <li className=''><a >{translate("phone")}: 02613.701166</a></li>
                                            <li className=''><a >{translate("Email")}: banbientap@daknong.gov.vn</a></li>
                                        </ul>
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