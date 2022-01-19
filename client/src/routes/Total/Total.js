import React, { useEffect, useState } from "react";
import "./Total.css";
import Item from "components/Item/Item";
import Modal from "components/Modal/Modal";
import Loading from "components/Loading/Loading";
import Form from "routes/NewItem/NewItem";
import Filters from "components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import ItemInfo from "routes/ItemInfo/ItemInfo";
import Button from "components/Button/Button";
import $api from "http/index.js";
import {
  changeItemInfoId,
  toggleFiltersModal,
  toggleItemInfoModal,
  toggleNewItemModal,
} from "store/actions/modalAction";
import { changeTotalData } from "store/actions/totalAction";

export default function Total() {
  const { data } = useSelector((state) => state.total);
  const { filters, newItem, itemInfo, itemInfoId } = useSelector(
    (state) => state.modal
  );
  const { login, role } = useSelector(({ user }) => user.username);
  const [isPending, setIsPending] = useState(true);

  const dispatchTotal = useDispatch();

  const openItemModal = (id) => {
    document.body.style.overflow = "hidden";
    dispatchTotal(changeItemInfoId(id));
    dispatchTotal(toggleItemInfoModal(true));
  };

  const closeItemModal = () => {
    document.body.style.overflow = "auto";
    dispatchTotal(changeItemInfoId(0));
    dispatchTotal(toggleItemInfoModal(false));
  };

  const toggleFiltersVisible = () => {
    if (document.body.style.overflow == "hidden")
      document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
    dispatchTotal(toggleFiltersModal(!filters));
  };
  const toggleNewItemVisible = () => {
    if (document.body.style.overflow == "hidden")
      document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
    dispatchTotal(toggleNewItemModal(!newItem));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await $api
        .get(`total`)
        .then(({ data }) => data)
        .finally(setIsPending(false));
      dispatchTotal(changeTotalData(data));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="filters-bar">
        <Button text="Фильтры" style="filters" action={toggleFiltersVisible} />
        {role === "admin" && (
          <Button
            text="Новый элемент"
            style="filters"
            action={toggleNewItemVisible}
          />
        )}
      </div>
      <Modal
        visible={newItem}
        close={toggleNewItemVisible}
        header={"Добавить новый предмет"}
      >
        <Form close={toggleNewItemVisible} />
      </Modal>
      <Modal visible={filters} close={toggleFiltersVisible} header={"Фильтры"}>
        <Filters close={toggleFiltersVisible} />
      </Modal>

      <div className="table">
        {isPending ? (
          <Loading />
        ) : (
          <>
            <table>
              <thead>
                <tr key={9999}>
                  <th>Номер QR</th>
                  <th>Ср-во</th>
                  <th>Тип</th>
                  <th>Месяц ввода</th>
                  <th>Год ввода</th>
                  <th>Наименование по бухучету</th>
                  <th>Модель реальная</th>
                  <th>Серийный номер</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => {
                  return <Item openModal={openItemModal} data={row} />;
                })}
              </tbody>
            </table>
          </>
        )}
        <Modal
          visible={itemInfo}
          close={closeItemModal}
          header={`Изменить информацию о позиции с QR номером: ${itemInfoId}`}
        >
          <ItemInfo editId={itemInfoId} close={closeItemModal} />
        </Modal>
      </div>
    </>
  );
}
