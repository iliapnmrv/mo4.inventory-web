import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Item.css";

export default function Item({ openModal, data }) {
  return (
    <>
      <tr data-id={data.qr} key={data.qr}>
        <td>{data.qr}</td>
        <td>{data.sredstvo_name}</td>
        <td>{data.type_name}</td>
        <td>{data.month}</td>
        <td>{data.year}</td>
        <td>{data.name}</td>
        <td>{data.model}</td>
        <td>{data.sernom}</td>
        <span className="icon" onClick={() => openModal(data.qr)}>
          <FontAwesomeIcon icon={faEdit} />
        </span>
      </tr>
    </>
  );
}
