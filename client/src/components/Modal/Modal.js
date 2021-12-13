import React from "react";
import { useDispatch } from "react-redux";

export default function Modal({ visible, close, header, children }) {
  return visible ? (
    <>
      <div
        className="modal-container"
        onClick={(e) =>
          e.target.className === "modal-container" ? close() : null
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
