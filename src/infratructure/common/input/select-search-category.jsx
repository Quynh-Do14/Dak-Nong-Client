import React, { useState } from 'react'
import useTranslate from '../../../core/common/hook/useTranslate';
import { Input, Select } from 'antd';
import { useEffect } from 'react';
import { translationData } from '../../utils/helper';

const SelectSearchCategory = (props) => {
    const {
        label,
        searchDanhMuc,
        onChange,
        list = []
    } = props
    const { translate } = useTranslate();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (searchDanhMuc) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    };
    return (
        <form className={`service-form-option input-container ${isFocused ? 'focused' : ''}`}>
            <label className='label-custom'>{translate(label)} </label>
            <Select
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                allowClear
            >
                {/* <Select.Option data-display="" value={""}>{translate("category")}</Select.Option> */}
                {list?.map((it, index) => (
                    <Select.Option key={index} value={it.idDanhMucDiaDiem}>{translationData(it.tenDanhMuc, it.tenDanhMucUS)} </Select.Option>
                ))}
            </Select>
        </form>
    )
}

export default SelectSearchCategory