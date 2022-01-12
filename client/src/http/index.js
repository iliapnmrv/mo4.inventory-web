import axios from "axios";
import { store } from "store";
import { setToken } from "store/actions/userAction";


export const API_URL = `http://localhost:8000/api/`;

// export const SERVER = "http://mo4-it5:8000/"

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

$api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${store.getState().user.token}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config
}, async(error) => {
    const originalRequest = error.config
    console.log(originalRequest);
    console.log(error.response.status);
    if (error.response.status == 401) {
        try {
            const data = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true }).then(({ data }) => data)
            store.dispatch(setToken(data.accessToken))
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error
});

export default $api;