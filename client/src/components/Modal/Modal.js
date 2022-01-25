import Dialog from "components/Dialog/Dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OnItemInfoFormSubmit from "routes/ItemInfo/onItemInfoFormSubmit";
import { toggleSaveDialog } from "store/actions/modalAction";

export default function Modal({
  visible,
  close,
  header,
  children,
  doNotCheckForChanges = false,
}) {
  const onFormSubmit = OnItemInfoFormSubmit();
  const dispatchModal = useDispatch();

  const {
    saveDialog: { visible: dialogVisible },
  } = useSelector((state) => state.modal);
  const { data, initialItemData, itemValues } = useSelector(
    (state) => state.total
  );

  const handleDialogToggle = () => {
    dispatchModal(toggleSaveDialog({ visible: !dialogVisible }));
  };
  const dialogCloseHandle = () => {
    // close();
    dispatchModal(toggleSaveDialog({ visible: !dialogVisible }));
  };

  const saveData = (e) => {
    e.preventDefault();
    onFormSubmit(close);
    dispatchModal(toggleSaveDialog({ visible: !dialogVisible }));
  };

  const checkForChanges = () => {
    let newItemData = itemValues;
    console.log("here");
    if (JSON.stringify(initialItemData) === JSON.stringify(newItemData)) {
      return false;
    }
    return true;
  };

  return visible ? (
    <>
      <Dialog
        visible={dialogVisible}
        action={saveData}
        close={dialogCloseHandle}
        timesButton={handleDialogToggle}
        dialogType="save"
      />

      <div
        className="md-container modal"
        onClick={(e) => {
          if (
            e.target.className === "md-container modal" &&
            doNotCheckForChanges === true
          ) {
            close();
          } else if (
            e.target.className === "md-container modal" &&
            checkForChanges() === false
          ) {
            close();
          } else if (
            e.target.className === "md-container modal" &&
            checkForChanges() === true
          ) {
            handleDialogToggle();
          }
        }}
      >
        <div className="md-modal">
          <div className="modal-header">
            <h2>{header}</h2>
            <div className="close-btn" onClick={close}>
              &times;
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  ) : null;
}
