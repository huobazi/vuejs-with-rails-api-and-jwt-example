
<template id="product-list">
  <div>
    <div class="actions">
      <a class="btn btn-default">
        <router-link :to="{path: '/add'}">
          <span class="glyphicon glyphicon-plus"></span>
          添加商品
        </router-link>
      </a>
    </div>
    <el-table
      :data="products.filter(data => !searchKey || data.name.toLowerCase().includes(searchKey.toLowerCase()))"
      border=""
      style="width: 100%"
    >
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="slot">
          <el-input v-model="searchKey" size="mini" placeholder="搜索..."/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="showProduct(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteProduct(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { WebAppAPI } from '@/API.js';
export default {
  name: 'ProductList',
  template: '#product-list',
  data() {
    return {
      products: [],
      searchKey: '',
    };
  },
  methods: {
    loadAllProducts() {
      WebAppAPI.GetAllProducts().then(response => {
        this.products = response.data;
      });
    },
    deleteProduct(index, row) {
      if (confirm('是否删除 ' + row.name)) {
        WebAppAPI.DeleteProduct(row.id).then(response => {
          if (response.status === 200 || response.status === 204) {
            this.products = this.products.filter(p => {
              return p.id != row.id;
            });
          }
        });
      }
    },
    showProduct(index, row) {
      this.$router.push('edit/' + row.id);
    },
  },
  ready() {},
  created() {
    this.loadAllProducts();
  },
  mounted() {},
  computed: {},
};
</script>
