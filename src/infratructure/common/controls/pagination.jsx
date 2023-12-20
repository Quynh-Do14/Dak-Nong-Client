import React, { useEffect, useState } from 'react'

const PaginationCommon = (props) => {
    const { changePage, onPreviousPage, onNextPage, pagination } = props;
    const [isLastPage, setIsLastPage] = useState(false);
    useEffect(() => {
        if (pagination.limit > pagination.total) {
            setIsLastPage(true);
        }
        else {
            setIsLastPage(false);
        }
    }, [pagination])

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="gowilds-pagination wow fadeInUp text-center">
                    <button className={`bg-light ${changePage == 1 ? "not-allowed" : ""}`} disabled={changePage == 1 ? true : false}>
                        <li onClick={onPreviousPage}><a><i className="fas fa-arrow-left"></i></a></li>
                    </button>
                    <li><a className="active ml-20 mr-20">{changePage}</a></li>
                    <button className={`bg-light ${isLastPage ? "not-allowed" : ""}`} disabled={isLastPage ? true : false}>
                        <li onClick={onNextPage}><a><i className="fas fa-arrow-right"></i></a></li>
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default PaginationCommon