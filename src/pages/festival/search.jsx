import React from 'react'
import useTranslate from '../../core/common/hook/useTranslate';

const SearchFestival = (props) => {
    const {
        searchText,
        onChangeSearchText,
        startDate,
        onChangeStartDate,
        endDate,
        onChangeEndDate
    } = props;
    const { translate } = useTranslate();
    return (
        <div className='container'>
            <div className="col-lg-12">
                <div className="service-container">
                    <div className="service-content">
                        <div className="service-icon">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9375 19.8125C16.1152 19.8125 20.3125 15.6152 20.3125 10.4375C20.3125 5.25983 16.1152 1.0625 10.9375 1.0625C5.75983 1.0625 1.5625 5.25983 1.5625 10.4375C1.5625 15.6152 5.75983 19.8125 10.9375 19.8125Z" stroke="#FE7524" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.9688 17.4688L23.4375 22.9375" stroke="#FE7524" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="service-form">
                            <form className="service-form-option">
                                <label>{translate("nameFestival")} </label><br />
                                <input value={searchText} onChange={onChangeSearchText} placeholder={translate("enterName")} />
                            </form>
                        </div>
                    </div>

                    <div className="service-content service-last-child">

                        <div className="service-form">
                            <form className="service-form-option">
                                <label className="common-label">{translate("startDate")}<i className="fa fa-calendar ml-10"></i></label><br />
                                <input onChange={onChangeStartDate} value={startDate} type="date" placeholder="" required />
                            </form>
                        </div>
                    </div>

                    <div className="service-content service-last-child">
                        <div className="service-form">
                            <form className="service-form-option">
                                <label className="common-label">{translate("endDate")}<i className="fa fa-calendar ml-10"></i></label><br />
                                <input value={endDate} onChange={onChangeEndDate} type='date' />
                            </form>
                        </div>
                    </div>
                    {/* <div className="service-button">
                        <a><i className="fa fa-angle-right"></i></a>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SearchFestival