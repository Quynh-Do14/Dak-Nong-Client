import React, { useEffect, useState } from 'react'
import useTranslate from '../../../core/common/hook/useTranslate';
import { DatePicker } from 'antd';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

const InputDate = (props) => {
    const {
        label,
        value,
        onChange,
    } = props
    const { translate } = useTranslate();
    const disabledDate = (current) => {
        // Disable tất cả các ngày sau ngày hiện tại
        return current && current > moment().endOf('day');
    };

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (value) {
            setIsFocused(true);
        }
    }, [value])

    const handleBlur = () => {
        if (value) {
            setIsFocused(true);
        }
        if (value === null || value == "") {
            setIsFocused(false);
        }
    };
    return (
        <form className={`service-form-option input-container ${isFocused ? 'focused' : ''}`}>
            <label className='label-custom'>{translate(label)} </label>
            <DatePicker
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChange={onChange}
                placeholder={""}
                disabledDate={disabledDate}
            />
        </form>
    )
}

export default InputDate