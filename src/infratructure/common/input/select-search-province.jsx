import React, { useState } from 'react'
import useTranslate from '../../../core/common/hook/useTranslate';
import { Input, Select } from 'antd';
import { useEffect } from 'react';

const SelectSearchProvince = (props) => {
    const {
        label,
        searchQuanHuyen,
        onChange,
        list = []
    } = props
    const { translate } = useTranslate();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (searchQuanHuyen) {
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
                {list?.map((it, index) => (
                    <Select.Option key={index} value={it.idQuanHuyen}>{it.tenQuanHuyen} </Select.Option>
                ))}
            </Select>
        </form>
    )
}

export default SelectSearchProvince