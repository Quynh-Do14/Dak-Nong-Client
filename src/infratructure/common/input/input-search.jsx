import React, { useState } from 'react'
import useTranslate from '../../../core/common/hook/useTranslate';
import { Input } from 'antd';
import { useEffect } from 'react';

const InputSearch = (props) => {
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

    const handleBlur = () => {
        if (value) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    };
    console.log("value1", value);
    return (
        <form className={`service-form-option input-container ${isFocused ? 'focused' : ''}`}>
            <label className='label-custom'>{translate(label)} </label>
            <Input onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={onChange} />
        </form>
    )
}

export default InputSearch