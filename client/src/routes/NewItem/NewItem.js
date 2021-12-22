import React, { useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import SelectInput from "components/Form/Select/Select";
import usePostFetch from "hooks/usePostFetch";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import { SERVER } from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import QR from "components/QR/QR";

export default function NewItem({ close }) {
  const { storages, statuses, sredstva, persons, types } = useSelector(
    (state) => state.info
  );
  const { login, role } = useSelector((state) => state.user.username);
  const { data } = useSelector((state) => state.total);
  const dispatchTotal = useDispatch();
  const [sernomExists, setSernomExists] = useState(false);

  const fetchData = usePostFetch();
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
  });

  useEffect(() => {
    fetch(`${SERVER}api/total/checkSerialNum/${sernom}`)
      .then((res) => res.json())
      .then((data) => {
        setSernomExists(data);
      });
  }, [sernom]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      close();
      const { message: newItemMessage, isSuccess: newItemSuccess } =
        await fetchData(`${SERVER}api/total/`, {
          qr,
          name,
          sredstvo,
          type,
          month,
          year,
          model,
          sernom,
        });
      const { message: newInfoMessage, isSuccess: newInfoSuccess } =
        await fetchData(`${SERVER}api/info/${qr}`, {
          info,
        });
      const { message: newStatusMessage, isSuccess: newStatusSuccess } =
        await fetchData(`${SERVER}api/status/${qr}`, {
          status,
        });
      const { message: newPersonMessage, isSuccess: newPersonSuccess } =
        await fetchData(`${SERVER}api/person/${qr}`, {
          person,
        });
      const { message: newStorageMessage, isSuccess: newStorageSuccess } =
        await fetchData(`${SERVER}api/storage/${qr}`, {
          storage,
        });
      const { message: newAddinfoMessage, isSuccess: newAddinfoSuccess } =
        await fetchData(`${SERVER}api/addinfo/${qr}`, {
          addinfo,
        });

      const { message: newLogMessage, isSuccess: newLogSuccess } =
        await fetchData(`${SERVER}api/logs/`, {
          qr,
          user: login,
          text: "Предмет создан",
        });

      dispatch({
        type: "SUCCESS",
        message: newItemMessage,
        title: "Успешно",
      });
      let newItem = { qr, name, sredstvo, type, month, year, model, sernom };
      let newArr = [...data, newItem];

      sortArr(newArr);
      dispatchTotal({ type: "CHANGE_TOTAL_DATA", payload: newArr });
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
              span="Выберите тип устройства"
              name="type"
              data={types}
              onSelectChange={selectChangeHandler}
              onSelectReset={type}
            />
            <SelectInput
              span="Выберите средство"
              name="sredstvo"
              data={sredstva}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
              span="Выберите статус"
              name="status"
              data={statuses}
              onSelectChange={selectChangeHandler}
            />
          </div>
          <div className="form-inputs">
            <SelectInput
              span="Выберите МОЛ"
              name="person"
              data={persons}
              onSelectChange={selectChangeHandler}
            />
            <SelectInput
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
            />
            <Input
              span="Наименование по бухучету"
              name="name"
              value={name}
              onChange={changeHandler}
            />
            <Input
              span="Месяц ввода"
              type="number"
              name="month"
              max="12"
              value={month}
              onChange={changeHandler}
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
            />
            <Input
              span="Модель реальная"
              name="model"
              value={model}
              onChange={changeHandler}
            />

            <Input
              span="Серийный номер"
              name="sernom"
              value={sernom}
              onChange={changeHandler}
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
            />
          </div>
          <div className="form-inputs">
            <Input
              span="Дополнительная информация (ip, логин, пароль)"
              name="addinfo"
              required={false}
              value={addinfo}
              onChange={changeHandler}
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