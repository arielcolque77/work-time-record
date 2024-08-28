import React, { useCallback, useState, useEffect } from "react";
import { AllEntries } from "../AllEntries";
import { MonthlyInformation } from "../MonthlyInformation";
import { CumulativeTotal } from "../CumulativeTotal";
import { Return } from "../../../components/Return";
import { api } from "../../../services/api";
import { SelectShowingDate } from "../SelectShowingDate";
import { EntriesByMonthAndYear } from "../EntriesByMonthAndYear";
import { MonthlyInformationByYear } from "../MonthlyInformationByYear";

export const SummaryScreen = ({ worker, entries, modality, setReady }) => {
  const [totalDuration, setTotalDuration] = useState(0);
  const [everyMonthDuration, setEveryMonthDuration] = useState([]);
  const [modifiedEntries, setModifiedEntries] = useState([]);
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const makeUnready = useCallback(async () => {
    try {
      setReady(false);
    } catch (err) {
      console.log(err);
    }
  }, [setReady]);

  // get all entries with duration fields
  const convertData = useCallback(async () => {
    try {
      const data = entries.map((row) => {
        const startTime = new Date(row.start_time);
        const endTime = new Date(row.end_time);
        const differenceInMs =
          row.end_time !== null
            ? endTime.getTime() - startTime.getTime()
            : new Date().getTime() - startTime.getTime();
        const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
        const hours = Math.floor(differenceInMinutes / 60);
        const minutes = differenceInMinutes % 60;

        console.log(entries, "entries");

        return {
          id: row.id,
          name: row.worker.name,
          start_time: row.start_time,
          end_time: row.end_time,
          duration: differenceInMinutes,
          duration_hours: hours,
          duration_minutes: minutes,
        };
      });

      console.log(data, "data");
      setModifiedEntries(data);
    } catch (err) {
      console.log(err);
    }
  }, [entries]);

  useEffect(() => {
    convertData();
  }, [convertData]);

  // calculate total duration
  const calculateDuration = useCallback(async () => {
    try {
      const sum = modifiedEntries.reduce(
        (accumulator, item) => accumulator + item.duration,
        0
      );
      const hours = Math.floor(sum / 60);
      const minutes = sum % 60;
      setTotalDuration({ hours, minutes });
    } catch (err) {
      console.log(err);
    }
  }, [modifiedEntries]);

  const calculateEveryMonthDuration = useCallback(async () => {
    try {
      const response = await api.get(
        `hourly-salary/months/worker/${worker.id}`
      );
      const months = Array.from({ length: 12 }, (_, index) => index);
      const durationByMonth = months.map((month) => {
        const thisMonthEntries = modifiedEntries.filter(
          (entry) => new Date(entry.start_time).getMonth() === month
        );

        const sum = thisMonthEntries.reduce(
          (accumulator, item) => accumulator + item.duration,
          0
        );
        const hours = Math.floor(sum / 60);
        const minutes = sum % 60;
        const monthName = new Date(2000, month).toLocaleString("default", {
          month: "long",
        });

        const hourlyPrice = response.data.filter(
          (item) => item.month - 1 === month
        );
        return {
          monthNumber: month,
          month: monthName,
          duration: sum,
          hours: hours,
          minutes: minutes,
          hourly_price: parseFloat(hourlyPrice[0].salary),
          total_price: (sum / 60) * parseFloat(hourlyPrice[0].salary),
        };
      });
      setEveryMonthDuration(durationByMonth);
    } catch (err) {
      console.log(err);
    }
  }, [modifiedEntries, worker.id]);

  const handleDateChange = ({ month, year }) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    calculateDuration();
    calculateEveryMonthDuration();
  }, [calculateDuration, calculateEveryMonthDuration]);

  return (
    <>
      <div className="container">
        <SelectShowingDate
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onDateChange={handleDateChange}
        />
        <EntriesByMonthAndYear
          modifiedEntries={modifiedEntries}
          month={selectedMonth}
          year={selectedYear}
        />
        {/* <AllEntries modifiedEntries={modifiedEntries} /> */}
        <MonthlyInformationByYear
          modifiedEntries={modifiedEntries}
          worker={worker}
          year={selectedYear}
        />
        {/* <MonthlyInformation everyMonthDuration={everyMonthDuration} /> */}
        <CumulativeTotal totalDuration={totalDuration} />
      </div>
      <Return makeUnready={makeUnready} />
    </>
  );
};
