import axios from "axios";
import Button from "components/Button/Button";
import useNotification from "hooks/useNotification";
import { API_URL } from "http";
import React from "react";
import { useState } from "react";
import "./FileUpload.sass";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  console.log(selectedFile);
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

  function fileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  return (
    <>
      <div className="uploader form">
        {selectedFile ? (
          <span>
            {selectedFile?.name} {fileSize(selectedFile?.size)}
          </span>
        ) : (
          <span>Нет выбранных файлов</span>
        )}
        <label htmlFor="csv">Загрузить csv файл инвентаризационной описи</label>

        <input
          accept=".csv"
          className="uploader"
          id="csv"
          onChange={handleChange}
          type="file"
        />
        <Button text="Загрузить" action={handleSubmit} style="filters" />
      </div>
    </>
  );
}
