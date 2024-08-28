import React, { useCallback, useState } from "react";
import { UserSelection } from "../../components/UserSelection";
import { SummaryScreen } from "../Summary/SummaryScreen";
import { Modal } from "react-bootstrap";
import { SettingPrice } from "./SettingPrice";
import { AddWorker } from "./AddWorker";
import { GenerateMonthlyReport } from "./GenerateMonthlyReport";

export const Manage = () => {
  const [ready, setReady] = useState(false);
  const [showPriceSetting, setShowPriceSetting] = useState(false);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showMonthlySummary, setShowMonthlySummary] = useState(false);
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

  const handleShowMonthlySummary = useCallback(async () => {
    try {
      setReady(true);
      setShowPriceSetting(false);
      setShowMonthlySummary(true);
      handleShowModal();
      setReady(false);
    } catch (err) {
      console.log(err);
    }
  }, [handleShowModal]);

  return (
    <>
      <div className="container">
        <h1>Admistrar</h1>
        <button
          type="button"
          className="btn btn-outline-success me-2"
          onClick={handleSummaryWorker}
        >
          Ver Resumen por Trabajador
        </button>
        <button
          type="button"
          className="btn btn-outline-primary me-2"
          onClick={settingHourlyPrice}
        >
          Configurar precio por hora
        </button>
        <button
          type="button"
          className="btn btn-outline-danger me-2"
          onClick={handleAddWorker}
        >
          Añadir Trabajador
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleShowMonthlySummary}
        >
          Generar Resumen Mensual
        </button>
      </div>

      <Modal show={show} onHide={handleCloseModal}>
        {/* if un ready, then select user */}
        {!ready && !showAddWorker && !showMonthlySummary ? (
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
              <SettingPrice
                worker={worker}
                handleClose={handleCloseModal}
                modality={modality}
                setReady={setReady}
              />
            ) : (
              //if setting the price is false...
              <>
                {/* the option to add worker is false? then show summary */}
                {!showAddWorker && !showMonthlySummary ? (
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
                    {showAddWorker ? (
                      <AddWorker handleClose={handleCloseModal} />
                    ) : (
                      // else (generate report)
                      <GenerateMonthlyReport handleClose={handleCloseModal} />
                    )}
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
