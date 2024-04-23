"use client";
import React from "react";

import { Range, RangeKeyDict, DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

function Calendar({ onChange, value, disabledDates }: CalendarProps) {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="horizontal"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}

export default Calendar;
