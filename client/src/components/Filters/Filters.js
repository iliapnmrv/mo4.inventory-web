import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";
import usePostFetch from "../../hooks/usePostFetch";
import SelectInput from "../Form/Select/Select";
import "./Filters.css";

export default function Filters(props) {
  const [types, setTypes] = useState([]);
  const [sredstva, setSredstva] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [persons, setPersons] = useState([]);

  const fetchData = usePostFetch();
  const dispatch = useNotification();
  const {
    values: { sredstvo, type_id, status, person },
    selectChangeHandler,
  } = useForm({
    sredstvo: "",
    type_id: "",
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

  const handleFilter = async () => {
    console.log({ sredstvo, type_id, status, person });
    let query = `sredstvo=1&person=2&type_id=1&person=1`;
    console.log(query);
    const { message: filteredMessage, isSuccess: filteredSuccess } =
      await fetchData(`http://localhost:8000/api/total/filter?${query}`);
    console.log(filteredMessage);
  };

  return (
    <>
      <div className="filters-wrapper">
        <div className="filters">
          <SelectInput
            multi={true}
            span="Выберите тип устройства"
            name="type_id"
            data={types}
            onSelectChange={selectChangeHandler}
            required={false}
          />
          <SelectInput
            multi={true}
            span="Выберите средство устройства"
            name="sredstvo"
            data={sredstva}
            onSelectChange={selectChangeHandler}
            required={false}
          />
          <SelectInput
            multi={true}
            span="Выберите статус"
            name="status"
            data={statuses}
            onSelectChange={selectChangeHandler}
            required={false}
          />
          <SelectInput
            multi={true}
            span="Выберите МОЛ"
            name="person"
            data={persons}
            onSelectChange={selectChangeHandler}
            required={false}
          />
        </div>
        <button className="filter-btn" onClick={handleFilter}>
          Отфильтровать
        </button>
      </div>
    </>
  );
}
