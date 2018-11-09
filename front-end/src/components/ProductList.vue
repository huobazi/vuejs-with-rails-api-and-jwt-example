
<template id="product-list">
  <div>
    <div class="actions">
      <a class="btn btn-default">
        <router-link :to="{path: '/add-product'}">
          <span class="glyphicon glyphicon-plus"></span>
          Add product
        </router-link>
      </a>
    </div>
    <div class="filters row">
      <div class="form-group col-sm-3">
        <label for="search-element">名称</label>
        <input v-model="searchKey" class="form-control" id="search-element" requred>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
          <th>价格</th>
          <th class="col-sm-2">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <!-- tr v-for="product in products" -->
          <!-- tr v-for="product in products | filterBy searchKey in 'name'" -->
          <td>
            <a>
              <router-link
                :to="{name: 'product', params: {product_id: product.id}}"
              >{{ product.name }}</router-link>
            </a>
          </td>
          <td>{{ product.description }}</td>
          <td>
            {{ product.price }}
            <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
          </td>
          <td>
            <a class="btn btn-warning btn-xs">
              <router-link :to="{name: 'product-edit', params: {product_id: product.id}}">编辑</router-link>
            </a>
            <a class="btn btn-danger btn-xs">
              <router-link :to="{name: 'product-delete', params: {product_id: product.id}}">删除</router-link>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getAllProducts} from '@/API.js'
export default {
  name: 'ProductList',
  template: '#product-list',
  data: function() {
    return {
      products: [],
      searchKey: '',
    };
  },
  methods: {
    loadAllProducts: function() {
      return getAllProducts().then(function(response){
        this.products = response;
      });
    },
  },
  ready: function() {
  },
  created: function() {
    this.loadAllProducts();
  },
  mounted: function() {
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return product.name.indexOf(this.searchKey) > -1;
      });
    },
  },
};
</script>
