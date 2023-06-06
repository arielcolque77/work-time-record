import React, { useCallback } from "react";
import { Return } from "../Return";

export const SuccessScreen = ({ worker, time, modality, setReady }) => {
  const makeUnready = useCallback(async () => {
    try {
      setReady(false);
    } catch (err) {
      console.log(err);
    }
  }, [setReady]);

  return (
    <>
      <div className="container">
        <div>
          {" "}
          ¡Listo! {worker.name}, tu {modality} se ha registrado a las:{" "}
        </div>
        <div>{time}</div>
      </div>
      <Return makeUnready={makeUnready} />
    </>
  );
};
