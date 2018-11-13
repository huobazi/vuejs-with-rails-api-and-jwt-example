import qs from 'qs';
import axios from 'axios';
import router from '@/router.js'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.timeout = 1000 * 60 * 3;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';



export const WebAppAPI = {
    CreateHttpClient: function () {

        let token = localStorage.getItem('X-Authorization-Token');
        let axiosInstance = axios.create({
            headers: {
                'X-Authorization-Token': token
            },

            paramsSerializer: (params) => {
                return qs.stringify(params, {
                    arrayFormat: 'brackets'
                });
            }
        });

        axiosInstance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response.status === 401 ||
                error.response.status === 402 ||
                error.response.status === 403 ||
                error.response.status === 422) {
                this.RemoveCurrentUser();
                router.push('login');
                return Promise.reject(error);

            } else {
                return Promise.reject(error);
            }
        });

        return axiosInstance;
    },
    IsSignedIn: function(){
        let o = this.GetCurrentUser();
        if(o && o.id > 0){
            return true;
        }
        return false;
    },
    GetCurrentUser: function () {
        let currentUser = undefined
        if (localStorage.getItem('current-user')) {
            currentUser = qs.parse(localStorage.getItem('current-user'));
        }
        return currentUser;
    },
    SetCurrentUser: function (auth_token, user) {
        localStorage.setItem('X-Authorization-Token', auth_token);
        localStorage.setItem('current-user', qs.stringify(user));
    },
    RemoveCurrentUser: function () {
        localStorage.removeItem('X-Authorization-Token');
        localStorage.removeItem('current-user');
    },
    GetAllProducts: function () {
        return this.CreateHttpClient().get("/products").then(response => response);
    },
    GetProductById: function (id) {
        return this.CreateHttpClient().get("/products/" + id).then(response => response);
    },
    CreateProduct: function (product) {
        return this.CreateHttpClient().post("/products/", product).then(response => response);
    },

    DeleteProduct: function (id) {
        return this.CreateHttpClient().delete("/products/" + id).then(response => response);
    },

    UpdateProduct: function (product) {
        return this.CreateHttpClient().put("/products/" + product.id, product).then(response => response);
    },

    CreateUser: function (user) {
        return this.CreateHttpClient().post("/users", user).then(response => response);
    },

    CreateSession: function (username, password) {
        let loginData = {
            username: username,
            password: password,
        };
        return this.CreateHttpClient().post("/sessions", loginData).then(response => response);
    },
}