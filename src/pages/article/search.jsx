import React from 'react'

const SearchArticle = (props) => {
    const {
        searchText,
        onChangeSearchText,
    } = props
    return (
        <div className="col-lg-12">
            <div className="service-container">
                <div className="service-content">
                    <div className="destination-details-right-container">
                        <div className="destination-right-search">
                            <form>
                                <input value={searchText} onChange={onChangeSearchText} type="text" placeholder="Search..." name="" />
                                <button type="submit"><i className="fa fa-magnifying-glass"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SearchArticle