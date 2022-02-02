import React, { useEffect, useState } from "react";
import "./Inventory.css";
// import useNotification from "hooks/useNotification";
import Loading from "components/Loading/Loading";
import Button from "components/Button/Button";
import $api from "http/index.js";
import FileUpload from "components/FileUpload/FileUpload";
import Modal from "components/Modal/Modal";
import { toggleAnalysisModal } from "store/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";
import Analysis from "./Analysis/Analysis";

export default function Inventory() {
  const [isPending, setIsPending] = useState(true);
  const dispatch = useDispatch();

  const { analysisModal } = useSelector((state) => state.modal);

  const [data, setData] = useState([]);
  const [lastInventory, setLastInventory] = useState([]);
  console.log(lastInventory);

  useEffect(() => {
    const fetchData = async () => {
      await $api.get(`inventory`).then(({ data }) => setData(data));
      await $api
        .get(`inventory/lastInventory`)
        .then(({ data }) => setLastInventory(data))
        .finally(setIsPending(false));
    };
    fetchData();
  }, []);

  const toggleAnalysis = () => {
    if (document.body.style.overflow === "hidden")
      document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
    console.log(analysisModal);
    dispatch(toggleAnalysisModal(!analysisModal));
  };

  return (
    <>
      <div className="secondary-navbar">
        <Button
          text="Показать данные анализа"
          action={toggleAnalysis}
          style="filters"
        />
        <FileUpload lastInventory={lastInventory} />
      </div>

      <Modal
        visible={analysisModal}
        close={toggleAnalysis}
        header="Результаты анализа инвентаризации"
        doNotCheckForChanges
      >
        <Analysis />
      </Modal>

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
