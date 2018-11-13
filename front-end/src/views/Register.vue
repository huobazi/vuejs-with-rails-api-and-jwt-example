<template id="register">
  <div class="register">
    <Header></Header>
    <el-main>
      <el-form :model="user" :rules="userRules" ref="userForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="user.username" required clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="user.password" type="password" required clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirmation">
          <el-input
            placeholder="请输入确认密码"
            v-model="user.password_confirmation"
            type="password"
            required
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">注册</el-button>&nbsp;&nbsp;
          <el-button @click="resetForm('userForm')">重置</el-button>&nbsp;&nbsp;
          <router-link to="/login">已有账户？去登陆</router-link>
        </el-form-item>
      </el-form>
    </el-main>
    <Footer></Footer>
  </div>
</template>


<script>
import { WebAppAPI } from '@/API.js';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'register',
  template: '#register',
  components: {
    Header,
    Footer,
  },
  data() {
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: { username: '', password: '', password_confirmation: '' },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在 3 个以上', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' },
        ],
        password_confirmation: [
          { validator: validateConfirmPassword, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    createuser() {
      let param = { user: this.user };
      WebAppAPI.CreateUser(param).then(response => {
        if (response.status === 201) {
          this.$router.push('/');
        } else {
          let errorMessage = response.data.message;
          this.$alert(errorMessage, '提示');
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createuser();
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
