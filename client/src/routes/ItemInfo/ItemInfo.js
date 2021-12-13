import React, { useState, useEffect } from "react";
import Input from "components/Form/Input/Input";
import SelectInput from "components/Form/Select/Select";
import useForm from "hooks/useForm";
import usePostFetch from "hooks/usePostFetch";
import useNotification from "hooks/useNotification";
import Loading from "components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { SERVER, LOGS_CATALOG } from "constants/constants";
import Button from "components/Button/Button";
import QRcode from "qrcode.react";

export default function ItemInfo({ close, editId }) {
  const { storages, statuses, sredstva, persons, types } = useSelector(
    (state) => state.info
  );
  const { username } = useSelector((state) => state.user);
  const { data, initialItemData } = useSelector((state) => state.total);
  const dispatchTotal = useDispatch();

  const [isPending, setIsPending] = useState(true);
  const [logs, setLogs] = useState([]);
  const [typesDefault, setTypesDefault] = useState();
  const [sredstvaDefault, setSredstvaDefault] = useState();
  const [statusesDefault, setStatusesDefault] = useState();
  const [personsDefault, setPersonsDefault] = useState();
  const [storagesDefault, setStoragesDefault] = useState();

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
    },
    changeHandler,
    selectChangeHandler,
    setDefault,
  } = useForm({
    qr: "",
    name: "",
    sredstvo: "",
    type_id: "",
    month: "",
    year: "",
    model: "",
    sernom: "",
    info: "",
    status: "",
    person: "",
    storage: "",
  });

  const getDefault = async (value, obj) => {
    return obj.filter((el) => el["value"] === value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let newItemData = {
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
      };

      if (JSON.stringify(initialItemData) === JSON.stringify(newItemData)) {
        dispatch({
          type: "SUCCESS",
          message: "Информация не была изменена",
        });
        close();
        return;
      }

      const { message: updatedTotal, isSuccess: updatedTotalSuccess } =
        await fetchData(
          `${SERVER}api/total/${editId}`,
          {
            qr,
            name,
            sredstvo,
            type,
            month,
            year,
            model,
            sernom,
          },
          "PUT"
        );
      let updatedData = Object.keys(newItemData).reduce((diff, key) => {
        if (initialItemData[key] === newItemData[key]) return diff;
        return {
          ...diff,
          [key]: newItemData[key],
        };
      }, {});
      let logs = "";
      for (const key in updatedData) {
        logs = ` ${logs} ${LOGS_CATALOG[key]}: ${initialItemData[key]} -> ${updatedData[key]},`;
      }

      const { message: updatedLogs, isSuccess: updatedLogsSuccess } =
        await fetchData(`${SERVER}api/logs/`, {
          qr,
          user: username,
          text: logs.slice(0, -1),
        });
      const { message: updatedInfo, isSuccess: updatedInfoSuccess } =
        await fetchData(`${SERVER}api/info/${editId}`, {
          info,
        });
      const { message: updatedStatus, isSuccess: updatedStatusSuccess } =
        await fetchData(`${SERVER}api/status/${editId}`, {
          status,
        });
      console.log(person);
      const { message: updatedPerson, isSuccess: updatedPersonSuccess } =
        await fetchData(`${SERVER}api/person/${editId}`, {
          person,
        });
      const { message: updatedStorage, isSuccess: updatedStorageSuccess } =
        await fetchData(`${SERVER}api/storage/${editId}`, {
          storage,
        });
      close();

      dispatch({
        type: "SUCCESS",
        message: updatedTotal,
        title: "Успешно",
      });

      let newItem = { qr, name, sredstvo, type, month, year, model, sernom };

      let filtered = data.filter((data) => {
        return data.qr !== editId;
      });
      let newArr = [...filtered, newItem];
      sortArr(newArr);
      dispatchTotal({ type: "CHANGE_TOTAL_DATA", payload: newArr });
    } catch (e) {
      console.error(e.message);
    }
  };

  function sortArr(arr) {
    return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
  }

  const getData = async () => {
    try {
      setIsPending(true);
      const item = await fetch(`${SERVER}api/total/${editId}`).then((res) =>
        res.json()
      );

      dispatchTotal({
        type: "INITIAL_ITEM_DATA",
        payload: item,
      });

      fetch(`${SERVER}api/logs/${editId}`)
        .then((res) => res.json())
        .then((data) => setLogs(data))
        .finally(setIsPending(false));

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

      console.log(item.person);
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
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    setStatusesDefault("");
    setSredstvaDefault("");
    setTypesDefault("");
    setStoragesDefault("");
    getData();
  }, []);

  const deleteItem = async () => {
    try {
      const { message: deleteMessage, isSuccess: deleteSuccess } =
        await fetchData(`${SERVER}api/total/${editId}`, { status }, "DELETE");
      const { message: deleteLogMessage, isSuccess: deleteLogSuccess } =
        await fetchData(`${SERVER}api/logs/${editId}`, {}, "DELETE");

      dispatch({
        type: "SUCCESS",
        message: deleteMessage,
        title: "Успех",
      });
      close();
      dispatchTotal({
        type: "CHANGE_TOTAL_DATA",
        payload: data.filter((data) => {
          return data.qr !== editId;
        }),
      });
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <div className="md-content">
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className="form-inputs">
              <Input
                span="Введите номер QR кода"
                name="qr"
                type="number"
                value={qr}
                onChange={changeHandler}
              />
              <Input
                span="Введите наименование"
                name="name"
                value={name}
                onChange={changeHandler}
              />
            </div>
            <div className="form-inputs">
              {typesDefault ? (
                <SelectInput
                  span="Выберите тип"
                  name="type"
                  data={types}
                  default={typesDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {sredstvaDefault ? (
                <SelectInput
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
                  span="Выберите статус"
                  name="status"
                  data={statuses}
                  default={statusesDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {statusesDefault === "Not found" ? (
                <SelectInput
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
                  span="Выберите МОЛ"
                  name="person"
                  data={persons}
                  default={personsDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {personsDefault === "Not found" ? (
                <SelectInput
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
                  span="Выберите место хранения"
                  name="storage"
                  data={storages}
                  default={storagesDefault}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              {storagesDefault === "Not found" ? (
                <SelectInput
                  span="Выберите место хранения"
                  name="storage"
                  data={storages}
                  onSelectChange={selectChangeHandler}
                />
              ) : null}
              <Input
                span="Месяц ввода"
                type="number"
                name="month"
                value={month}
                onChange={changeHandler}
              />
              <Input
                span="Год ввода в эксплуатацию"
                type="number"
                name="year"
                value={year}
                onChange={changeHandler}
              />
            </div>
            <div className="form-inputs">
              <Input
                span="Модель"
                name="model"
                value={model}
                onChange={changeHandler}
              />
              <Input
                span="Серийный номер"
                name="sernom"
                value={sernom}
                onChange={changeHandler}
              />
            </div>
            <Input
              span="Информация о предмете"
              name="info"
              value={info}
              onChange={changeHandler}
            />
            <div className="buttons">
              <Button
                text="Сохранить"
                type="submit"
                action={(e) => onSubmitForm(e)}
              />
              <Button
                text="Удалить"
                style="warning"
                action={() => deleteItem(qr)}
              />
            </div>
          </form>

          <div className="qr">
            <QRcode
              value={`${sredstvo}${("0" + type).slice(
                -2
              )}${month}${year}${qr}\n${name}\n${model}\n${sernom}`}
            />
          </div>

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
                          <td> {index + 1}</td>
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
        </div>
      )}
    </div>
  );
}
