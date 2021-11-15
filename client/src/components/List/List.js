import React, { useState } from "react";
import "./List.css";
import Item from "../Item/Item";
import Modal from "../Modal/Modal";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";

export default function List() {
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState();
  const [open, setOpen] = useState(false);

  const openModal = (id) => {
    document.body.style.overflow = "hidden";
    setVisible(true);
    setEditId(id);
    setOpen(!open);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setVisible(false);
  };

  const { data, isPending, error } = useFetch(
    "http://localhost:8000/api/total"
  );

  return (
    <>
      <div className="flex">
        {isPending ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr key={9999}>
                <th>Номер QR</th>
                <th>Ср-во</th>
                <th>Тип</th>
                <th>Месяц ввода</th>
                <th>Год ввода</th>
                <th>Наименование</th>
                <th>Модель</th>
                <th>Серийный номер</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                return <Item openModal={openModal} data={row} />;
              })}
            </tbody>
          </table>
        )}
        <Modal
          visible={visible}
          open={open}
          closeModal={closeModal}
          editId={editId}
        />
      </div>
    </>
  );
}
