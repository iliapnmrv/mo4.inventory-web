import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./Form.css";
import Input from "./Input/Input";
import SelectInput from "./Select/Select";
import useFetch from "../../hooks/useFetch";
import usePostFetch from "../../hooks/usePostFetch";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";
import { useSelector } from "react-redux";

export default function Form(props) {
  const username = useSelector((state) => state.user.username);

  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [sredstva, setSredstva] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [persons, setPersons] = useState([]);

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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { message: newItemMessage, isSuccess: newItemSuccess } =
        await fetchData("http://localhost:8000/api/total/", {
          qr,
          name,
          sredstvo,
          type_id,
          month,
          year,
          model,
          sernom,
        });
      const { message: newInfoMessage, isSuccess: newInfoSuccess } =
        await fetchData(`http://localhost:8000/api/info/${qr}`, { info });
      const { message: newStatusMessage, isSuccess: newStatusSuccess } =
        await fetchData(`http://localhost:8000/api/status/${qr}`, { status });
      const { message: newPersonMessage, isSuccess: newPersonSuccess } =
        await fetchData(`http://localhost:8000/api/person/${qr}`, { person });

      const { message: newLogMessage, isSuccess: newLogSuccess } =
        await fetchData(`http://localhost:8000/api/logs/`, {
          qr,
          user: username,
          text: "Ура",
        });

      dispatch({
        type: "SUCCESS",
        message: newItemMessage,
        title: "Успех",
      });
      let obj = { qr, name, sredstvo, type_id, month, year, model, sernom };
      let newArr = [...props.total, obj];
      function sortArr(arr) {
        return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
      }
      sortArr(newArr);
      props.setTotal(newArr);
      toggleForm();
      document.getElementById("newItem").reset();
    } catch (e) {
      console.error(e.message);
    }
  };

  const toggleForm = () => {
    document.querySelector(".form").classList.toggle("slide");
    setOpen(!open);
  };

  return (
    <div>
      <div
        className="header"
        onClick={() => {
          toggleForm();
        }}
      >
        <h2>Добавить новый элемент</h2>
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} />
      </div>
      <form className="form" id="newItem" onSubmit={(e) => onSubmitForm(e)}>
        <div className="form-inputs">
          <SelectInput
            span="Выберите тип устройства"
            name="type_id"
            data={types}
            onSelectChange={selectChangeHandler}
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
          <SelectInput
            span="Выберите МОЛ"
            name="person"
            data={persons}
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
            span="Введите наименование"
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
        <div className="form-inputs">
          <Input
            span="Информация о предмете"
            name="info"
            required={false}
            value={info}
            onChange={changeHandler}
          />
        </div>
        <button className="btn success" type="submit">
          Добавить
        </button>
      </form>
    </div>
  );
}
