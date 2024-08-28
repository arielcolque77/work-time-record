import Table from "react-bootstrap/Table";

export const AllEntries = ({ modifiedEntries }) => {
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
          {modifiedEntries.map((entry) => (
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
