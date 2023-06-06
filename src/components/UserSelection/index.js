// Seleccionar usuario por color
// autenticar usuario
// registrar inicio del timer

import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { api } from "../../services/api";
import { CodeVerification } from "../CodeVerification";

export const UserSelection = ({
  setTime,
  handleWorkerChange,
  setReady,
  modality,
  setEntries,
}) => {
  const [workers, setWorkers] = useState();
  const [currentWorker, setCurrentWorker] = useState();
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = useCallback(() => setShow(true), []);

  const loadWorkers = useCallback(async () => {
    try {
      const response = await api.get(`workers/`);
      setWorkers(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  const handleClickUser = useCallback(
    async (worker) => {
      try {
        setCurrentWorker(worker);
        handleWorkerChange(worker);
        handleShowModal();
      } catch (err) {
        console.log(err);
      }
    },
    [handleShowModal, handleWorkerChange]
  );

  return (
    <>
      {workers ? (
        workers.map((worker) => (
          <div key={worker.id} className="mx-5 my-2 text-center">
            <button
              type="button"
              className={`btn btn-${worker.color}`}
              onClick={() => handleClickUser(worker)}
            >
              {worker.name}
            </button>
          </div>
        ))
      ) : (
        <div>No hay registro de trabajadores</div>
      )}
      <Modal show={show} onHide={handleCloseModal}>
        <CodeVerification
          worker={currentWorker}
          handleClose={handleCloseModal}
          setReady={setReady}
          setTime={setTime}
          modality={modality}
          setEntries={setEntries}
        />
      </Modal>
    </>
  );
};
