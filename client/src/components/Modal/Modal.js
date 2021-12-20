import Dialog from "components/Dialog/Dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OnItemInfoFormSubmit from "routes/ItemInfo/onItemInfoFormSubmit";

export default function Modal({ visible, close, header, children }) {
  const onFormSubmit = OnItemInfoFormSubmit();
  const dispatchModal = useDispatch();
  const { itemValues } = useSelector((state) => state.total);

  const {
    saveDialog: { visible: dialogVisible },
  } = useSelector((state) => state.modal);

  const handleDialogToggle = () => {
    dispatchModal({
      type: "TOGGLE_SAVE_DIALOG",
      payload: {
        visible: !dialogVisible,
      },
    });
  };
  const dialogCloseHandle = () => {
    close();
    dispatchModal({
      type: "TOGGLE_SAVE_DIALOG",
      payload: {
        visible: !dialogVisible,
      },
    });
  };

  const saveData = (e) => {
    e.preventDefault();
    onFormSubmit(close, itemValues);
    dispatchModal({
      type: "TOGGLE_SAVE_DIALOG",
      payload: {
        visible: !dialogVisible,
      },
    });
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
        onClick={(e) =>
          e.target.className === "md-container modal"
            ? handleDialogToggle()
            : null
        }
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
