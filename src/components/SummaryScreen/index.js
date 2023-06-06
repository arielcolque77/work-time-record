import React, { useCallback, useState, useEffect } from 'react'
import Table from "react-bootstrap/Table";


export const SummaryScreen = ({ worker, entries, modality, setReady }) => {
    const [totalDuration, setTotalDuration] = useState(0);
    const [modifiedEntries, setModifiedEntries] = useState([]);

    const makeUnready = useCallback(
        async () => {
            try {
                setReady(false);
            } catch (err) {
                console.log(err)
            }
        }, [setReady]
    )

    useEffect(() => {
        convertData();
    }, []);

    const convertData = useCallback(async () => {
        try {
            const data = entries.map(
                (row) => {
                    const startTime = new Date(row.start_time);
                    const endTime = new Date(row.end_time);
                    const differenceInMs = endTime.getTime() - startTime.getTime();
                    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
                    const hours = Math.floor(differenceInMinutes / 60);
                    const minutes = differenceInMinutes % 60;

                    return {
                        id: row.id,
                        name: row.worker.name,
                        start_time: row.start_time,
                        end_time: row.end_time,
                        duration: differenceInMinutes,
                        duration_hours: hours,
                        duration_minutes: minutes,
                    };
                }
            );
            setModifiedEntries(data);

        } catch (err) {
            console.log(err);
        }
    }, [entries]);

    const calculateDuration = useCallback(
        async () => {
            try {
                const sum = modifiedEntries.reduce((accumulator, item) => accumulator + item.duration, 0);
                console.log(sum);
                const hours = Math.floor(sum / 60);
                const minutes = sum % 60;
                console.log(hours, minutes)
                setTotalDuration({ hours, minutes })
            } catch (err) {
                console.log(err);
            }

        }, [modifiedEntries]);

    useEffect(() => {
        calculateDuration();
    }, [calculateDuration]);

    return (
        <>
            <div className='container'>
                <Table
                    responsive
                    className="table-striped table-bordered align-middle text-center"
                >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Entrada</th>
                            <th>Salida</th>
                            <th>Duración</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modifiedEntries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.name}</td>
                                <td>{entry.start_time}</td>
                                <td>{entry.end_time}</td>
                                <td>{entry.duration_hours}h {entry.duration_minutes}m</td>

                            </tr>
                        ))
                        }
                    </tbody>
                </Table>

                <div className='d-flex justify-content-end'>Total:  {totalDuration.hours}h {totalDuration.minutes}m</div>
            </div>
            <div className='d-flex justify-content-end'>
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
