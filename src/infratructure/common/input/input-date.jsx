import React, { useEffect, useState } from 'react'
import useTranslate from '../../../core/common/hook/useTranslate';
import { DatePicker } from 'antd';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const InputDate = (props) => {
    const {
        label,
        value,
        onChange,
    } = props
    const { translate } = useTranslate();
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
            <DatePicker onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={onChange} placeholder={""} />
        </form>
    )
}

export default InputDate