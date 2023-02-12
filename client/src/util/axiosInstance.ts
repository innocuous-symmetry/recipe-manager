import axios, { AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'

const apiUrl = import.meta.env.VITE_APIURL;

const instance = axios.create({
    baseURL: apiUrl
});

instance.interceptors.response.use((res: AxiosResponse<any,any>) => {
    if (res?.data.token) {
        document.cookie = `token=${res.data.token}`;
    }
    
    return res;
}, (err) => {
    return Promise.reject(err);
})

export default instance;