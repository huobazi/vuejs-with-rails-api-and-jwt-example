
<template id="product-list">
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
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="showProduct(scope.$index, scope.row)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="deleteProduct(scope.$index, scope.row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
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
      this.$confirm('此操作将永久删除 ' + row.name + ' , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          WebAppAPI.DeleteProduct(row.id).then(response => {
            if (response.status === 200 || response.status === 204) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.products = this.products.filter(p => {
                return p.id != row.id;
              });
            }
          });
        })
        .catch(() => {});
    },
    showProduct(index, row) {
      this.$router.push({ name: 'edit', params: { id: row.id }})
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
