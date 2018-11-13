<template id="add-product">
  <div class="add-product">
    <el-form :model="product" :rules="productRules" ref="productForm" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入内容" v-model="product.name" required clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" :rows="2" placeholder="请输入描述" v-model="product.description"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="product.price" :precision="2" :step="0.1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productForm')">立即创建</el-button>&nbsp;&nbsp;
        <el-button @click="resetForm('productForm')">重置</el-button>&nbsp;&nbsp;
        <a class="btn btn-default">
          <router-link to="/">
            <el-button type="info">返回</el-button>
          </router-link>
        </a>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { WebAppAPI } from '@/API.js';

export default {
  name: 'add-product',
  template: '#add-product',
  data() {
    return {
      product: { name: '', description: '', price: 0.0 },
      productRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
        price: [{ required: true, message: '请选择价格', trigger: 'change' }],
        description: [
          { required: true, message: '请填写描述', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    createProduct() {
      WebAppAPI.CreateProduct(this.product).then(response => {
        if (response.status === 201) {
          this.$router.push('/');
        } else if (response.status === '422') {
          var errorMessage = '错误';
          response.data.errors.forEach(element => {
            errorMessage += '\r\n;';
            errorMessage += element;
          });
          $alert(errorMessage, '提示');
        } else {
          $alert('未知错误！', '提示');
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createProduct();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>
