// Seleccionar usuario por color
// autenticar usuario
// registrar inicio del timer

import React, { useCallback, useState, useEffect } from 'react'
import { api } from "../../services/api"


import { Form } from "@unform/web";
import { Modal } from 'react-bootstrap';

import Input from '../Input';


export const CodeVerification = ({
    worker,
    handleClose,
    setReady,
    setTime,
    modality,
    setEntries
}) => {
    const [typedCode, setTypedCode] = useState();
    const [verified, setVerified] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());

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
                console.log(worker.code, typedCode);
                setVerified(true);
                console.log('código correcto');
                console.log(verified);
            }
            else {
                console.log(worker.code, typedCode);
                setVerified(false);
                console.log('código incorrecto')
            }
        } catch (err) {
            console.log(err);
        }
    }, [typedCode, verified, worker.code]);


    useEffect(() => {
        const timerID = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const registeringEntryOut = useCallback(
        async () => {
            try {
                // const start = dateTime.toLocaleString();
                const year = dateTime.getFullYear();
                const month = dateTime.getMonth() + 1; // Months are zero-based
                const day = dateTime.getDate();
                const time = dateTime.toLocaleTimeString();
                const completeCurrentTime = year + '-' + month + '-' + day + ' ' + time
                console.log(completeCurrentTime)
                setTime(completeCurrentTime);

                const response = await api.get(`periods-worked/worker/${worker.id}`);
                const data = response.data;
                const areOpenEntries = data.filter((entry) => (
                    entry.end_time === null
                ))

                console.log('lista de entradas abiertas', areOpenEntries);

                if (modality === 'entrada') {
                    const formData = {
                        worker_id: worker.id,
                        start_time: completeCurrentTime,
                    }

                    if (areOpenEntries.length === 0) {
                        await api.post(`periods-worked`, formData)
                        setReady(true);

                    } else {
                        alert('Ya hay un registro de entrada sin salida');
                    }
                }

                else if (modality === 'salida') {
                    const formData = {
                        worker_id: worker.id,
                        start_time: areOpenEntries[0].start_time,
                        end_time: completeCurrentTime,
                    }

                    await api.put(`periods-worked/${areOpenEntries[0].id}`, formData)
                    setReady(true);

                }

            } catch (err) {
                console.log(err);
            }
        }, [dateTime, modality, setReady, setTime, worker.id]
    )

    const goingToSummary = useCallback(
        async () => {
            try {
                const response = await api.get(`periods-worked/worker/${worker.id}`);
                const data = response.data;
                setEntries(data);
                console.log('lista de entradas', data);
                setReady(true);
            } catch (err) {
                console.log(err);
            }
        }, [setEntries, setReady, worker.id]
    )

    const handleSubmit = useCallback(
        async (data) => {
            try {
                handleVerifyCode();
                console.log('después del handleVerify')
                if (typedCode === worker.code) {
                    console.log('verificado')
                    if (modality === 'entrada' || modality === 'salida') {
                        console.log('entrada o salida')
                        registeringEntryOut();
                        handleClose();
                    } else if (modality === 'resumen') {
                        console.log('resumen')
                        goingToSummary();
                        handleClose();
                    }
                }

            } catch (err) {
                console.log(err)
            }
        },
        [goingToSummary, handleClose, handleVerifyCode, modality, registeringEntryOut, typedCode, worker.code]
    );




    return (
        <>
            <div className='container'>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Verificación de Código</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mt-3">
                            <label htmlFor="name">
                                <span>Código: *</span>
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
                        <button className="btn btn-primary" type='submit' >
                            Verificar
                        </button>
                    </Modal.Footer>
                </Form>
            </div>
        </>
    )
}
