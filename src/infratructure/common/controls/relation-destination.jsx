import React from 'react'
import Constants from '../../../core/common/constant'
import { ViewStarCommon } from './view-star';
import { convertNumber, showImageCommon, translationData } from '../../utils/helper';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import useTranslate from '../../../core/common/hook/useTranslate';
import { useSnapCarousel } from 'react-snap-carousel';
import { Col, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const RelationDestination = (props) => {
    const { title, data = [] } = props;
    const { translate } = useTranslate();
    const { scrollRef, pages, activePageIndex, next, prev, goTo } = useSnapCarousel();
    console.log('data', data);
    return (
        <div>
            <div className="pkg-common-title mt-30">
                <h4>{title}</h4>
            </div>
            {
                data.length
                    ?
                    <Row className='container position-relative' gutter={[30, 30]} justify={"center"} wrap={false}>
                        <Col>
                            <Row gutter={[10, 10]} justify={"space-between"} align={"middle"} className='container-btn'>
                                <Col>
                                    <div className='btn-scroll left' onClick={() => prev()}><LeftOutlined /></div>
                                </Col>
                                <Col>
                                    <div className='btn-scroll right' onClick={() => next()}><RightOutlined /></div>
                                </Col>
                            </Row>
                            <Row ref={scrollRef} gutter={[30, 30]} className="ul-list bg-grey pt-10 pb-10" justify={"start"} wrap={false}>
                                {data.length && data.map((it, index) => (
                                    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <div className="deals-content ">
                                            <div className="deals-image custom-image">
                                                <a
                                                // href={`${ROUTE_PATH.VIEW_TOUR}?${it.properties.idDiaDiem}`}
                                                >
                                                    <img
                                                        src={
                                                            it.hinhAnh?.indexOf("http") == -1
                                                                ? showImageCommon(it.properties.hinhAnh)
                                                                : it.properties.hinhAnh
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
                                                            {it.properties.soSaoTrungBinh} ({it.properties.luotXem} {translate("view")}){" "}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            {" "}
                                                            {it.giaVe === Constants.FreePrice ?
                                                                (translationData(it.properties.giaVe, it.properties.giaVeUS))
                                                                :
                                                                it.giaVe == null
                                                                    ? translate("free")
                                                                    : `Chỉ từ: ${it.properties.giaVe}`
                                                            }
                                                            {" "}
                                                        </span>
                                                    </li>
                                                </ul>
                                                <a
                                                    // href={`${ROUTE_PATH.VIEW_TOUR}?${it.properties.idDiaDiem}`}
                                                    className="deals-info-link text-truncate-origin"
                                                >
                                                    {translationData(it.properties.tenDiaDiem, it.properties.tenDiaDiemUS)}
                                                    {" "}
                                                </a>
                                                <p className="text-truncate-address-destination">
                                                    <i className="flaticon-map"></i>
                                                    {translationData(it.properties.diaChi, it.properties.diaChiUS)}
                                                    {" "}
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <Row className='mt-30' gutter={[10, 10]} justify={"center"} align={"middle"}>
                                {pages.map((_, i) => (
                                    <Col key={i}>
                                        <div
                                            className='page-dot'
                                            style={i === activePageIndex ? { opacity: 1, background: "#FE7524" } : {}}
                                            onClick={() => goTo(i)}
                                        >
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row >
                    :
                    <div className='no-destination'>{translate("noDestination")} </div>
            }

        </div>
    )
}

export default RelationDestination