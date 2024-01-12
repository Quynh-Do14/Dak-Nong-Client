import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { getPreviousDay } from "../../../pages/extra/common";

const InputDateMap = (props) => {
  const { title = "", setDate, date } = props;
  const changeDateTime = (e) => {
    if (moment.isMoment(e)) {
      const formattedDate = e.format("YYYY/MM/DD");
      setDate(formattedDate);
    }
  };
  return (
    <div>
      <label for="thoiGianBatDauLabel" className="form-label">
        {title}
      </label>
      <div
        className="input-group mb-3"
        style={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <span className="input-group-text" id="thoiGianBatDauLabel">
          <i className="fa-regular fa-calendar-days"></i>
        </span>
        <Datetime
          className="date-map-custom"
          value={date}
          onChange={changeDateTime}
          closeOnSelect
          dateFormat="DD-MM-YYYY"
          timeFormat={false}
        />
      </div>
    </div>
  );
};

export default InputDateMap;
