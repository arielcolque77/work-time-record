import { useState, useCallback, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { api } from "../../../services/api";

export const MonthlyInformationByYear = ({ modifiedEntries, worker, year }) => {
  const [thisYearDurationByMonth, setThisYearDurationByMonth] = useState([]);

  const calculateEveryMonthDuration = useCallback(async () => {
    try {
      const response = await api.get(
        `hourly-salary/months/worker/${worker.id}/year`,
        { params: { year: year } }
      );

      const months = Array.from({ length: 12 }, (_, index) => index);
      const durationByMonth = months.map((month) => {
        const thisMonthInYearEntries = modifiedEntries.filter((entry) => {
          const entryDate = new Date(entry.start_time);
          return (
            entryDate.getMonth() === month && entryDate.getFullYear() === year
          );
        });

        const sum = thisMonthInYearEntries.reduce(
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
      setThisYearDurationByMonth(durationByMonth);
    } catch (err) {
      console.log(err);
    }
  }, [modifiedEntries, worker.id, year]);

  useEffect(() => {
    calculateEveryMonthDuration();
  }, [calculateEveryMonthDuration]);
  return (
    <div className="container">
      <Table
        responsive
        className="table-striped table-bordered align-middle text-center"
      >
        <thead>
          <tr>
            <th>Mes</th>
            <th>Duración</th>
            <th>Precio Hora</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {thisYearDurationByMonth.map((month) => (
            <tr key={month.monthNumber}>
              <td>{month.month}</td>
              <td>
                {month.hours}h {month.minutes}m ({month.duration})
              </td>
              <td>{month.hourly_price}</td>
              <td>{month.total_price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
