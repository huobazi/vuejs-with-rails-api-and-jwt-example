<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="headerMenuActiveIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelectMenu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="0">首页</el-menu-item>
          <el-menu-item index="1">添加</el-menu-item>
          <el-menu-item index="2">退出</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
  name: 'app',
  data() {
    return {
      headerMenuActiveIndex: '0',
    };
  },
  methods: {
    handleSelectMenu(key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case '0':
          this.$router.push('/');
          break;
        case '1':
          this.$router.push('/add');
          break;
        case '2':
          console.log('try do logout');
          break;
        default:
          break;
      }
    },
  },
  created: function() {
    console.log('app created');
  },
  mounted: function() {
    console.log('app mounted');
    console.log('this.$route', this.$route);
  },
  destroyed: function() {
    console.log('app destroyed');
  },
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>