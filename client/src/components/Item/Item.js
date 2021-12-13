import React from "react";
import "./Item.css";

export default function Item({ openModal, data }) {
  return (
    <>
      <tr data-id={data.qr} key={data.qr} onClick={() => openModal(data.qr)}>
        <td>{data.qr}</td>
        <td>{data.sredstvo_name}</td>
        <td>{data.type_name}</td>
        <td>{data.month}</td>
        <td>{data.year}</td>
        <td>{data.name}</td>
        <td>{data.model}</td>
        <td>{data.sernom}</td>
      </tr>
    </>
  );
}
