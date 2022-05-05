import Input from "components/Form/Input/Input";
import $api from "http";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import "./Analysis.sass";
import TableHeader from "./TableHeader/TableHeader";

export default function Analysis() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [analysis, setAnalysis] = useState([]);

  console.log(analysis);
  console.log(search);

  useEffect(() => {
    const getAnalysis = async () => {
      const invAnalysis = await $api.get(`analysis`).then(({ data }) => data);
      console.log(invAnalysis);
      setAnalysis(invAnalysis);
    };
    getAnalysis();
  }, []);

  console.log(analysis.length);

  return (
    <>
      <Input
        span="Поиск по наименованию"
        onChange={handleSearch}
        value={search}
        name="search"
        required={false}
      />
      <Tabs>
        <TabList>
          <Tab>Все данные</Tab>
          <Tab>Не хватает</Tab>
          <Tab>Лишнее</Tab>
          <Tab>Не в учете</Tab>
        </TabList>
        <TabPanel>
          <h2>Все данные</h2>
          <table>
            <TableHeader />
            {analysis.length ? (
              <tbody>
                {analysis
                  .filter((item) => {
                    return item.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.kolvo}</td>
                        <td>{item.listedKolvo}</td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div>Данные отсутствуют</div>
            )}
          </table>
        </TabPanel>
        <TabPanel>
          <h2>Не хватает</h2>
          <table>
            <TableHeader />
            {analysis.length ? (
              <tbody>
                {analysis
                  .filter((item) => {
                    return item.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .filter((item) => item.kolvo < item.listedKolvo)
                  .map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.kolvo}</td>
                        <td>{item.listedKolvo}</td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div>Данные отсутствуют</div>
            )}
          </table>
        </TabPanel>
        <TabPanel>
          <h2>Лишнее</h2>
          <table>
            <TableHeader />
            {analysis.length ? (
              <tbody>
                {analysis
                  .filter((item) => {
                    return item.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .filter(
                    (item) =>
                      item.kolvo > item.listedKolvo && item.listedKolvo !== 0
                  )
                  .map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.kolvo}</td>
                        <td>{item.listedKolvo}</td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div>Данные отсутствуют</div>
            )}
          </table>
        </TabPanel>
        <TabPanel>
          <h2>Не в учете</h2>
          <table>
            <TableHeader />
            {analysis.length ? (
              <tbody>
                {analysis
                  .filter((item) => {
                    return item.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .filter((item) => item.listedKolvo === 0)
                  .map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.kolvo}</td>
                        <td>{item.listedKolvo}</td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div>Данные отсутствуют</div>
            )}
          </table>
        </TabPanel>
      </Tabs>
    </>
  );
}
