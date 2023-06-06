import React, { useCallback, useState, useEffect } from "react";
import { api } from "../../../services/api";

import { Form } from "@unform/web";
import { Modal } from "react-bootstrap";

import Input from "../../../components/Input";

export const SettingPrice = ({
  worker,
  handleClose,
  setReady,
  //   setTime,
  modality,
  //   setEntries,
}) => {
  const [typedPrice, setTypedPrice] = useState();
  const [dateTime, setDateTime] = useState(new Date());

  const handleTypedPrice = useCallback(async (e) => {
    try {
      setTypedPrice(e.target.value);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const timerID = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const handleSetHourlyPrice = useCallback(async () => {
    try {
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1; // Months are zero-based
      const day = dateTime.getDate();
      const time = dateTime.toLocaleTimeString();
      const completeCurrentTime = year + "-" + month + "-" + day + " " + time;
      //   setTime(completeCurrentTime);

      const formData = {
        worker_id: worker.id,
        salary: typedPrice,
        since: completeCurrentTime,
      };
      await api.post(`hourly-salary`, formData);
    } catch (err) {
      console.log(err);
    }
  }, [dateTime, typedPrice, worker.id]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        handleSetHourlyPrice();
        handleClose();
      } catch (err) {
        console.log(err);
      }
    },
    [handleClose, handleSetHourlyPrice]
  );

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              Precio por hora a partir de hoy ({worker.name})
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="mt-3">
              <label htmlFor="name">
                <span>Precio por hora: *</span>
              </label>
              <Input
                className=" form-control"
                placeholder="Escriba el valor por hora"
                type="number"
                step="0.1"
                min="0"
                onChange={handleTypedPrice}
                name="price"
              ></Input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">
              Listo
            </button>
          </Modal.Footer>
        </Form>
      </div>
    </>
  );
};
