import React from "react";
import { useDispatch } from "react-redux";
import useForm from "hooks/useForm";
import Button from "components/Button/Button";
import SelectInput from "components/Form/Select/Select";
import { useSelector } from "react-redux";
import $api from "http/index.js";
import { changeTotalData } from "store/actions/totalAction";
import { useEffect } from "react";

export default function Filters() {
  const { storages, statuses, sredstva, persons, types, owners } = useSelector(
    (state) => state.info
  );
  const { filters } = useSelector((state) => state.total);
  const dispatchTotal = useDispatch();

  const { filtersChangeHandler } = useForm();

  const filterData = async () => {
    console.log(filters);
    let query = "";
    for (const key in filters) {
      for (let i = 0; i < filters[key].length; i++) {
        const value = filters[key][i];
        query = `${query}${key}=${value}&`;
      }
    }
    const filteredData = await $api
      .post(`total/filter?${query.slice(0, -1)}`)
      .then(({ data }) => data);
    console.log(filteredData);
    dispatchTotal(changeTotalData(filteredData));
  };

  const handleFilter = async () => {
    filterData();
  };

  useEffect(() => {
    filterData();
  }, [filters]);

  return (
    <>
      <div className="filters-wrapper">
        <div className="filters">
          <SelectInput
            multi={true}
            span="Выберите тип устройства"
            name="type"
            data={types}
            onSelectChange={filtersChangeHandler}
            required={false}
            selectValue={filters.type}
          />
          <SelectInput
            multi={true}
            span="Выберите средство устройства"
            name="sredstvo"
            data={sredstva}
            onSelectChange={filtersChangeHandler}
            required={false}
            selectValue={filters.sredstvo}
          />
          <SelectInput
            multi={true}
            span="Выберите статус"
            name="status"
            data={statuses}
            onSelectChange={filtersChangeHandler}
            required={false}
            selectValue={filters.status}
          />
          <SelectInput
            multi={true}
            span="Выберите МОЛ"
            name="person"
            data={persons}
            onSelectChange={filtersChangeHandler}
            required={false}
            selectValue={filters.person}
          />
          <SelectInput
            multi={true}
            span="Выберите владельца"
            name="owner"
            data={owners}
            onSelectChange={filtersChangeHandler}
            required={false}
            selectValue={filters.owner}
          />
          <SelectInput
            multi={true}
            span="Выберите место хранения"
            name="storage"
            data={storages}
            onSelectChange={filtersChangeHandler}
            required={false}
            selectValue={filters.storage}
          />
        </div>
        <Button text="Отфильтровать" style="info" action={handleFilter} />
      </div>
    </>
  );
}
