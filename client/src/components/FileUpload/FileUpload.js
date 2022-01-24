import axios from "axios";
import useNotification from "hooks/useNotification";
import $api from "http";
import { API_URL } from "http";
import React from "react";
import { useState } from "react";
import { store } from "store";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const dispatch = useNotification();
  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileData = new FormData();
      fileData.append("csv", selectedFile);

      const uploadData = await axios({
        method: "post",
        url: `${API_URL}inventory/upload`,
        data: fileData,
      })
        .then(({ data }) => data)
        .catch((err) => {
          console.log(err);
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
  return (
    <>
      <h2>Загрузить инвентаризацинную опись</h2>
      <div className="uploader form">
        <label htmlFor="csv">Загрузить csv файл</label>
        <input
          accept=".csv"
          className="uploader"
          id="csv"
          onChange={handleChange}
          type="file"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
