import React, { useEffect, useState } from "react";
import "./Total.css";
import Item from "components/Item/Item";
import Modal from "components/Modal/Modal";
import useFetch from "hooks/useFetch";
import Loading from "components/Loading/Loading";
import Form from "components/Form/NewItem";
import Filters from "components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { SERVER } from "constants/constants";
import ItemInfo from "routes/ItemInfo/ItemInfo";
import Button from "components/Button/Button";

export default function Total() {
  const data = useSelector((state) => state.total.data);
  const { filters, newItem, itemInfo, itemInfoId } = useSelector(
    (state) => state.modal
  );

  const dispatchTotal = useDispatch();

  const openItemModal = (id) => {
    document.body.style.overflow = "hidden";
    dispatchTotal({
      type: "CHANGE_ITEMINFOID",
      payload: id,
    });
    dispatchTotal({
      type: "TOGGLE_ITEMINFO_MODAL",
      payload: true,
    });
  };

  const closeItemModal = () => {
    document.body.style.overflow = "auto";
    dispatchTotal({
      type: "CHANGE_ITEMINFOID",
      payload: 0,
    });
    dispatchTotal({
      type: "TOGGLE_ITEMINFO_MODAL",
      payload: false,
    });
  };

  const toggleFiltersVisible = () => {
    dispatchTotal({
      type: "TOGGLE_FILTERS_MODAL",
      payload: !filters,
    });
  };
  const toggleNewItemVisible = () => {
    dispatchTotal({
      type: "TOGGLE_NEWITEM_MODAL",
      payload: !newItem,
    });
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
      <div className="filters-bar">
        <Button text="Фильтры" style="filters" action={toggleFiltersVisible} />
        <Button
          text="Новый элемент"
          style="filters"
          action={toggleNewItemVisible}
        />
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
                  <th>Наименование</th>
                  <th>Модель</th>
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
