import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./Inventory.css";
import useNotification from "hooks/useNotification";
import Loading from "components/Loading/Loading";
import Button from "components/Button/Button";
import $api from "http/index.js";

export default function Inventory() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const data = $api
    .get(`inventory`)
    .then(({ data }) => data)
    .finally(setIsPending(false));

  const dispatch = useNotification();

  const handleUpload = async (e) => {
    try {
      const truncateData = await $api.delete(`inventory`);

      const files = e.target.files;
      const formData = new FormData();
      formData.append("csv", files[0]);

      const uploadData = await $api.post(`inventory/upload`, {
        formData,
      });

      dispatch({
        type: "SUCCESS",
        message: uploadData,
        title: "Обновлено",
      });
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: "ERROR",
        message: "Ошибка при загрузке",
      });
    }
  };

  const toggleForm = () => {
    document.querySelector(".form").classList.toggle("slide");
    setOpen(!open);
  };

  const analyzeInventory = async () => {
    const invAnalysis = await $api
      .get(`inventory/analyze`)
      .then(({ data }) => data);
    const totalAnalysis = await $api
      .get(`total/analyze`)
      .then(({ data }) => data);
    console.log(totalAnalysis, invAnalysis);
  };

  return (
    <>
      <Button text="Проанализировать" action={analyzeInventory} />
      <div
        className="header"
        onClick={() => {
          toggleForm();
        }}
      >
        <h2>Загрузить инвентаризацинную опись</h2>
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} />
      </div>
      <div className="uploader form">
        <label htmlFor="csv">Загрузить csv файл</label>
        <input
          accept=".csv"
          className="uploader"
          id="csv"
          onChange={(e) => {
            handleUpload(e);
          }}
          type="file"
        />
      </div>

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
