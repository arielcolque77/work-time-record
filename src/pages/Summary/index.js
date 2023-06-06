import React, { useState } from "react";
import { UserSelection } from "../../components/UserSelection";
import { SummaryScreen } from "./SummaryScreen";

export const Summary = () => {
  const [ready, setReady] = useState(false);
  const [worker, setWorker] = useState();
  const [entries, setEntries] = useState([]);
  const [modality] = useState("resumen");

  const handleWorkerChange = (value) => setWorker(value);

  return (
    <>
      <div className="container">
        <h1>Resumen</h1>
        {!ready ? (
          <>
            <div> Seleccione su usuario: </div>
            <div className="mt-4">
              <UserSelection
                handleWorkerChange={handleWorkerChange}
                setReady={setReady}
                modality={modality}
                setEntries={setEntries}
              />
            </div>
          </>
        ) : (
          <SummaryScreen
            worker={worker}
            entries={entries}
            modality={modality}
            setReady={setReady}
          />
        )}
      </div>
    </>
  );
};
