import { SERVER, LOGS_CATALOG } from 'constants/constants';
import useNotification from 'hooks/useNotification';
import usePostFetch from 'hooks/usePostFetch';
import { useDispatch, useSelector } from 'react-redux';

const OnItemInfoFormSubmit = () => {
    const fetchData = usePostFetch();
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
            addinfo
        }
    } = useSelector((state) => state.total);

    const { itemInfoId: editId } = useSelector(
        (state) => state.modal
    );
    const { storages, statuses, sredstva, persons, types } = useSelector(
        (state) => state.info
    );


    const onFormSubmit = async(close) => {

        const allInfo = {
            person: persons,
            storage: storages,
            status: statuses,
            sredstvo: sredstva,
            type: types,
        }
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
                addinfo
            };

            if (JSON.stringify(initialItemData) === JSON.stringify(newItemData)) {
                dispatch({
                    type: "SUCCESS",
                    message: "Информация не была изменена",
                });
                close();
                return;
            }

            const { message: updatedTotal, isSuccess: updatedTotalSuccess } =
            await fetchData(
                `${SERVER}api/total/${editId}`, {
                    qr,
                    name,
                    sredstvo,
                    type,
                    month,
                    year,
                    model,
                    sernom,
                },
                "PUT"
            );
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
                                return prevState = elem.label
                            }
                        })
                    }
                    allInfo[key].forEach((elem) => {
                        if (elem.value === updatedData[key]) {
                            logs = ` ${logs} ${LOGS_CATALOG[key]}: ${
                                initialItemData[key] == null ? "" : prevState
                              } -> ${elem.label},`;
                        }
                    })
                } else {
                    logs = ` ${logs} ${LOGS_CATALOG[key]}: ${
                        initialItemData[key] == null ? "" : initialItemData[key]
                      } -> ${updatedData[key]},`;
                }
            }


            const { message: updatedLogs, isSuccess: updatedLogsSuccess } =
            await fetchData(`${SERVER}api/logs/`, {
                qr,
                user: login,
                text: logs.slice(0, -1),
            });
            const { message: updatedInfo, isSuccess: updatedInfoSuccess } =
            await fetchData(`${SERVER}api/info/${editId}`, {
                info,
            });
            const { message: updatedStatus, isSuccess: updatedStatusSuccess } =
            await fetchData(`${SERVER}api/status/${editId}`, {
                status,
            });
            console.log(person);
            const { message: updatedPerson, isSuccess: updatedPersonSuccess } =
            await fetchData(`${SERVER}api/person/${editId}`, {
                person,
            });
            const { message: updatedStorage, isSuccess: updatedStorageSuccess } =
            await fetchData(`${SERVER}api/storage/${editId}`, {
                storage,
            });

            const { message: updatedAddinfo, isSuccess: updatedAddinfoSuccess } =
            await fetchData(`${SERVER}api/addinfo/${editId}`, {
                addinfo,
            });
            close();

            dispatch({
                type: "SUCCESS",
                message: updatedTotal,
                title: "Успешно",
            });

            let newItem = { qr, name, sredstvo, type, month, year, model, sernom };

            let filtered = data.filter((data) => {
                return data.qr !== editId;
            });
            let newArr = [...filtered, newItem];
            sortArr(newArr);
            dispatchTotal({ type: "CHANGE_TOTAL_DATA", payload: newArr });
        } catch (e) {
            console.error(e.message);
        }
    }
    return onFormSubmit
};

function sortArr(arr) {
    return arr.sort((a, b) => (a.qr > b.qr ? 1 : -1));
}

export default OnItemInfoFormSubmit