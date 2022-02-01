import React, { useState } from "react";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import { EditingState } from "@devexpress/dx-react-grid";

const getRowId = (row) => row.id;

export default function CatalogsTable({ name, data, changeData }) {
  const [columns] = useState([
    { name: `${name}_id`, title: "ID" },
    { name: `${name}_name`, title: "Наименование" },
  ]);
  const [tableColumnExtensions] = useState([{ columnName: "id", width: 60 }]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const changeAddedRows = (value) => {
    const initialized = value.map((row) =>
      Object.keys(row).length
        ? row
        : { [`${name}_id`]: data.slice(-1)[0].id + 1 }
    );
    console.log(initialized);
    setAddedRows(initialized);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      changedRows = [
        ...data,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = data.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = data.filter((row) => !deletedSet.has(row.id));
    }
    changeData(changedRows);
    console.log("changedRows", changedRows);
  };

  return (
    <Paper>
      <Grid rows={data} columns={columns} getRowId={getRowId}>
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
        />
      </Grid>
    </Paper>
  );
}
