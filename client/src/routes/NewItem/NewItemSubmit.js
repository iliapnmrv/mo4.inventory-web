import { LOGS_CATALOG } from "constants/constants";
import useNotification from "hooks/useNotification";
import $api from "http/index.js";
import { useDispatch, useSelector } from "react-redux";
import { changeTotalData } from "store/actions/totalAction";

const NewItemSubmit = () => {
  const dispatch = useNotification();
  const dispatchTotal = useDispatch();
  const { login } = useSelector((state) => state.user.username);

  const {
    data,
    newItemValues: {
      qr,
      name,
      sredstvo,
      type,
      month,
      year,
      model,
      sernom,
      person,
      storage,
      status,
      info,
      addinfo,
      owner,
    },
  } = useSelector((state) => state.total);

  const onNewItemFormSubmit = async (close) => {
    try {
      close();
      const newItemMessage = await $api
        .post(`total`, {
          qr,
          name,
          sredstvo,
          type,
          month,
          year,
          model,
          sernom,
        })
        .then(({ data }) => data);
      await $api
        .post(`info/${qr}`, {
          info,
        })
        .then(({ data }) => data);

      await $api
        .post(`status/${qr}`, {
          status,
        })
        .then(({ data }) => data);

      await $api
        .post(`person/${qr}`, {
          person,
        })
        .then(({ data }) => data);

      await $api
        .post(`storage/${qr}`, {
          storage,
        })
        .then(({ data }) => data);

      await $api
        .post(`addinfo/${qr}`, {
          addinfo,
        })
        .then(({ data }) => data);

      await $api
        .post(`owner/${qr}`, {
          owner,
        })
        .then(({ data }) => data);

      await $api
        .post(`logs`, {
          qr,
          user: login,
          text: "Предмет создан",
        })
        .then(({ data }) => data);

      dispatch({
        type: "SUCCESS",
        message: newItemMessage,
        title: "Добавлено",
      });

      let newItem = { qr, name, sredstvo, type, month, year, model, sernom };
      let newArr = [...data, newItem];

      sortArr(newArr);
      dispatchTotal(changeTotalData(newArr));
    } catch (e) {
      console.error(e.message);
    }
  };

  function sortArr(arr) {
    return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
  }
  return onNewItemFormSubmit;
};

export default NewItemSubmit;
