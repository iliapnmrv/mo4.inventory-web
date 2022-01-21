import $api, { API_URL } from "http/index.js";
import axios from 'axios'
import { store } from "store";
import { changeUserData, setIsAuthenticated, setToken } from "store/actions/userAction";
class AuthService {

    async registration(login, password) {
        try {
            const registrationData = await $api.post('auth/registration/', {
                login,
                password
            }).then(({ data }) => data)
            store.dispatch(setToken(registrationData.accessToken))
            store.dispatch(changeUserData(JSON.stringify(registrationData.user)))
            store.dispatch(setIsAuthenticated(true))
            return registrationData
        } catch (e) {
            return e.response.data
        }
    }

    async login(login, password) {
        try {
            const loginData = await $api.post('auth/login/', {
                login,
                password
            }).then(({ data }) => data)
            store.dispatch(setToken(loginData.accessToken))
            store.dispatch(changeUserData(JSON.stringify(loginData.user)))
            store.dispatch(setIsAuthenticated(true))
            return loginData
        } catch (e) {
            throw e.response.data
        }

    }

    async logout() {
        try {
            store.dispatch(setToken(""))
            store.dispatch(changeUserData(""))
            store.dispatch(setIsAuthenticated(false))
            return $api.post('auth/logout/')
        } catch (e) {
            console.log(e.response.data);
        }

    }

    async checkAuth() {
        try {
            const data = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true }).then(({ data }) => data)
            store.dispatch(setToken(data.accessToken))
            return data
        } catch (e) {
            return e.response.data
        }

    }
}

export default new AuthService