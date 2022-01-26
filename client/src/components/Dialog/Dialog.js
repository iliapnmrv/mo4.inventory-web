import Button from "components/Button/Button";
import { DIALOGS } from "constants/constants";
import React from "react";

export default function Dialog({
  visible,
  action,
  close,
  dialogType,
  timesButton = null,
}) {
  return visible ? (
    <>
      <div
        className="md-container dialog"
        onClick={(e) =>
          e.target.className === "md-container dialog" ? close() : null
        }
      >
        <div className="md-modal">
          <div className="modal-header">
            <h2>{DIALOGS[dialogType].header}</h2>
            <div
              className="close-btn"
              onClick={timesButton ? timesButton : close}
            >
              &times;
            </div>
          </div>
          <div className="dialog-buttons">
            <Button text={DIALOGS[dialogType].confirmButton} action={action} />
            <Button
              text={DIALOGS[dialogType].cancelButton}
              action={close}
              style="warning"
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
}
