import { useCallback, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

export const EntriesByMonthAndYear = ({ modifiedEntries, month, year }) => {
  const [thisMonthEntries, setThisMonthEntries] = useState([]);

  const selectThisMonthEntries = useCallback(async () => {
    try {
      const newEntries = modifiedEntries.filter((entry, index) => {
        const entryDate = new Date(entry.start_time);
        return (
          entryDate.getMonth() === month && entryDate.getFullYear() === year
        );
      });

      setThisMonthEntries(newEntries);
    } catch (err) {
      console.log(err);
    }
  }, [modifiedEntries, month, year]);

  useEffect(() => {
    selectThisMonthEntries();
  }, [selectThisMonthEntries]);

  return (
    <div className="container">
      <Table
        responsive
        className="table-striped table-bordered align-middle text-center mb-6"
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {thisMonthEntries?.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.start_time}</td>
              <td>{entry.end_time}</td>
              <td>
                {entry.duration_hours}h {entry.duration_minutes}m
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
