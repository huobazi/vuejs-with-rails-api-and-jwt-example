<template id="login">
  <div class="login">
    <Header></Header>
    <el-main>
      <el-form :model="user" :rules="userRules" ref="userForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="user.username" type="password" required clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="user.password" type="password" required clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">登陆</el-button>&nbsp;&nbsp;
          <el-button @click="resetForm('userForm')">重置</el-button>&nbsp;&nbsp;
          <a class="btn btn-default">
            <router-link to="/register">没有账户？去注册</router-link>
          </a>
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
  name: 'login',
  template: '#login',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: { username: '', password: '', confirm_password: '' },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在 3 个以上', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    createSession() {
      WebAppAPI.CreateSession(this.user.username, this.user.password).then(
        response => {
          if (response.status === 201) {
            WebAppAPI.SetCurrentUser(
              response.data.auth_token,
              response.data.user
            );
            this.$router.push('/');
          } else {
            this.$alert('用户名或密码错误', '提示');
          }
        }
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createSession();
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
