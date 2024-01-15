import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import { Col, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useTranslate from "../../core/common/hook/useTranslate";
import { showImageCommon } from "../../infratructure/utils/helper";

const ListImageDestination = (props) => {
    const { data = [] } = props;
    const { translate } = useTranslate();
    const { scrollRef, pages, activePageIndex, next, prev, goTo } =
        useSnapCarousel();
    return (
        <div>
            <div>
                <Row
                    className="position-relative"
                    gutter={[30, 30]}
                    justify={"center"}
                    wrap={false}
                >
                    <Col>
                        <Row
                            gutter={[10, 10]}
                            justify={"space-between"}
                            align={"middle"}
                            className="container-btn"
                        >
                            <Col>
                                <div className="btn-scroll left" onClick={() => prev()}>
                                    <LeftOutlined />
                                </div>
                            </Col>
                            <Col>
                                <div className="btn-scroll right" onClick={() => next()}>
                                    <RightOutlined />
                                </div>
                            </Col>
                        </Row>
                        <Row
                            ref={scrollRef}
                            gutter={[30, 30]}
                            className="ul-list bg-grey pt-10 pb-10"
                            justify={"start"}
                            wrap={false}
                        >
                            {data.length &&
                                data.map((it, index) => (
                                    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <div className="deals-content ">
                                            <div className="deals-image custom-image">
                                                <a
                                                // href={`${ROUTE_PATH.VIEW_TOUR}?${it.properties.idDiaDiem}`}
                                                >
                                                    <img
                                                        src={it.uri}
                                                        alt="image"
                                                        className="img-page"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                        </Row>

                        <Row
                            className="mt-30"
                            gutter={[10, 10]}
                            justify={"center"}
                            align={"middle"}
                        >
                            {pages.map((_, i) => (
                                <Col key={i}>
                                    <div
                                        className="page-dot"
                                        style={
                                            i === activePageIndex
                                                ? { opacity: 1, background: "#FE7524" }
                                                : {}
                                        }
                                        onClick={() => goTo(i)}
                                    ></div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ListImageDestination;
