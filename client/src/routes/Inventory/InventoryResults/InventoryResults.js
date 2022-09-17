import Input from "components/Form/Input/Input";
import $api from "http";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import "./InventoryResults.sass";
import TableHeader from "./TableHeader/TableHeader";

export default function InventoryResults() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line no-undef
  const { sredstva, types, storages, persons, owners } = useSelector(
    (state) => state.info
  );

  const [results, setResults] = useState([]);

  useEffect(() => {
    const getAnalysis = async () => {
      const invResults = await $api
        .get(`inventory/results`)
        .then(({ data }) => data);
      console.log(invResults);
      setResults(invResults);
    };
    getAnalysis();
  }, []);

  console.log(results.length);

  return (
    <>
      <Input
        span="Поиск по наименованию"
        onChange={handleSearch}
        value={search}
        name="search"
        required={false}
      />
      <table>
        <TableHeader />
        {results.length ? (
          <tbody>
            {results
              .filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((item) => {
                return (
                  <tr>
                    <td>{item.qr}</td>
                    <td>{item.name}</td>
                    <td>
                      {
                        persons.filter(
                          (person) => person.value === item.person
                        )?.[0]?.label
                      }
                    </td>
                    <td>
                      {
                        owners.filter(
                          (owner) => owner.value === item.owner
                        )?.[0]?.label
                      }
                    </td>
                    <td>
                      {
                        storages.filter(
                          (storage) => storage.value === item.storage
                        )?.[0]?.label
                      }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        ) : (
          <div>Данные отсутствуют</div>
        )}
      </table>
    </>
  );
}
