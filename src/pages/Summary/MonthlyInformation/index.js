import Table from "react-bootstrap/Table";

export const MonthlyInformation = ({ everyMonthDuration }) => {
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
          {everyMonthDuration.map((month) => (
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
