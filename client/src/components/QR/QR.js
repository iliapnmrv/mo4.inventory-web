import React from "react";
import SuccessCheckmark from "components/SuccessCheckmark/SuccessCheckmark";
import { useState } from "react";
import QRcode from "qrcode.react";
import "./QR.sass";

export default function QR({
  month,
  year,
  name,
  qr,
  model,
  sernom,
  sredstvo,
  type,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const downloadQR = () => {
    const ctx = document.querySelector(".qr canvas");

    // // .toDataURL("image/png")
    // // .replace("image/png", "image/octet-stream");
    // ctx.font = "3px bold";
    // ctx.fillStyle = "#ff0000";
    // ctx.textBaseline = "hanging";
    // const { width } = ctx.measureText(editId); //12.5  - ширина текста
    // var height = parseInt(ctx.font.substring(0, 2)); // 5
    // console.log(width);
    // console.log(height);

    // ctx.fillText(editId, 4, 1); // левый верх
    // ctx.fillText(editId, 128 - width, 1); //правый верх
    // ctx.fillText(editId, 10, 128 - height); //правый низ
    // ctx.fillText(editId, 128 - width, 128 - height); // левый низ

    let aEl = document.createElement("a");
    aEl.href = ctx;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };
  const printQR = () => {};

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setIsCopied(true);
    } catch (err) {
      console.log("Ошибка при копировании");
    }

    document.body.removeChild(textArea);
  }

  const copyQR = (e) => {
    const text = `${sredstvo}${("0" + type).slice(
      -2
    )}${month}${year}${qr}\n${name}\n${model}\n${sernom}`;
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch(() => {
        console.log("Ошибка при копировании");
      });
  };
  return (
    <>
      <h3>QR код</h3>
      <div className="qr">
        {/* <div className="qr-buttons">
          <Button text="Скачать" action={downloadQR} style="info" />
          <Button text="Распечатать" action={printQR} style="info" />
        </div> */}
        <div className="qr-info">
          <p>{`${sredstvo}${
            type && ("0" + type).slice(-2)
          }${month}${year}${qr}`}</p>
          <p>{`${name}`}</p>
          <p>{`${model}`}</p>
          <p>{`${sernom}`}</p>
        </div>
        <QRcode
          onClick={copyQR}
          id={"canvas"}
          includeMargin={true}
          value={`${sredstvo}${("0" + type).slice(
            -2
          )}${month}${year}${qr}\n${name}\n${model}\n${sernom}`}
        />
        {isCopied && <SuccessCheckmark />}
      </div>
    </>
  );
}
