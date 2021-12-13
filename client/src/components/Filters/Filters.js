import React from "react";
import { useDispatch } from "react-redux";
import useForm from "hooks/useForm";
import usePostFetch from "hooks/usePostFetch";
import Button from "components/Button/Button";
import SelectInput from "components/Form/Select/Select";
import { SERVER } from "constants/constants";
import { useSelector } from "react-redux";

export default function Filters({ close }) {
  const { storages, statuses, sredstva, persons, types } = useSelector(
    (state) => state.info
  );
  const dispatchTotal = useDispatch();
  const fetchData = usePostFetch();
  const {
    values: { sredstvo, type_id, status, person, storage },
    selectChangeHandler,
  } = useForm({
    sredstvo: "",
    type_id: "",
    status: "",
    person: "",
    storage: "",
  });

  const handleFilter = async () => {
    let filters = { sredstvo, type_id, status, person, storage };
    let query = "";
    for (const key in filters) {
      for (let i = 0; i < filters[key].length; i++) {
        const value = filters[key][i];
        query = `${query}${key}=${value}&`;
      }
    }
    close();
    const { message: filteredData, isSuccess: filteredSuccess } =
      await fetchData(`${SERVER}api/total/filter?${query.slice(0, -1)}`);
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
