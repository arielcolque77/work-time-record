import React, { useCallback, useState } from "react";
import { UserSelection } from "../../components/UserSelection";
import { SummaryScreen } from "../Summary/SummaryScreen";
import { Modal } from "react-bootstrap";
import { SettingPrice } from "./SettingPrice";
import { AddWorker } from "./AddWorker";

export const Manage = () => {
  const [ready, setReady] = useState(false);
  const [showPriceSetting, setShowPriceSetting] = useState(false);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [worker, setWorker] = useState();
  const [entries, setEntries] = useState([]);
  const [modality] = useState("admin");
  const [, setCurrentWorker] = useState();

  const handleWorkerChange = (value) => setWorker(value);
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = useCallback(() => setShow(true), []);

  const handleSummaryWorker = useCallback(
    async (worker) => {
      try {
        setCurrentWorker(worker);
        setShowPriceSetting(false);
        setShowAddWorker(false);
        handleWorkerChange(worker);
        handleShowModal();
      } catch (err) {
        console.log(err);
      }
    },
    [handleShowModal]
  );

  const settingHourlyPrice = useCallback(
    async (worker) => {
      try {
        setCurrentWorker(worker);
        handleWorkerChange(worker);
        setShowAddWorker(false);
        setShowPriceSetting(true);
        handleShowModal();
      } catch (err) {
        console.log(err);
      }
    },
    [handleShowModal]
  );
  const handleAddWorker = useCallback(async () => {
    try {
      setReady(true);
      setShowPriceSetting(false);
      setShowAddWorker(true);
      handleShowModal();
      setReady(false);
    } catch (err) {
      console.log(err);
    }
  }, [handleShowModal]);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Admistrar</h1>
        <div className="d-flex justify-content-center d-flex row">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-success col-4"
              onClick={handleSummaryWorker}
            >
              Ver Resumen por Trabajador
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary col-4"
              onClick={settingHourlyPrice}
            >
              Configurar precio por hora
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-danger col-4"
              onClick={handleAddWorker}
            >
              Añadir Trabajador
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleCloseModal}>
        {/* if un ready, then select user */}
        {!ready && !showAddWorker ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title> Seleccione el usuario: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mt-4">
                <UserSelection
                  handleWorkerChange={handleWorkerChange}
                  setReady={setReady}
                  modality={modality}
                  setEntries={setEntries}
                />
              </div>
            </Modal.Body>
          </>
        ) : (
          // if it is ready...

          <>
            {/* the option is to set the price? then set the price */}
            {showPriceSetting ? (
              <>
                <SettingPrice
                  worker={worker}
                  handleClose={handleCloseModal}
                  modality={modality}
                  setReady={setReady}
                />
              </>
            ) : (
              //if setting the price is false...
              <>
                {/* the option to add worker is false? then show summary */}
                {!showAddWorker ? (
                  <>
                    <Modal.Header>
                      <Modal.Title> Resumen: </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <SummaryScreen
                        worker={worker}
                        entries={entries}
                        modality={modality}
                        setReady={setReady}
                      />
                    </Modal.Body>
                  </>
                ) : (
                  // if add worker is true...
                  <>
                    {/* show modal to add worker */}

                    <AddWorker handleClose={handleCloseModal} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};
