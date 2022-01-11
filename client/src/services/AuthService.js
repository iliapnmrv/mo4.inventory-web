import $api, { API_URL } from "http/index.js";
import axios from 'axios'
import { store } from "store";
import { changeUserData, setToken } from "store/actions/userAction";
class AuthService {

    async registration(login, password) {
        const registrationData = await $api.post('auth/registration/', {
            login,
            password
        }).then(({ data }) => data)
        store.dispatch(setToken(registrationData.accessToken))
        store.dispatch(changeUserData(JSON.stringify(registrationData.user)))
        return registrationData
    }

    async login(login, password) {
        const loginData = await $api.post('auth/login/', {
            login,
            password
        }).then(({ data }) => data)
        store.dispatch(setToken(loginData.accessToken))
        store.dispatch(changeUserData(JSON.stringify(loginData.user)))
        return loginData
    }

    async logout() {
        store.dispatch(setToken(""))
        store.dispatch(changeUserData(""))
        return $api.post('auth/logout/')
    }

    async checkAuth() {
        const data = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true }).then(({ data }) => data)
        store.dispatch(setToken(data.accessToken))
        return data
    }
}

export default new AuthService