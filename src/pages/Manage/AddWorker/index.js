import React, { useCallback, useState } from "react";
import { api } from "../../../services/api";

import { Form } from "@unform/web";
import { Modal } from "react-bootstrap";

import Input from "../../../components/Input";

export const AddWorker = ({ handleClose }) => {
  const [typedName, setTypedName] = useState();
  const [typedColor, setTypedColor] = useState();
  const [typedCode, setTypedCode] = useState();

  const handleTypedName = useCallback(async (e) => {
    try {
      setTypedName(e.target.value);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleTypedColor = useCallback(async (e) => {
    try {
      setTypedColor(e.target.value);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleTypedCode = useCallback(async (e) => {
    try {
      setTypedCode(e.target.value);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleAddWorker = useCallback(async () => {
    try {
      const formData = {
        name: typedName,
        color: typedColor,
        code: typedCode,
      };
      await api.post(`workers`, formData);
    } catch (err) {
      console.log(err);
    }
  }, [typedCode, typedColor, typedName]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        handleAddWorker();
        handleClose();
      } catch (err) {
        console.log(err);
      }
    },
    [handleAddWorker, handleClose]
  );

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Escriba los datos</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="mt-3">
              <label htmlFor="name">
                <span>Nombre del trabajador: *</span>
              </label>
              <Input
                className=" form-control"
                placeholder="Escriba el nombre del trabajador"
                type="text"
                onChange={handleTypedName}
                name="name"
              ></Input>
            </div>
            <div className="mt-3">
              <label htmlFor="color">
                <span>Color: *</span>
              </label>
              <Input
                className=" form-control"
                placeholder="use estilos de bootstrap"
                type="text"
                onChange={handleTypedColor}
                name="color"
              ></Input>
            </div>
            <div className="mt-3">
              <label htmlFor="code">
                <span>Código del trabajador: *</span>
              </label>
              <Input
                className=" form-control"
                placeholder="Asigne un código al trabajador"
                type="text"
                onChange={handleTypedCode}
                name="code"
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
