import React, { useEffect, useState } from 'react'

const PaginationCommon = (props) => {
    const { changePage, onPreviousPage, onNextPage, pagination } = props;
    const [isLastPage, setIsLastPage] = useState(false);
    useEffect(() => {
        if (pagination.limit > pagination.total) {
            setIsLastPage(true);
        }
        else if (pagination.limit <= pagination.total) {
            setIsLastPage(false);
        }
    }, [pagination])

    return (
        <div className="col-lg-12">
            <div className="paigination">
                <ul className=''>
                    <li>
                        <button onClick={onPreviousPage} className={`bg-white ${changePage == 1 ? "not-allowed" : ""}`} disabled={changePage == 1 ? true : false}>
                            <a><i className="fa fa-arrow-left"></i></a>
                        </button>
                    </li>
                    <li><a>{changePage} </a></li>
                    <li>
                        <button onClick={onNextPage} className={`bg-white ${isLastPage ? "not-allowed" : ""}`} disabled={isLastPage ? true : false}>
                            <a><i className="fa fa-arrow-right"></i></a>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PaginationCommon