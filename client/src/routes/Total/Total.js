import React, { useEffect, useState } from "react";
import "./Total.sass";
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
  toggleItemInfoModal,
  toggleNewItemModal,
  toggleSaveDialog,
} from "store/actions/modalAction";
import {
  changeInitialItemData,
  changeNewItemData,
  changeTotalData,
  setFilters,
} from "store/actions/totalAction";
import OnItemInfoFormSubmit from "routes/ItemInfo/onItemInfoFormSubmit";
import NewItemSubmit from "routes/NewItem/NewItemSubmit";
import Input from "components/Form/Input/Input";
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Total() {
  const {
    data,
    itemValues: {
      qr,
      name,
      sredstvo,
      type,
      month,
      year,
      model,
      sernom,
      info,
      status,
      person,
      storage,
      addinfo,
      owner,
    },
    newItemValues: {
      qr: newItemQR,
      name: newItemName,
      sredstvo: newItemSredstvo,
      type: newItemType,
      month: newItemMonth,
      year: newItemYear,
      model: newItemModel,
      sernom: newItemSernom,
      info: newItemInfo,
      status: newItemStatus,
      person: newItemPerson,
      storage: newItemStorage,
      addinfo: newItemAddinfo,
      owner: newItemOwner,
    },
    filters: {
      sredstvo: sredstvoFilter,
      type: typeFilter,
      status: statusFilter,
      person: personFilter,
      storage: storageFilter,
      owner: ownerFilter,
    },
  } = useSelector((state) => state.total);
  const {
    saveDialog: { visible: dialogVisible },
    newItem,
    itemInfo,
    itemInfoId,
  } = useSelector((state) => state.modal);

  console.log(data);
  const { username } = useSelector(({ user }) => user);
  const [isPending, setIsPending] = useState(true);
  const [search, setSearch] = useState("");
  const [showPlaces, setShowPlaces] = useState(false);

  const dispatchTotal = useDispatch();
  const dispatchModal = useDispatch();

  const onFormSubmit = OnItemInfoFormSubmit();
  const onNewItemFormSubmit = NewItemSubmit();

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

  const toggleNewItemVisible = () => {
    if (document.body.style.overflow === "hidden")
      document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";

    dispatchTotal(toggleNewItemModal(!newItem));
    dispatchTotal(
      changeInitialItemData({
        qr: ("00000" + (Number(data[data.length - 1]?.qr) + 1)).slice(-5),
        name: "",
        sredstvo: "",
        type: "",
        month: "",
        year: "",
        model: "",
        sernom: "",
        info: "",
        status: "",
        person: "",
        storage: "",
        addinfo: "",
        owner: "",
      })
    );
    dispatchTotal(
      changeNewItemData({
        qr: ("00000" + (Number(data[data.length - 1]?.qr) + 1)).slice(-5),
        name: "",
        sredstvo: "",
        type: "",
        month: "",
        year: "",
        model: "",
        sernom: "",
        info: "",
        status: "",
        person: "",
        storage: "",
        addinfo: "",
        owner: "",
      })
    );
  };

  const getAllData = async () => {
    const data = await $api
      .get(`total`)
      .then(({ data }) => data)
      .finally(setIsPending(false));
    dispatchTotal(changeTotalData(data));
    dispatchTotal(
      setFilters({
        sredstvo: [],
        type: [],
        status: [],
        person: [],
        storage: [],
        owner: [],
      })
    );
  };

  useEffect(() => {
    getAllData();
  }, []);

  const saveData = (e) => {
    e.preventDefault();
    onFormSubmit(closeItemModal);
    dispatchModal(toggleSaveDialog({ visible: !dialogVisible }));
  };
  const saveNewData = (e) => {
    e.preventDefault();
    onNewItemFormSubmit(toggleNewItemVisible);
    dispatchModal(toggleSaveDialog({ visible: !dialogVisible }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="secondary-navbar">
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            alignItems: "center",
          }}
        >
          <Button
            text="Сбросить фильтры"
            style="filters"
            action={() => {
              getAllData();
              setSearch("");
            }}
            disabled={
              sredstvoFilter.length ||
              typeFilter.length ||
              statusFilter.length ||
              personFilter.length ||
              storageFilter.length ||
              ownerFilter.length
                ? false
                : true
            }
          />
          <div className="search-field">
            <Input
              placeholder="Поиск по документообороту..."
              onChange={handleSearch}
              value={search}
              name="search"
              required={false}
            />
          </div>
          <label htmlFor="search" className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              onChange={() => setShowPlaces(!showPlaces)}
            />
            Показать местоположения
          </label>
          {username?.role === "admin" && (
            <Button
              text="Новый элемент"
              style="filters"
              action={toggleNewItemVisible}
            />
          )}
        </div>
      </div>
      <Modal
        visible={newItem}
        action={saveNewData}
        close={toggleNewItemVisible}
        header={"Добавить новый предмет"}
        comparisonObject={{
          qr: newItemQR,
          name: newItemName,
          sredstvo: newItemSredstvo,
          type: newItemType,
          month: newItemMonth,
          year: newItemYear,
          model: newItemModel,
          sernom: newItemSernom,
          info: newItemInfo,
          status: newItemStatus,
          person: newItemPerson,
          storage: newItemStorage,
          addinfo: newItemAddinfo,
          owner: newItemOwner,
        }}
      >
        <Form close={toggleNewItemVisible} />
      </Modal>
      <Modal
        visible={itemInfo}
        close={closeItemModal}
        action={saveData}
        header={`Изменить информацию о позиции с QR номером: ${itemInfoId}`}
        comparisonObject={{
          qr,
          name,
          sredstvo,
          type,
          month,
          year,
          model,
          sernom,
          person,
          storage,
          status,
          info,
          addinfo,
          owner,
        }}
      >
        <ItemInfo editId={itemInfoId} close={closeItemModal} />
      </Modal>
      <div className="page-content">
        <div className="sidebar">
          <Filters />
        </div>

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
                    <th>
                      {showPlaces
                        ? "Местоположение"
                        : "Наименование по бухучету"}
                    </th>
                    <th>Модель реальная</th>
                    <th>Серийный номер</th>
                  </tr>
                </thead>
                {data.length ? (
                  <tbody>
                    {data
                      .filter((item) => {
                        return (
                          item.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          item.model
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          item.qr
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          item.sernom
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          item?.info
                            ?.toLowerCase()
                            ?.includes(search.toLowerCase())
                        );
                      })
                      .map((row) => {
                        return (
                          <Item
                            openModal={openItemModal}
                            data={row}
                            showPlaces={showPlaces}
                          />
                        );
                      })}
                  </tbody>
                ) : (
                  <div>Данные отсутствуют</div>
                )}
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}
