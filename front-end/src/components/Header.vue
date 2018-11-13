<template id="header">
  <el-header>
    <el-menu
      :default-active="headerMenuActiveIndex"
      mode="horizontal"
      @select="handleSelectMenu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-if="display('home')" index="home">首页</el-menu-item>
      <el-menu-item index="about">关于</el-menu-item>
      <el-menu-item v-if="display('add')" index="add">添加</el-menu-item>
      <el-menu-item v-if="display('register')" index="register">注册</el-menu-item>
      <el-menu-item v-if="display('login')" index="login">登陆</el-menu-item>
      <el-menu-item v-if="display('logout')" index="logout">退出</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
import { WebAppAPI } from '@/API.js';
export default {
  name: 'Header',
  template: '#header',
  data() {
    return {
      headerMenuActiveIndex: 'home',
      isLogin: WebAppAPI.IsSignedIn(),
    };
  },
  methods: {
    display(name) {
      switch (name) {
        case 'home':
          return this.isLogin;
          break;
        case 'add':
          return this.isLogin;
          break;
        case 'register':
          return !this.isLogin;
          break;
        case 'login':
          return !this.isLogin;
          break;
        case 'logout':
          return this.isLogin;
          break;
        default:
          return true;
          break;
      }
    },
    handleSelectMenu(key, keyPath) {
      switch (key) {
        case 'home':
          this.$router.push({ name: 'home' });
          break;
        case 'about':
          this.$router.push({ name: 'about' });
          break;
        case 'add':
          this.$router.push({ name: 'add' });
          break;
        case 'register':
          this.$router.push({ name: 'register' });
          break;
        case 'login':
          this.$router.push({ name: 'login' });
          break;
        case 'logout':
          WebAppAPI.RemoveCurrentUser();
          this.$router.push({ name: 'login' });
          break;
        default:
          break;
      }
    },
  },
  mounted() {},
};
</script>
