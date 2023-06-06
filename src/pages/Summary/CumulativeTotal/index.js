export const CumulativeTotal = ({ totalDuration }) => {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end mb-3">
          <b>
            TOTAL ACUMULADO: {totalDuration.hours}h {totalDuration.minutes}m
          </b>
        </div>
      </div>
    </>
  );
};
