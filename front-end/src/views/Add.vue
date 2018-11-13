<template id="add">
  <div class="about">
    <Header></Header>
    <el-main>
      <ProductForm action="add"/>
    </el-main>
    <Footer></Footer>
  </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Add',
  template: '#add',
  components: {
    ProductForm, 
    Header,
    Footer,
  },
};
</script>
