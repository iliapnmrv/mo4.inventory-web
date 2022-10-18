import Button from "components/Button/Button";
import Input from "components/Form/Input/Input";
import QR from "components/QR/QR";
import $api from "http";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import "./InventoryResults.sass";
import TableHeader from "./TableHeader/TableHeader";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import * as moment from "moment";

export default function InventoryResults() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line no-undef
  const { sredstva, types, storages, persons, owners, statuses } = useSelector(
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

  const exportToCSV = (csvData, fileName, wscols) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [
        "id",
        "qr",
        "name",
        "person",
        "status",
        "storage",
        "owner",
        "model",
        "sernom",
      ],
      skipHeader: true,
    });
    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: [
        "id",
        "qr",
        "name",
        "person",
        "status",
        "storage",
        "owner",
        "model",
        "sernom",
      ],
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const Heading = [
    {
      id: "id",
      qr: "QR",
      name: "Наименование",
      person: "МОЛ",
      status: "Статус",
      storage: "Место хранения",
      owner: "Владелец",
      model: "Модель",
      sernom: "Серийный номер",
    },
  ];

  const wscols = [
    {
      wch: 10,
    },
  ];

  return (
    <>
      <Button
        text={"Скачать инвентаризацию"}
        action={() => {
          exportToCSV(
            results.map((item) => ({
              id: item.id,
              qr: item.qr,
              name: item.name,
              person: persons.filter(
                (person) => person.value === item.person
              )?.[0]?.label,
              status: statuses.filter(
                (status) => status.value === item.status
              )?.[0]?.label,
              storage: storages.filter(
                (storage) => storage.value === item.storage
              )?.[0]?.label,
              owner: owners.filter((owner) => owner.value === item.owner)?.[0]
                ?.label,
              model: item.model,
              sernom: item.sernom,
            })),
            String(moment()),
            wscols
          );
        }}
      />
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
                return item?.name?.toLowerCase().includes(search.toLowerCase());
              })
              .map((item) => {
                return (
                  <tr key={item.id}>
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
                    <td>
                      {
                        statuses.filter(
                          (status) => status.value === item.status
                        )?.[0]?.label
                      }
                    </td>
                    <td>
                      <QR
                        month={item.month}
                        year={item.year}
                        name={item.name}
                        qr={item.qr}
                        model={item.model}
                        sernom={item.sernom}
                        sredstvo={item.sredstvo}
                        type={item.type}
                        qrOnly
                      />
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
