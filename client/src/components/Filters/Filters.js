import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "hooks/useFetch";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import usePostFetch from "hooks/usePostFetch";
import Button from "components/Button/Button";
import SelectInput from "components/Form/Select/Select";
import { SERVER } from "constants/constants";
import "./Filters.css";

export default function Filters(props) {
  const dispatchTotal = useDispatch();

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
    `${SERVER}api/types`
  );
  const { data: fetchSredstva, isPending: isPendingSredstva } = useFetch(
    `${SERVER}api/sredstva`
  );
  const { data: fetchStatuses, isPending: isPendingStatuses } = useFetch(
    `${SERVER}api/statuses`
  );
  const { data: fetchPersons, isPending: isPendingPersons } = useFetch(
    `${SERVER}api/persons`
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
    let filters = { sredstvo, type_id, status, person };
    let query = "";
    for (const key in filters) {
      for (let i = 0; i < filters[key].length; i++) {
        const value = filters[key][i];
        query = `${query}${key}=${value}&`;
      }
    }
    const { message: filteredData, isSuccess: filteredSuccess } =
      await fetchData(`${SERVER}api/total/filter?${query.slice(0, -1)}`);
    console.log(filteredData);
    dispatchTotal({ type: "CHANGE_TOTAL_DATA", payload: filteredData });
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
        <Button text="Отфильтровать" style="info" action={handleFilter} />
      </div>
    </>
  );
}
