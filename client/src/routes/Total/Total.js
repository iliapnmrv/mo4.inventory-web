import React, { useEffect, useState } from "react";
import "./Total.css";
import Item from "../../components/Item/Item";
import Modal from "../../components/Modal/Modal";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import Form from "../../components/Form/Form";
import Filters from "../../components/Filters/Filters";

export default function Total() {
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState();
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState([]);

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

  useEffect(() => {
    setTotal(data);
  }, [data]);

  return (
    <>
      <Filters />
      <Form total={total} setTotal={setTotal} />
      <div className="table">
        {total[total.length - 1]?.qr && (
          <p className="table-info">
            Последняя позиция QR : {total[total.length - 1]?.qr}
          </p>
        )}

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
              {total.map((row) => {
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
          total={total}
          setTotal={setTotal}
        />
      </div>
    </>
  );
}
