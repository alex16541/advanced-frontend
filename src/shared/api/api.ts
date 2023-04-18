import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const createApi = () => axios.create({
    baseURL: __API__,
    headers: {
        Authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
    },
});

const $api = createApi();

export const updateApiInstace = () => {
    $api.defaults.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY);
};

export { $api };
