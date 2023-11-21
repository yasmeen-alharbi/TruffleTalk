import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = ({ token = null } = {}) => {
    const api = axios.create({
        baseURL: 'http://localhost/api/',
    });

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            SecureStore.deleteItemAsync('user');

            return Promise.reject({status: 401, errors: ['Unauthorized']});
        }

        if (error.response?.status === 422) {
            let errors = error?.response?.data.errors || {};
            return Promise.reject({ status: 422, errors: errors });
        }

        return Promise.reject({ status: error.response?.status, errors: error.response.data });
    })

    return api;
}

export default api;