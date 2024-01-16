import React from 'react'
import useTranslate from '../../core/common/hook/useTranslate';
import { Input, Select } from 'antd';
import InputSearch from '../../infratructure/common/input/input-search';
import SelectSearchProvince from '../../infratructure/common/input/select-search-province';

const SearchSpecialty = (props) => {
    const {
        dsQuanHuyen,
        searchQuanHuyen,
        onChangeQH,
        onChangeSearchText,
        searchText
    } = props;
    const { translate } = useTranslate();

    return (
        <div className='container'>
            <div className="col-lg-12">
                <div className="service-container-2 row">
                    <div className="service-content-2 col-lg-6 col-md-12">
                        <div className="service-icon">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9375 19.8125C16.1152 19.8125 20.3125 15.6152 20.3125 10.4375C20.3125 5.25983 16.1152 1.0625 10.9375 1.0625C5.75983 1.0625 1.5625 5.25983 1.5625 10.4375C1.5625 15.6152 5.75983 19.8125 10.9375 19.8125Z" stroke="#FE7524" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.9688 17.4688L23.4375 22.9375" stroke="#FE7524" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="service-form col-10">
                            <InputSearch
                                label={"hotelName"}
                                value={searchText}
                                onChange={onChangeSearchText}
                            />
                        </div>
                    </div>

                    <div className="service-content-2 col-lg-6 col-md-12">
                        <div className="service-icon">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_44_165)">
                                    <path d="M13.4429 0.5C8.4505 0.5 4.38888 4.56162 4.38888 9.554C4.38888 15.7497 12.4914 24.8454 12.8363 25.2295C13.1604 25.5904 13.7261 25.5898 14.0495 25.2295C14.3945 24.8454 22.497 15.7497 22.497 9.554C22.4969 4.56162 18.4353 0.5 13.4429 0.5ZM13.4429 23.436C10.716 20.1968 6.01935 13.8062 6.01935 9.5541C6.01935 5.46064 9.34952 2.13047 13.4429 2.13047C17.5363 2.13047 20.8665 5.46064 20.8665 9.55405C20.8665 13.8064 16.1705 20.1958 13.4429 23.436Z" fill="#FE7524" />
                                    <path d="M13.4429 4.99878C10.9311 4.99878 8.88766 7.04228 8.88766 9.5541C8.88766 12.0659 10.9312 14.1094 13.4429 14.1094C15.9547 14.1094 17.9982 12.0659 17.9982 9.5541C17.9982 7.04228 15.9547 4.99878 13.4429 4.99878ZM13.4429 12.479C11.8301 12.479 10.5181 11.1669 10.5181 9.5541C10.5181 7.94131 11.8302 6.62925 13.4429 6.62925C15.0557 6.62925 16.3677 7.94131 16.3677 9.5541C16.3677 11.1669 15.0557 12.479 13.4429 12.479Z" fill="#FE7524" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_44_165">
                                        <rect width="25" height="25" fill="white" transform="translate(0.942932 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="service-form col-10">
                            <SelectSearchProvince
                                label={"district"}
                                searchQuanHuyen={searchQuanHuyen}
                                onChange={onChangeQH}
                                list={dsQuanHuyen}
                            />
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

export default SearchSpecialty