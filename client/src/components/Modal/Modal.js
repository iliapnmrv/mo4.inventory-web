import React, { useState, useEffect } from "react";
import Input from "../Form/Input/Input";
import SelectInput from "../Form/Select/Select";
import "./Modal.css";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import usePostFetch from "../../hooks/usePostFetch";
import useNotification from "../../hooks/useNotification";

export default function Modal(props) {
  const [types, setTypes] = useState();
  const [sredstva, setSredstva] = useState();
  const [statuses, setStatuses] = useState();
  const [persons, setPersons] = useState();
  const [typesDefault, setTypesDefault] = useState();
  const [sredstvaDefault, setSredstvaDefault] = useState();
  const [statusesDefault, setStatusesDefault] = useState();
  const [personsDefault, setPersonsDefault] = useState();

  const fetchData = usePostFetch();
  const dispatch = useNotification();

  const {
    values: {
      qr,
      name,
      sredstvo,
      type_id,
      month,
      year,
      model,
      sernom,
      info,
      status,
      person,
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
  });

  const { data: fetchTypes, isPending: isPendingTypes } = useFetch(
    "http://localhost:8000/api/types"
  );
  const { data: fetchSredstva, isPending: isPendingSredstva } = useFetch(
    "http://localhost:8000/api/sredstva"
  );
  const { data: fetchStatuses, isPending: isPendingStatuses } = useFetch(
    "http://localhost:8000/api/statuses"
  );

  const { data: fetchPersons, isPending: isPendingPersons } = useFetch(
    "http://localhost:8000/api/persons"
  );

  useEffect(() => {
    setTypes(
      fetchTypes.map((row) => ({
        label: `${row.type_id} - ${row.type_name}`,
        value: row.type_id,
      }))
    );
    setSredstva(
      fetchSredstva.map((row) => ({
        label: `${row.sredstvo_id} - ${row.sredstvo_name}`,
        value: row.sredstvo_id,
      }))
    );
    setStatuses(
      fetchStatuses.map((row) => ({
        label: `${row.status_id} - ${row.status_name}`,
        value: row.status_id,
      }))
    );
    setPersons(
      fetchPersons.map((row) => ({
        label: `${row.person_id} - ${row.person_name}`,
        value: row.person_id,
      }))
    );
  }, [fetchTypes, fetchSredstva, fetchStatuses, fetchPersons]);

  const getDefault = async (value, obj, name) => {
    var itemId = `${name}_id`;
    var itemName = `${name}_name`;
    let res;
    obj.forEach((elem) => {
      if (elem[itemId] === value) {
        res = {
          label: `${value} - ${elem[itemName]}`,
          value: value,
        };
        return;
      }
    });
    return res;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { message: updatedTotal, isSuccess: updatedTotalSuccess } =
        await fetchData(
          `http://localhost:8000/api/total/${props.editId}`,
          {
            qr,
            name,
            sredstvo,
            type_id,
            month,
            year,
            model,
            sernom,
          },
          "PUT"
        );
      const { message: updatedInfo, isSuccess: updatedInfoSuccess } =
        await fetchData(`http://localhost:8000/api/info/${props.editId}`, {
          info,
        });
      const { message: updatedStatus, isSuccess: updatedStatusSuccess } =
        await fetchData(`http://localhost:8000/api/status/${props.editId}`, {
          status,
        });
      const { message: updatedPerson, isSuccess: updatedPersonSuccess } =
        await fetchData(`http://localhost:8000/api/person/${props.editId}`, {
          person,
        });
      dispatch({
        type: "SUCCESS",
        message: updatedTotal,
        title: "Успешно",
      });
      props.closeModal();
      let obj = { qr, name, sredstvo, type_id, month, year, model, sernom };
      let filtered = props.total.filter((data) => {
        return data.qr !== props.editId;
      });
      let newArr = [...filtered, obj];
      function sortArr(arr) {
        return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
      }
      sortArr(newArr);
      props.setTotal(newArr);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/total/${props.editId}`
      );
      const jsonData = await response.json();
      setDefault(...jsonData);
      getDefault(jsonData[0].type_id, fetchTypes, "type").then((res) =>
        setTypesDefault(res)
      );
      getDefault(jsonData[0].sredstvo, fetchSredstva, "sredstvo").then((res) =>
        setSredstvaDefault(res)
      );
      if (jsonData[0].status) {
        getDefault(jsonData[0].status, fetchStatuses, "status").then((res) =>
          setStatusesDefault(res)
        );
      } else {
        setStatusesDefault("Not found", fetchPersons);
      }
      if (jsonData[0].person) {
        getDefault(jsonData[0].person, fetchPersons, "person").then((res) =>
          setPersonsDefault(res)
        );
      } else {
        setPersonsDefault("Not found");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    setStatusesDefault("");
    setSredstvaDefault("");
    setTypesDefault("");
    getData();
  }, [props.open]);

  //   console.log(statusesDefault);

  const deleteItem = async () => {
    try {
      const { message: deleteMessage, isSuccess: deleteSuccess } =
        await fetchData(
          `http://localhost:8000/api/total/${props.editId}`,
          { status },
          "DELETE"
        );

      dispatch({
        type: "SUCCESS",
        message: deleteMessage,
        title: "Успех",
      });
      props.closeModal();
      props.setTotal(
        props.total.filter((data) => {
          return data.qr !== props.editId;
        })
      );
    } catch (e) {
      console.error(e.message);
    }
  };

  return props.visible ? (
    <>
      <div
        className="modal-container"
        onClick={(e) =>
          e.target.className === "modal-container" ? props.closeModal() : null
        }
      >
        <div className="md-modal">
          <div className="md-content">
            <h2>Изменить информацию о позиции с QR номером: {props.editId}</h2>
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
                    name="type_id"
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
                <input
                  type="submit"
                  className="btn success"
                  onClick={(e) => onSubmitForm(e)}
                  value="Сохранить"
                />
                <input
                  type="button"
                  className="btn warning"
                  onClick={() => deleteItem(qr)}
                  value="Удалить"
                />
              </div>
            </form>
            <div className="close-btn" onClick={props.closeModal}>
              &times;
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
