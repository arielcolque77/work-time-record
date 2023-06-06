export const Return = ({ makeUnready }) => {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={makeUnready}
            className="btn btn-success"
          >
            Ok, gracias! Volver
          </button>
        </div>
      </div>
    </>
  );
};
