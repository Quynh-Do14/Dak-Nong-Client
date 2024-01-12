import React, { useState } from 'react'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const InputDateMap = (props) => {
    const {
        title = "",
        setDate
    } = props;
    const [startDate, setStartDate] = useState(new Date());
    const changeDateTime = (e) => {
        if (moment.isMoment(e)) {
            const formattedDate = e.format('DD/MM/YYYY');
            setStartDate(formattedDate);
            setDate(formattedDate);
        };
    };
    console.log(startDate)
    return (
        <div>
            <label for="thoiGianBatDauLabel" class="form-label">
                {title}
            </label>
            <div className="input-group mb-3"
                style={{
                    display: "flex",
                    flexWrap: "nowrap"
                }}
            >
                <span
                    className="input-group-text"
                    id="thoiGianBatDauLabel"
                >
                    <i class="fa-regular fa-calendar-days"></i>
                </span>
                <Datetime
                    className='date-map-custom'
                    value={startDate}
                    onChange={changeDateTime}
                    closeOnSelect
                    dateFormat="DD-MM-YYYY"
                    timeFormat={false}
                />
            </div>
        </div>
    )
}

export default InputDateMap