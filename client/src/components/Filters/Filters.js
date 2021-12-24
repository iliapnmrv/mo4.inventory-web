import React from "react";
import { useDispatch } from "react-redux";
import useForm from "hooks/useForm";
import Button from "components/Button/Button";
import SelectInput from "components/Form/Select/Select";
import { useSelector } from "react-redux";
import $api from "http/index.js";

export default function Filters({ close }) {
  const { storages, statuses, sredstva, persons, types } = useSelector(
    (state) => state.info
  );
  const dispatchTotal = useDispatch();

  const {
    values: { sredstvo, type, status, person, storage },
    selectChangeHandler,
  } = useForm({
    sredstvo: "",
    type: "",
    status: "",
    person: "",
    storage: "",
  });

  const handleFilter = async () => {
    let filters = { sredstvo, type, status, person, storage };
    let query = "";
    for (const key in filters) {
      for (let i = 0; i < filters[key].length; i++) {
        const value = filters[key][i];
        query = `${query}${key}=${value}&`;
      }
    }
    close();

    const filteredData = await $api
      .post(`total/filter?${query.slice(0, -1)}`)
      .then(({ data }) => data);
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
            name="type"
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
          <SelectInput
            multi={true}
            span="Выберите место хранения"
            name="storage"
            data={storages}
            onSelectChange={selectChangeHandler}
            required={false}
          />
        </div>
        <Button text="Отфильтровать" style="info" action={handleFilter} />
      </div>
    </>
  );
}
