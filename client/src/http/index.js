import axios from "axios";
import { store } from "store";
import { toggleLoginModal } from "store/actions/authAction";
import { setIsAuthenticated, setToken } from "store/actions/userAction";

export const API_URL = process.env.REACT_APP_API_URL;

// export const API_URL = "http://localhost:8000/api/"

// export const API_URL = "http://192.168.26.75:8000/api/"

export const customAxios = (contentType = "") => {
    let axiosInstance;
    if (contentType == null) {
        axiosInstance = axios.create({
            baseURL: API_URL,
            withCredentials: true,
        });
    } else {
        axiosInstance = axios.create({
            baseURL: API_URL,
            withCredentials: true,
            headers: {
                "Content-Type": contentType,
            },
        });
    }

    // your response interceptor
    axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${store.getState().user.token}`;
        return config;
    });

    axiosInstance.interceptors.response.use(
        (config) => {
            return config;
        },
        async(error) => {
            const originalRequest = error.config;
            console.log(originalRequest);
            console.log(error.response.status);
            if (error.response.status === 401) {
                try {
                    const data = await axios
                        .get(`${API_URL}auth/refresh`, { withCredentials: true })
                        .then(({ data }) => data);
                    store.dispatch(setToken(data.accessToken));
                    return $api.request(originalRequest);
                } catch (e) {
                    store.dispatch(toggleLoginModal(true));
                    store.dispatch(setIsAuthenticated(false));
                    console.log("Не авторизован");
                }
            }
            throw error;
        }
    );

    return axiosInstance;
};

const $api = customAxios("application/json")

export default $api;