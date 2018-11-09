import {
    stringify
} from 'qs';

import axios from 'axios';
axios.defaults.baseURL = 'http://back-end.test/api/v1';
axios.defaults.timeout = 1000 * 60 * 3;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json';


 export const getAllProducts = () =>{
    var productsFromAPI = [{
            id: 1,
            name: 'Angular',
            description: 'Superheroic JavaScript MVW Framework.',
            price: 100,
        },
        {
            id: 2,
            name: 'Ember',
            description: 'A framework for creating ambitious web applications.',
            price: 100,
        },
        {
            id: 3,
            name: 'React',
            description: 'A JavaScript Library for building user interfaces.',
            price: 100,
        },
        {
            id: 4,
            name: '哈哈',
            description: 'A JavaScript Library for building user interfaces.',
            price: 100,
        },
    ];


    return axios.get("/products").then(function (response) {
        return productsFromAPI;
        //return response.data;
    });
};


// export const WebsiteAPI = {

//     GetAllProducts : function(){
//         var productsFromAPI = [{
//                 id: 1,
//                 name: 'Angular',
//                 description: 'Superheroic JavaScript MVW Framework.',
//                 price: 100,
//             },
//             {
//                 id: 2,
//                 name: 'Ember',
//                 description: 'A framework for creating ambitious web applications.',
//                 price: 100,
//             },
//             {
//                 id: 3,
//                 name: 'React',
//                 description: 'A JavaScript Library for building user interfaces.',
//                 price: 100,
//             },
//             {
//                 id: 4,
//                 name: '哈哈',
//                 description: 'A JavaScript Library for building user interfaces.',
//                 price: 100,
//             },
//         ];


//         return axios.get("/products").then(function (response) {
//             return productsFromAPI;
//             //return response.data;
//         });
//     },

//     AddProduct : function(product) {
//         return axios.post("/products", stringify(product)).then(function (response) {
//             return response.data;
//         });

//     },

//     DeleteProduct : function(id){
//         return axios.delete("/products", stringify(id)).then(function (response) {
//             return response.data;
//         });
//     },

//     UpdateProduct : function(product) {
//         return axios.put("/products", stringify(product)).then(function (response) {
//             return response.data;
//         });
//     },
// }