import React from 'react'
import proFileIcon from '../../asset/img/extra/profile.png'
import { ViewStarCommon } from '../../infratructure/common/controls/view-star'

const Evaluate = (props) => {
    const {
        listEvaluate = [],
        showMore,
        soSao,
        setSoSao,
        onEvaluate,
        noiDung,
        setNoiDung,
    } = props

    const viewStarEvaluate = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i}
                    onClick={() => onSelectStar(i + 1)} class={`${i < soSao ? "fa fa-star  checked-star mr-1 pointer" : "fa fa-star un-checked-star checked mr-2 pointer"}`}
                    style={{
                        height: "30px",
                        width: "30px"
                    }}
                ></span>
            );
        }
        return stars
    }

    const onSelectStar = (prev) => {
        setSoSao(prev);
    }

    return (
        <div>
            <div id="accordion">
                {
                    listEvaluate?.length
                        ?
                        <h4>
                            {listEvaluate?.length} Bình luận
                        </h4>
                        :
                        <h4>
                            Chưa có bình luận!!!!
                        </h4>
                }

                <div className="card">
                    {
                        listEvaluate && listEvaluate?.map((it, index) => {
                            return (
                                <div key={index} className="card-footer">
                                    <div className="card-footer-left">
                                        <img src={proFileIcon} alt="" />
                                    </div>
                                    <div className="card-footer-right">
                                        <h5>{it.firstName} {it.lastName} <span>{it.thoiGianDanhGia}</span></h5>
                                        <div class="comment-rate">
                                            <div class="rating mar-right-15 ">
                                                {ViewStarCommon(it.soSao)}
                                            </div>
                                        </div>
                                        <p>{it.noiDung}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="py-3">
                        {
                            listEvaluate.length
                                ?
                                <div className="text-center">
                                    <a
                                        style={{
                                            border: "1px solid #fe7524",
                                            padding: "10px",
                                            borderRadius: "10px",
                                            background: "#fe7524",
                                            color: "#FFFFFF"
                                        }}
                                        onClick={showMore} className="nir-btn white">Xem thêm <i className="fa fa-long-arrow-alt-right"></i></a>
                                </div>
                                :
                                <div className="text-center">Chưa có đánh giá nào </div>
                        }
                    </div>

                </div>

                <div className="destination-form-container">
                    <div>
                        <textarea value={noiDung} onChange={(e) => setNoiDung(e.target.value)} placeholder="Đánh giá của bạn"></textarea>
                    </div>
                    <div class="rating mt-4">
                        {viewStarEvaluate()}
                    </div>
                    <div>
                        <button onClick={onEvaluate} type="submit" className="submit">Đánh giá</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Evaluate
