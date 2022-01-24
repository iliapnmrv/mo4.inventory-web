import React, { useEffect, useState } from "react";
import "./Inventory.css";
import useNotification from "hooks/useNotification";
import Loading from "components/Loading/Loading";
import Button from "components/Button/Button";
import $api from "http/index.js";
import FileUpload from "components/FileUpload/FileUpload";

export default function Inventory() {
  const [isPending, setIsPending] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await $api
        .get(`inventory`)
        .then(({ data }) => setData(data))
        .finally(setIsPending(false));
    };
    fetchData();
  }, []);

  const analyzeInventory = async () => {
    const invAnalysis = await $api
      .get(`inventory/analyze`)
      .then(({ data }) => data);
    const totalAnalysis = await $api
      .get(`total/analyze`)
      .then(({ data }) => data);
    console.log(totalAnalysis, invAnalysis);
  };

  const showUsers = async () => {
    const users = await $api.get(`auth/users`).then(({ data }) => data);
    console.log(users);
  };

  return (
    <>
      <Button text="Проанализировать" action={showUsers} />
      <Button text="Проанализировать" action={analyzeInventory} />
      <FileUpload />

      <div className="flex">
        {isPending ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr key={9999}>
                <th>Позиция в ведомости</th>
                <th>Наименование</th>
                <th>Место</th>
                <th>Количество</th>
                <th>Приоритет</th>
              </tr>
            </thead>
            <tbody>
              {data !== null &&
                data.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.vedpos}</td>
                      <td>{row.name}</td>
                      <td>{row.place}</td>
                      <td>{row.kolvo}</td>
                      <td>{row.placepriority}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
