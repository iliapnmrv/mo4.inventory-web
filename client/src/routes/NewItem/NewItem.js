import React, { useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import SelectInput from "components/Form/Select/Select";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import { useDispatch, useSelector } from "react-redux";
import QR from "components/QR/QR";
import $api from "http/index.js";
import { changeTotalData } from "store/actions/totalAction";

export default function NewItem({ close }) {
  const { storages, statuses, sredstva, persons, types, owners } = useSelector(
    (state) => state.info
  );
  const { login, role } = useSelector((state) => state.user.username);
  const { data, initialItemData } = useSelector((state) => state.total);
  const dispatchTotal = useDispatch();
  const [sernomExists, setSernomExists] = useState(false);

  const dispatch = useNotification();

  const {
    values: {
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
    changeHandler,
    selectChangeHandler,
  } = useForm({
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
  });

  console.log(initialItemData);
  console.log({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await $api
        .get(`total/checkSerialNum/${sernom}`)
        .then(({ data }) => data);
      setSernomExists(fetchedData);
    };
    fetchData();
  }, [sernom]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      close();
      const newItemMessage = await $api
        .post(`total`, {
          qr,
          name,
          sredstvo,
          type,
          month,
          year,
          model,
          sernom,
        })
        .then(({ data }) => data);
      const newInfoMessage = await $api
        .post(`info/${qr}`, {
          info,
        })
        .then(({ data }) => data);

      const newStatusMessage = await $api
        .post(`status/${qr}`, {
          status,
        })
        .then(({ data }) => data);

      const newPersonMessage = await $api
        .post(`person/${qr}`, {
          person,
        })
        .then(({ data }) => data);

      const newStorageMessage = await $api
        .post(`storage/${qr}`, {
          storage,
        })
        .then(({ data }) => data);

      const newAddinfoMessage = await $api
        .post(`addinfo/${qr}`, {
          addinfo,
        })
        .then(({ data }) => data);

      const newOwnerMessage = await $api
        .post(`owner/${qr}`, {
          owner,
        })
        .then(({ data }) => data);

      const newLogMessage = await $api
        .post(`logs`, {
          qr,
          user: login,
          text: "Предмет создан",
        })
        .then(({ data }) => data);

      dispatch({
        type: "SUCCESS",
        message: newItemMessage,
        title: "Успешно",
      });

      let newItem = { qr, name, sredstvo, type, month, year, model, sernom };
      let newArr = [...data, newItem];

      sortArr(newArr);
      dispatchTotal(changeTotalData(newArr));
    } catch (e) {
      console.error(e.message);
    }
  };

  function sortArr(arr) {
    return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
  }

  return (
    <>
      {data[data.length - 1]?.qr && (
        <p className="table-info">
          Последняя позиция QR : {data[data.length - 1]?.qr}
        </p>
      )}
      <div className="new_item__form">
        <form className="form" id="newItem" onSubmit={(e) => onSubmitForm(e)}>
          <div className="form-inputs">
            <SelectInput
              required
              span="Выберите тип устройства"
              name="type"
              data={types}
              onSelectChange={selectChangeHandler}
              onSelectReset={type}
            />
            <SelectInput
              required
              span="Выберите средство"
              name="sredstvo"
              data={sredstva}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="Выберите статус"
              name="status"
              data={statuses}
              onSelectChange={selectChangeHandler}
            />
          </div>
          <div className="form-inputs">
            <SelectInput
              required
              span="Выберите МОЛ"
              name="person"
              data={persons}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="Выберите владельца"
              name="owner"
              data={owners}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              required
              span="Выберите местоположение"
              name="storage"
              data={storages}
              onSelectChange={selectChangeHandler}
            />
          </div>
          <div className="form-inputs">
            <Input
              span="Введите номер QR кода"
              name="qr"
              type="number"
              value={qr}
              onChange={changeHandler}
              formName="newItem"
            />
            <Input
              span="Наименование по бухучету"
              name="name"
              value={name}
              onChange={changeHandler}
              formName="newItem"
            />
            <Input
              span="Месяц ввода"
              type="number"
              name="month"
              max="12"
              value={month}
              onChange={changeHandler}
              formName="newItem"
            />
          </div>
          <div className="form-inputs">
            <Input
              span="Год ввода в эксплуатацию"
              type="number"
              name="year"
              value={year}
              max="40"
              onChange={changeHandler}
              formName="newItem"
            />
            <Input
              span="Модель реальная"
              name="model"
              value={model}
              onChange={changeHandler}
              formName="newItem"
            />

            <Input
              span="Серийный номер"
              name="sernom"
              value={sernom}
              onChange={changeHandler}
              formName="newItem"
            >
              {sernomExists && (
                <span className="input-comment">
                  Данный серийный номер уже используется
                </span>
              )}
            </Input>
          </div>
          <div className="form-inputs">
            <Input
              span="Примечания"
              name="info"
              required={false}
              value={info}
              onChange={changeHandler}
              formName="newItem"
            />
          </div>
          <div className="form-inputs">
            <Input
              span="Дополнительная информация (ip, логин, пароль)"
              name="addinfo"
              required={false}
              value={addinfo}
              onChange={changeHandler}
              formName="newItem"
            />
          </div>
          <button className="btn success" type="submit">
            Добавить
          </button>
        </form>
        <QR
          month={month}
          year={year}
          name={name}
          qr={qr}
          model={model}
          sernom={sernom}
          sredstvo={sredstvo}
          type={type}
        />
      </div>
    </>
  );
}
