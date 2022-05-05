import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import $api from "http";
import CatalogsTable from "./CatalogsTable/CatalogsTable";
import "./Catalogs.sass";

export default function Catalogs() {
  const [statuses, setStatuses] = useState([]);
  const [owners, setOwners] = useState([]);
  const [storages, setStorages] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const statuses = await $api
        .get(`catalogs/statuses`)
        .then(({ data }) => data);
      setStatuses(statuses);
      const owners = await $api.get(`catalogs/owners`).then(({ data }) => data);
      setOwners(owners);
      const storages = await $api
        .get(`catalogs/storages`)
        .then(({ data }) => data);
      setStorages(storages);
      const persons = await $api
        .get(`catalogs/persons`)
        .then(({ data }) => data);
      setPersons(persons);
    };
    getData();
  }, []);

  return (
    <>
      <div className="catalogs">
        <Tabs>
          <TabList>
            <Tab>Статусы</Tab>
            <Tab>Пользователи</Tab>
            <Tab>Места хранения</Tab>
            <Tab>МОЛы</Tab>
          </TabList>
          <TabPanel>
            <h2>Статусы</h2>
            <CatalogsTable name="status" data={statuses} />
          </TabPanel>
          <TabPanel>
            <h2>Пользователи</h2>
            <CatalogsTable name="owner" data={owners} />
          </TabPanel>
          <TabPanel>
            <h2>Места хранения</h2>
            <CatalogsTable name="storage" data={storages} />
          </TabPanel>
          <TabPanel>
            <h2>МОЛы</h2>
            <CatalogsTable name="person" data={persons} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
