// Seleccionar usuario por color
// autenticar usuario
// registrar inicio del timer

import React, { useState } from 'react'
import { UserSelection } from '../../components/UserSelection'
import { SuccessScreen } from '../../components/SuccessScreen';

export const Start = () => {

    const [ready, setReady] = useState(false);
    const [worker, setWorker] = useState();
    const [time, setTime] = useState();
    const [modality] = useState('entrada');


    const handleWorkerChange = (value) => setWorker(value);


    return (
        <>
            <div className='container'>
                <h1 className='text-center'>Registro de Entrada</h1>
                {!ready ?
                    <>
                        <div className='text-center'> Seleccione su usuario: </div>
                        <div className='mt-4'>
                            <UserSelection
                                setTime={setTime}
                                handleWorkerChange={handleWorkerChange}
                                setReady={setReady}
                                modality={modality}
                            />
                        </div>
                    </>
                    :
                    <SuccessScreen
                        worker={worker}
                        time={time}
                        modality={modality}
                        setReady={setReady}
                    />

                }
            </div>
        </>

    )
}
