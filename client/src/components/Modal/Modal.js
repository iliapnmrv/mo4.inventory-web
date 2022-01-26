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
  action,
  comparisonObject,
}) {
  const dispatchModal = useDispatch();

  const {
    saveDialog: { visible: dialogVisible },
  } = useSelector((state) => state.modal);
  const { initialItemData } = useSelector((state) => state.total);

  const toggleDialog = () => {
    dispatchModal(toggleSaveDialog({ visible: !dialogVisible }));
  };

  const closeEverything = () => {
    toggleDialog();
    close();
  };

  const closeModal = () => {
    if (doNotCheckForChanges) {
      close();
      return;
    }
    if (checkForChanges()) {
      toggleDialog();
    } else {
      close();
    }
  };

  const checkForChanges = () => {
    console.log(JSON.stringify(comparisonObject));
    console.log(JSON.stringify(initialItemData));
    if (JSON.stringify(initialItemData) === JSON.stringify(comparisonObject)) {
      console.log("Объекты одинаковы");
      return false;
    }
    return true;
  };

  return visible ? (
    <>
      <Dialog
        visible={dialogVisible}
        action={action}
        close={closeEverything}
        timesButton={toggleDialog}
        dialogType="save"
      />

      <div
        className="md-container modal"
        onClick={(e) =>
          e.target.className === "md-container modal" ? closeModal() : null
        }
      >
        <div className="md-modal">
          <div className="modal-header">
            <h2>{header}</h2>
            <div className="close-btn" onClick={closeModal}>
              &times;
            </div>
          </div>
          <div className="md-content">{children}</div>
        </div>
      </div>
    </>
  ) : null;
}
