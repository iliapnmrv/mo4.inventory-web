import React, { useState, useEffect } from "react";
import Input from "components/Form/Input/Input";
import SelectInput from "components/Form/Select/Select";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import Loading from "components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { ACCESS_RIGHTS } from "constants/constants";
import Button from "components/Button/Button";
import QR from "components/QR/QR";
import Dialog from "components/Dialog/Dialog";
import OnItemInfoFormSubmit from "./onItemInfoFormSubmit";
import Analysis from "components/Analysis/Analysis";
import $api from "http/index.js";
import { toggleDeleteDialog } from "store/actions/modalAction";
import {
  changeInitialItemData,
  changeItemData,
  changeTotalData,
} from "store/actions/totalAction";

export default function ItemInfo({ close, editId }) {
  const { storages, statuses, sredstva, persons, types, owners } = useSelector(
    (state) => state.info
  );
  const { login, role } = useSelector((state) => state.user.username);

  const { data } = useSelector((state) => state.total);
  const {
    deleteDialog: { visible: deleteDialogVisible },
  } = useSelector((state) => state.modal);

  const dispatchTotal = useDispatch();
  const dispatchModal = useDispatch();
  const onFormSubmit = OnItemInfoFormSubmit();

  const [isPending, setIsPending] = useState(true);
  const [logs, setLogs] = useState([]);
  const [typesDefault, setTypesDefault] = useState();
  const [sredstvaDefault, setSredstvaDefault] = useState();
  const [statusesDefault, setStatusesDefault] = useState();
  const [personsDefault, setPersonsDefault] = useState();
  const [storagesDefault, setStoragesDefault] = useState();
  const [ownersDefault, setOwnersDefault] = useState();

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
      // person,
      // storage,
      addinfo,
      owner,
    },
    changeHandler,
    selectChangeHandler,
    setDefault,
  } = useForm({
    qr: "",
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

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(close);
  };

  const getDefault = async (value, obj) => {
    return obj.filter((el) => el["value"] === value);
  };

  const getData = async () => {
    try {
      const item = await $api.get(`total/${editId}`).then(({ data }) => data);
      const logsData = await $api
        .get(`logs/${editId}`)
        .then(({ data }) => data)
        .finally(setIsPending(false));
      setLogs(logsData);

      console.log(item);

      dispatchTotal(changeInitialItemData(item));

      dispatchTotal(changeItemData(item));

      setDefault(item);
      getDefault(item.type, types).then((res) => setTypesDefault(res));
      getDefault(item.sredstvo, sredstva).then((res) =>
        setSredstvaDefault(res)
      );
      if (item.status) {
        getDefault(item.status, statuses).then((res) =>
          setStatusesDefault(res)
        );
      } else {
        setStatusesDefault("Not found");
      }
      if (item.person) {
        getDefault(item.person, persons).then((res) => setPersonsDefault(res));
      } else {
        setPersonsDefault("Not found");
      }

      if (item.storage) {
        getDefault(item.storage, storages).then((res) =>
          setStoragesDefault(res)
        );
      } else {
        setStoragesDefault("Not found");
      }
      if (item.owner) {
        getDefault(item.owner, owners).then((res) => setOwnersDefault(res));
      } else {
        setOwnersDefault("Not found");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    setStatusesDefault("");
    setSredstvaDefault("");
    setTypesDefault("");
    setStoragesDefault("");
    setOwnersDefault("");
    getData();
  }, []);

  const deleteItem = async () => {
    try {
      const deleteMessage = await $api
        .delete(`total/${editId}`)
        .then(({ data }) => data);

      dispatch({
        type: "SUCCESS",
        message: deleteMessage,
        title: "Удалено",
      });
      close();
      closeDialog();
      dispatchTotal(
        changeTotalData(
          data.filter((data) => {
            return data.qr !== editId;
          })
        )
      );
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleDelete = (qr) => {
    console.log(qr);
    dispatchModal(toggleDeleteDialog({ visible: true }));
  };

  const closeDialog = () => {
    dispatchModal(toggleDeleteDialog({ visible: false }));
  };

  return (
    <div>
      <Dialog
        visible={deleteDialogVisible}
        action={deleteItem}
        close={closeDialog}
        dialogType="delete"
      />
      {isPending ? (
        <Loading />
      ) : (
        <>
          <Analysis />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-inputs">
              <Input
                disabled={ACCESS_RIGHTS[role].qr}
                span="Введите номер QR кода"
                name="qr"
                type="number"
                value={qr}
                onChange={changeHandler}
              />
              <Input
                disabled={ACCESS_RIGHTS[role].name}
                span="Введите наименование по бухучету"
                name="name"
                value={name}
                onChange={changeHandler}
              />
            </div>
            <div className="form-inputs">
              {typesDefault ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].type}
                  span="Выберите тип"
                  name="type"
                  data={types}
                  default={typesDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {sredstvaDefault ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].sredstvo}
                  span="Выберите средство"
                  name="sredstvo"
                  data={sredstva}
                  default={sredstvaDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {statusesDefault !== "Not found" &&
              statusesDefault != null &&
              statusesDefault !== "" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].status}
                  span="Выберите статус"
                  name="status"
                  data={statuses}
                  default={statusesDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {statusesDefault === "Not found" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].status}
                  span="Выберите статус"
                  name="status"
                  data={statuses}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {personsDefault !== "Not found" &&
              personsDefault != null &&
              personsDefault !== "" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].person}
                  span="Выберите МОЛ"
                  name="person"
                  data={persons}
                  default={personsDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {personsDefault === "Not found" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].person}
                  span="Выберите МОЛ"
                  name="person"
                  data={persons}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
            </div>
            <div className="form-inputs">
              {storagesDefault !== "Not found" &&
              storagesDefault != null &&
              storagesDefault !== "" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].storage}
                  span="Выберите местоположение"
                  name="storage"
                  data={storages}
                  default={storagesDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {storagesDefault === "Not found" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].storage}
                  span="Выберите местоположение"
                  name="storage"
                  data={storages}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}

              <Input
                disabled={ACCESS_RIGHTS[role].month}
                span="Месяц ввода"
                type="number"
                name="month"
                value={month}
                onChange={changeHandler}
              />
              <Input
                disabled={ACCESS_RIGHTS[role].year}
                span="Год ввода в эксплуатацию"
                type="number"
                name="year"
                value={year}
                onChange={changeHandler}
              />
            </div>
            <div className="form-inputs">
              {ownersDefault !== "Not found" &&
              ownersDefault != null &&
              ownersDefault !== "" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].owner}
                  span="Выберите владельца"
                  name="owner"
                  data={owners}
                  default={ownersDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {ownersDefault === "Not found" ? (
                <SelectInput
                  disabled={ACCESS_RIGHTS[role].owner}
                  span="Выберите владельца"
                  name="owner"
                  data={owners}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              <Input
                disabled={ACCESS_RIGHTS[role].model}
                span="Модель реальная"
                name="model"
                value={model}
                onChange={changeHandler}
              />
              <Input
                disabled={ACCESS_RIGHTS[role].sernom}
                span="Серийный номер"
                name="sernom"
                value={sernom}
                onChange={changeHandler}
              />
            </div>
            <Input
              disabled={ACCESS_RIGHTS[role].info}
              span="Примечания"
              name="info"
              value={info}
              onChange={changeHandler}
            />
            <Input
              disabled={ACCESS_RIGHTS[role].addinfo}
              span="Дополнительная информация"
              name="addinfo"
              value={addinfo}
              onChange={changeHandler}
            />
            <div className="buttons">
              <Button
                text="Сохранить"
                type="submit"
                action={(e) => onSubmit(e)}
              />
              {role === "admin" && (
                <Button
                  text="Удалить"
                  style="warning"
                  action={() => handleDelete(qr)}
                />
              )}
            </div>
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

          {logs.length ? (
            <>
              <div className="logs">
                <h3>Журнал действий</h3>
              </div>
              <div className="table">
                <table>
                  <tbody>
                    {logs.map(({ user, text, time }, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{user}</td>
                          <td>{text}</td>
                          <td>
                            {new Date(time).toLocaleTimeString([], {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
