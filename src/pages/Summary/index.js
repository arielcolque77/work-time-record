// Seleccionar usuario por color
// autenticar usuario
// registrar inicio del timer

import React, { useState } from 'react'
import { UserSelection } from '../../components/UserSelection'
import { SummaryScreen } from '../../components/SummaryScreen';

export const Summary = () => {

    const [ready, setReady] = useState(false);
    const [worker, setWorker] = useState();
    const [entries, setEntries] = useState([]);
    const [modality] = useState('resumen');


    const handleWorkerChange = (value) => setWorker(value);


    return (
        <>
            <div className='container'>
                <h1>Resumen</h1>
                {!ready ?
                    <>
                        <div> Seleccione su usuario: </div>
                        <div className='mt-4'>
                            <UserSelection
                                // setTime={setTime}
                                handleWorkerChange={handleWorkerChange}
                                setReady={setReady}
                                modality={modality}
                                setEntries={setEntries}
                            />
                        </div>
                    </>
                    :
                    <SummaryScreen
                        worker={worker}
                        entries={entries}
                        modality={modality}
                        setReady={setReady}
                    />

                }
            </div>
        </>

    )
}
