import { useState } from "react";

export const SelectShowingDate = ({
  selectedMonth,
  selectedYear,
  onDateChange,
}) => {
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [currentYear, currentYear - 1, currentYear - 2];

  const handleMonthChange = (event) => {
    onDateChange({
      month: parseInt(event.target.value),
      year: selectedYear,
    });
  };

  const handleYearChange = (year) => {
    onDateChange({ month: selectedMonth, year });
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-start">
          <div className="btn-group" aria-label="Year Selector">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={`btn btn-outline-primary ${
                  year === selectedYear ? "active" : ""
                }`}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <select
            className="form-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            aria-label="Select Month"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
