<template id="about">
  <div class="about">
    <Header></Header>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>关于</span>
        </div>
        <div class="text item">1. 使用 vue 做前端</div>
        <div class="text item">2. 使用 rails-api 做后端</div>
        <div class="text item">3. 使用 JWT 做 身份验证. 使用 vue 做前端</div>
        <span>@huobazi</span>
        <div>
          <div class="text item" style="text-align:center;padding:30px;">
            <a style="padding:10px;" href="https://huobazi.github.com/">Blog</a>
            <a style="padding:10px;" href="https://github.com/huobazi">github</a>
            <a style="padding:10px;" href="https://twitter.com/huobazi">twitter</a>
          </div>
        </div>
      </el-card>
    </el-main>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'about',  
  template: '#about',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 18px;
  margin-left: 1 0px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>