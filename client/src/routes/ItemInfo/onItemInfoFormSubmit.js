import { LOGS_CATALOG } from "constants/constants";
import useNotification from "hooks/useNotification";
import $api from "http/index.js";
import { useDispatch, useSelector } from "react-redux";
import { changeTotalData } from "store/actions/totalAction";

const OnItemInfoFormSubmit = () => {
  const dispatch = useNotification();
  const dispatchTotal = useDispatch();
  const { login } = useSelector((state) => state.user.username);

  const {
    data,
    initialItemData,
    itemValues: {
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

  const { itemInfoId: editId } = useSelector((state) => state.modal);
  const { storages, statuses, sredstva, persons, types, owners } = useSelector(
    (state) => state.info
  );

  const onFormSubmit = async (close) => {
    const allInfo = {
      person: persons,
      storage: storages,
      status: statuses,
      sredstvo: sredstva,
      type: types,
      owner: owners,
    };
    try {
      let newItemData = {
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
      };

      if (JSON.stringify(initialItemData) === JSON.stringify(newItemData)) {
        dispatch({
          type: "SUCCESS",
          message: "Информация не была изменена",
        });
        close();
        return;
      }

      const updatedTotal = await $api
        .put(`total/${editId}`, {
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
      console.log(updatedTotal);

      let updatedData = Object.keys(newItemData).reduce((diff, key) => {
        if (initialItemData[key] === newItemData[key]) return diff;
        return {
          ...diff,
          [key]: newItemData[key],
        };
      }, {});
      let logs = "",
        prevState;
      for (const key in updatedData) {
        if (allInfo[key]) {
          if (initialItemData[key]) {
            allInfo[key].forEach((elem) => {
              if (elem.value === initialItemData[key]) {
                return (prevState = elem.label);
              }
            });
          }
          allInfo[key].forEach((elem) => {
            if (elem.value === updatedData[key]) {
              logs = ` ${logs} ${LOGS_CATALOG[key]}: ${
                initialItemData[key] == null ? "" : prevState
              } -> ${elem.label},`;
            }
          });
        } else {
          logs = ` ${logs} ${LOGS_CATALOG[key]}: ${
            initialItemData[key] == null ? "" : initialItemData[key]
          } -> ${updatedData[key]},`;
        }
      }

      const updatedLogs = await $api.post(`logs/`, {
        qr,
        user: login,
        text: logs.slice(0, -1),
      });

      const updatedInfo = await $api.post(`info/${editId}`, {
        info,
      });

      const updatedStatus = await $api.post(`status/${editId}`, {
        status,
      });

      const updatedPerson = await $api.post(`person/${editId}`, {
        person,
      });

      const updatedStorage = await $api.post(`storage/${editId}`, {
        storage,
      });

      const updatedAddinfo = await $api.post(`addinfo/${editId}`, {
        addinfo,
      });
      const updatedOwner = await $api.post(`owner/${editId}`, {
        owner,
      });

      close();

      dispatch({
        type: "SUCCESS",
        message: updatedTotal,
        title: "Обновлено",
      });

      let newItem = { qr, name, sredstvo, type, month, year, model, sernom };

      let filtered = data.filter((data) => {
        return data.qr !== editId;
      });
      let newArr = [...filtered, newItem];
      sortArr(newArr);
      dispatchTotal(changeTotalData(newArr));
    } catch (e) {
      console.error(e.message);
    }
  };
  return onFormSubmit;
};

function sortArr(arr) {
  return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
}

export default OnItemInfoFormSubmit;
