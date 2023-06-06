import React, { useCallback } from 'react'

export const SuccessScreen = ({ worker, time, modality, setReady }) => {

    const makeUnready = useCallback(
        async () => {
            try {
                setReady(false);
            } catch (err) {
                console.log(err)
            }
        }, [setReady]
    )

    return (
        <>
            <div className='container'>
                <div> ¡Listo! {worker.name}, tu {modality} se ha registrado a las: </div>
                <div>{time}</div>
            </div>
            <div>
                <button
                    type='button'
                    onClick={makeUnready}
                    className='btn btn-success'
                >
                    Ok, gracias! Volver
                </button>
            </div>
        </>
    )
}
