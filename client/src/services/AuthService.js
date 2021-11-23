import usePostFetch from "../hooks/usePostFetch";
const fetchData = usePostFetch();


class AuthService {

    async registration(login, password) {
        const { message: regMessage, isSuccess: regSuccess } = await fetchData(
            "http://localhost:8000/api/auth/registration/", {
                login,
                password,
            }
        );
        return { regMessage, regSuccess }

    }
    async login(login, password) {
        const { message: loginMessage, isSuccess: loginSuccess } = await fetchData(
            "http://localhost:8000/api/auth/login/", {
                login,
                password,
            }
        );
        return { loginMessage, loginSuccess }
    }
    async logout() {
        const { message: logoutMessage, isSuccess: logoutSuccess } = await fetchData(
            "http://localhost:8000/api/auth/logout/", {}
        );
    }

}

export default new AuthService