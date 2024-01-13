import React, { useState } from 'react'
import useTranslate from '../../../core/common/hook/useTranslate';
import { Input, Select } from 'antd';
import { useEffect } from 'react';

const SelectSort = (props) => {
    const {
        label,
        sortBy,
        onChange,
    } = props
    const { translate } = useTranslate();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (sortBy) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    }, [sortBy]);
    
    const handleBlur = () => {
        if (sortBy) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    };
    console.log('sortBy', sortBy);
    return (
        <form className={`service-form-option input-container ${isFocused ? 'focused' : ''}`}>
            <label className='label-custom'>{translate(label)} </label>
            <Select
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                defaultValue={sortBy}
            >
                <Select.Option key={1} value={"DESC"}>{translate("latestPost")} </Select.Option>
                <Select.Option key={2} value={"ASC"}>{translate("longestPost")} </Select.Option>
            </Select>
        </form>
    )
}

export default SelectSort