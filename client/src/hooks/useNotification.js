import { useContext } from "react";
import { NotificationContext } from "components/Notification/NotificationProvider";
import { v4 } from "uuid";

const useNotification = () => {
    const dispatch = useContext(NotificationContext);

    return (props) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: v4(),
                ...props,
            },
        });
    };
};

export default useNotification