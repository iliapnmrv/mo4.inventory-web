import $api, { API_URL } from "http/index.js";
import axios from 'axios'
class AuthService {

    async registration(login, password) {
        const registrationData = await $api.post('auth/registration/', {
            login,
            password
        }).then(({ data }) => data)
        localStorage.setItem("token", registrationData.accessToken);
        localStorage.setItem("username", JSON.stringify(registrationData.user));
        return registrationData
    }

    async login(login, password) {
        const loginData = $api.post('auth/login/', {
            login,
            password
        }).then(({ data }) => data)
        localStorage.setItem("token", loginData.accessToken);
        localStorage.setItem("username", JSON.stringify(loginData.user));
        return loginData
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        return $api.post('auth/logout/')
    }

    async checkAuth() {
        const data = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true }).then(({ data }) => data)
        localStorage.setItem('token', data.accessToken)
        return data
    }
}

export default new AuthService