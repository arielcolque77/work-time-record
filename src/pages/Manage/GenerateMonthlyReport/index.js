import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";

import { Modal } from "react-bootstrap";

export const GenerateMonthlyReport = ({ handleClose }) => {
  const [workersTotal, setWorkersTotal] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const monthlyPrice = 1100;
  const loadData = useCallback(async () => {
    try {
      const previousMonth = new Date().getMonth();
      // const currentMonth = previousMonth + 1;
      const workerResponse = await api.get(`workers`);

      const allWorkerReports = [];

      const reports = workerResponse.data.map(async (worker) => {
        const response = await api.get(
          `periods-worked/report/worker/${worker.id}`,
          {
            params: {
              month: previousMonth,
            },
          }
        );
        const totalDurationByWorker = response.data.reduce(
          (accumulator, item) => {
            const { worker_id, duration } = item;
            if (!accumulator[worker_id]) {
              accumulator[worker_id] = 0;
            }

            accumulator[worker_id] += duration;

            return accumulator;
          },
          {}
        );

        const workerReports = Object.keys(totalDurationByWorker).map(
          (worker_id) => ({
            worker_id: parseInt(worker_id),
            monthly_duration: totalDurationByWorker[worker_id],
            total: totalDurationByWorker[worker_id] * (monthlyPrice / 60),
          })
        );

        allWorkerReports.push(...workerReports);
        // return workerReports;
      });
      // console.log(allWorkerReports, ": allWorkerReports");
      setWorkersTotal(allWorkerReports);

      const summatory = allWorkerReports.reduce(
        (accumulator, item) => accumulator + item.total,
        0
      );
      setGrandTotal(summatory);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const calculateMonthDurationByWorker = useCallback(async (worker) => {
    try {
      const previousMonth = new Date().getMonth();
      const response = await api.get(
        `periods-worked/report/worker/${worker.id}`,
        {
          params: {
            month: previousMonth,
          },
        }
      );

      const monthlyDuration = response.data.reduce(
        (accumulator, item) => accumulator + item.duration,
        0
      );

      const hours = Math.floor(monthlyDuration / 60);
      const minutes = monthlyDuration % 60;
      return {
        worker_id: worker.id,
        monthlyDuration: monthlyDuration,
        hours: hours,
        minutes: minutes,
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadData2 = useCallback(async () => {
    try {
      const previousMonth = new Date().getMonth();
      const completeReport = await api.get(`periods-worked/report/`, {
        params: {
          month: previousMonth,
        },
      });

      setWorkersTotal(completeReport.data.report);
      setGrandTotal(completeReport.data.total_all_workers);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // loadData();
    loadData2();
  }, [loadData, loadData2]);

  return (
    <div className="container">
      <Modal.Header closeButton>
        <Modal.Title>Reporte mensual</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mt-3">
          <h4>Total a pagar: ${(grandTotal / 60) * 1100}</h4>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Total Duration (in hours)</th>
                <th>Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {workersTotal &&
                workersTotal.map((worker, index) => (
                  <tr key={index}>
                    <td>{worker.id}</td>
                    <td>{worker.worker_report.total_duration / 60}</td>
                    <td>
                      $
                      {(worker.worker_report.total_duration / 60) *
                        worker.worker_report.price_this_month}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" type="button" onClick={handleClose}>
          Listo
        </button>
      </Modal.Footer>
    </div>
  );
};
