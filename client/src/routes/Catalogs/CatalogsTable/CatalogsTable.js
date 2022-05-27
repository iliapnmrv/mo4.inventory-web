import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import { EditingState } from "@devexpress/dx-react-grid";
import $api from "http";
import useNotification from "hooks/useNotification";
import Dialog from "components/Dialog/Dialog";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";

const getRowId = (row) => row.id;

export default function CatalogsTable({ name, data }) {
  const dispatch = useNotification();

  const tableMessages = {
    noData: "Нет данных",
  };
  const editColumnMessages = {
    addCommand: "Добавить",
    editCommand: "Изменить",
    deleteCommand: "Удалить",
    commitCommand: "Сохранить",
    cancelCommand: "Отменить",
  };

  const [columns] = useState([
    { name: `${name}_id`, title: "ID" },
    { name: `${name}_name`, title: "Наименование" },
  ]);
  const [tableColumnExtensions] = useState([{ columnName: "id", width: 60 }]);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteModalInfo, setDeleteModalInfo] = useState([]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(rows);
  }, [data]);

  const changeAddedRows = (value) => {
    const initialized = value.map((row) =>
      Object.keys(row).length
        ? row
        : {
            [`${name}_id`]:
              +rows.reduce((acc, curr) => (acc.id > curr.id ? acc : curr))[
                `${name}_id`
              ] + 1,
          }
    );
    setAddedRows(initialized);
  };

  const commitChanges = async ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0
          ? rows.reduce((acc, curr) => (acc.id > curr.id ? acc : curr)).id + 1
          : 0;

      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
      const addedData = [
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
      const addedRes = await $api
        .post(`catalogs/${name}/${addedData[0][`${name}_id`]}`, {
          [name]: addedData[0][`${name}_name`],
        })
        .then(({ data }) => data);

      dispatch({
        type: "SUCCESS",
        message: `Создана новая позиция в справочнике`,
      });
    }
    if (changed) {
      changedRows = data.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
      const changedData = data
        .map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : null))
        .filter((n) => n);
      if (changedData.length) {
        const changesRes = await $api
          .post(`catalogs/${name}/${changedData[0][`${name}_id`]}`, {
            [name]: changedData[0][`${name}_name`],
          })
          .then(({ data }) => data);
        dispatch({
          type: "SUCCESS",
          message: `Информация изменена`,
        });
      }
    }
    if (deleted) {
      const { data: catalogsAttached } = await $api.get(
        `catalogs/checkCatalog/${name}/${
          rows.filter((row) => row.id === deleted[0])?.[0]?.[`${name}_id`]
        }`
      );
      if (catalogsAttached.length) {
        setDeleteModalInfo(catalogsAttached);
      } else {
        setDeleteDialogVisible(true);
        setDeleteId(deleted);
      }

      changedRows = rows;
    }
    setRows(changedRows);
  };

  const deleteItem = async () => {
    const deletedSet = new Set(deleteId);
    const changedRows = rows.filter((row) => !deletedSet.has(row.id));
    const deletedRow = rows.filter((row) => deletedSet.has(row.id));
    const deleteRes = await $api
      .delete(`catalogs/${name}/${deletedRow[0][`${name}_id`]}`)
      .then(({ data }) => data);
    dispatch({
      type: "SUCCESS",
      message: `${deleteRes}`,
    });
    setDeleteDialogVisible(false);
    setRows(changedRows);
  };

  return (
    <>
      <Dialog
        visible={deleteDialogVisible}
        action={() => deleteItem()}
        close={() => setDeleteDialogVisible(false)}
        timesButton={() => setDeleteDialogVisible(false)}
        dialogType="deleteCatalog"
      />
      <Modal
        visible={deleteModalInfo.length}
        close={() => setDeleteModalInfo([])}
        header="Данная позиция отмечена в следующих тмц"
        doNotCheckForChanges
      >
        <>
          <p>
            Чтобы удалить позицию в справочнике, на нее не должны быть отмечены
            тмц
          </p>
          <table>
            <thead>
              <th>№</th>
              <th>Номер QR</th>
            </thead>
            <tbody>
              {deleteModalInfo.map((info, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{info?.[`${name}_qr`]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button text="Понятно" action={() => setDeleteModalInfo([])} />
        </>
      </Modal>
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            width={250}
            messages={editColumnMessages}
          />
        </Grid>
      </Paper>
    </>
  );
}
