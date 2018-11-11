import qs from 'qs';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.timeout = 1000 * 60 * 3;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';

let accessToken = sessionStorage.getItem('access-token');
let axiosInstance = axios.create({
  headers: {
    'X-Authorization-AccessToken': accessToken
  },

  paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: 'brackets'});
  }
});


export const WebAppAPI = {

    GetAllProducts: function () {
        return axiosInstance.get("/products").then(response => response);
    },

    AddProduct: function (product) {
        return axiosInstance.post("/products", product).then(response => response);
    },

    DeleteProduct: function (id) {
        return axiosInstance.delete("/products/" + id).then(response => response);
    },

    UpdateProduct: function (product) {
        return axiosInstance.put("/products", product).then(response => response);
    },
}