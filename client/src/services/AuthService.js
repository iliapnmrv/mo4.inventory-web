import { SERVER } from "constants/constants";
import usePostFetch from "hooks/usePostFetch";

const fetchData = usePostFetch();


class AuthService {

    async registration(login, password) {
        const { message: regMessage, isSuccess: regSuccess } = await fetchData(
            `${SERVER}api/auth/registration/`, {
                login,
                password,
            }
        );
        return { regMessage, regSuccess }

    }
    async login(login, password) {
        const { message: loginMessage, isSuccess: loginSuccess } = await fetchData(
            `${SERVER}api/auth/login/`, {
                login,
                password,
            }
        );
        return { loginMessage, loginSuccess }
    }
    async logout() {
        const { message: logoutMessage, isSuccess: logoutSuccess } = await fetchData(
            `${SERVER}api/auth/logout/`
        );
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
    async chechAuth() {

        let message = await fetch(`${SERVER}api/auth/refresh/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                mode: 'cors',
            })
            .then(res => res.json())
            .then(data => data)
            .catch(e => {
                console.log(e);
            })
        console.log(message);
    }

}

export default new AuthService