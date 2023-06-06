import React, { useCallback, useState, useEffect } from "react";
import { api } from "../../services/api";

import { Form } from "@unform/web";
import { Modal } from "react-bootstrap";

import Input from "../Input";

export const CodeVerification = ({
  worker,
  handleClose,
  setReady,
  setTime,
  modality,
  setEntries,
}) => {
  const [typedCode, setTypedCode] = useState();
  const [verified, setVerified] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [adminCode] = useState("12341234");

  const handleTypeCode = useCallback(async (e) => {
    try {
      setTypedCode(e.target.value);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleVerifyCode = useCallback(async () => {
    try {
      if (typedCode === worker.code) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [typedCode, worker.code]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const registeringEntryOut = useCallback(async () => {
    try {
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1; // Months are zero-based
      const day = dateTime.getDate();
      const time = dateTime.toLocaleTimeString();
      const completeCurrentTime = year + "-" + month + "-" + day + " " + time;
      setTime(completeCurrentTime);

      const response = await api.get(`periods-worked/worker/${worker.id}`);
      const data = response.data;
      const areOpenEntries = data.filter((entry) => entry.end_time === null);

      if (modality === "entrada") {
        const formData = {
          worker_id: worker.id,
          start_time: completeCurrentTime,
        };

        if (areOpenEntries.length === 0) {
          await api.post(`periods-worked`, formData);
          setReady(true);
        } else {
          alert("Ya hay un registro de entrada sin salida");
        }
      } else if (modality === "salida") {
        const formData = {
          worker_id: worker.id,
          start_time: areOpenEntries[0].start_time,
          end_time: completeCurrentTime,
        };

        await api.put(`periods-worked/${areOpenEntries[0].id}`, formData);
        setReady(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [dateTime, modality, setReady, setTime, worker.id]);

  const goingToSummary = useCallback(async () => {
    try {
      const response = await api.get(`periods-worked/worker/${worker.id}`);
      const data = response.data;
      setEntries(data);
      setReady(true);
    } catch (err) {
      console.log(err);
    }
  }, [setEntries, setReady, worker.id]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        handleVerifyCode();
        if (typedCode === worker.code) {
          if (modality === "entrada" || modality === "salida") {
            registeringEntryOut();
            handleClose();
          } else if (modality === "resumen") {
            goingToSummary();
            handleClose();
          } else {
            alert("Se ha producido un error");
            handleClose();
          }
        } else if (typedCode === adminCode) {
          goingToSummary();
          handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [
      adminCode,
      goingToSummary,
      handleClose,
      handleVerifyCode,
      modality,
      registeringEntryOut,
      typedCode,
      worker.code,
    ]
  );

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Verificación de Código</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="mt-3">
              <label htmlFor="name">
                <span>
                  {modality === "admin"
                    ? "Código de administrador: *"
                    : "Código: *"}
                </span>
              </label>
              <Input
                className=" form-control"
                placeholder="Escriba el código de verificación"
                type="text"
                onChange={handleTypeCode}
                name="code"
              ></Input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">
              Verificar
            </button>
          </Modal.Footer>
        </Form>
      </div>
    </>
  );
};
