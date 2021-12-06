import React, { useEffect, useState } from "react";
import "./Total.css";
import Item from "components/Item/Item";
import Modal from "components/Modal/Modal";
import useFetch from "hooks/useFetch";
import Loading from "components/Loading/Loading";
import Form from "components/Form/Form";
import Filters from "components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { SERVER } from "constants/constants";

export default function Total() {
  const data = useSelector((state) => state.total.data);
  const dispatchTotal = useDispatch();

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

  const {
    data: fetchedData,
    isPending,
    error,
  } = useFetch(`${SERVER}api/total`);

  useEffect(() => {
    dispatchTotal({ type: "CHANGE_TOTAL_DATA", payload: fetchedData });
  }, [fetchedData]);

  return (
    <>
      <Filters />
      <Form data={data} />
      <div className="table">
        {isPending ? (
          <Loading />
        ) : (
          <>
            {data[data.length - 1]?.qr && (
              <p className="table-info">
                Последняя позиция QR : {data[data.length - 1]?.qr}
              </p>
            )}
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
          </>
        )}
        <Modal
          visible={visible}
          open={open}
          closeModal={closeModal}
          editId={editId}
          data={data}
        />
      </div>
    </>
  );
}
