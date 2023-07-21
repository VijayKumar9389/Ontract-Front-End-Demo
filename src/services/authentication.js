import axios from "axios";
import jwtDecode from "jwt-decode";

const accessToken = 'access-token';
const refreshToken = 'refresh-token';

const getToken = () => {
    return localStorage.getItem(accessToken);
}

const setToken = (token) => {
    localStorage.setItem(accessToken, token);
}

const isTokenExpired = () => {
    try {
        let token = localStorage.getItem(refreshToken);
        let decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
}

const getRefreshedtoken = () => {
    return axios.get('http://localhost:5500/user/refreshToken', {
        headers: {
            "refresh-token": localStorage.getItem("refresh-token"),
        }
    });
}

const refreshAccessToken = async () => {
    const newToken = await getRefreshedtoken();
    setToken(newToken.data.accessToken);
}

axios.interceptors.response.use(response => response, async (error) => {

    const originalRequest = error.config;

    if (error.response.status === 401) {
        if (isTokenExpired()) {
            console.log('User Session Expired');
        } else {
            await refreshAccessToken();
            originalRequest._retry = true;
            originalRequest.headers[accessToken] = getToken();
            return axios.request(originalRequest);
        }
    }

    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
    const token = getToken();
    config.headers[accessToken] = token;
    return config;
});


export { getToken, setToken, isTokenExpired, getRefreshedtoken, refreshAccessToken };