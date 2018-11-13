<template id="edit">
  <div class="edit">
    <Header></Header>
    <el-main>
      <ProductForm action="edit" v-bind:productId="this.$route.params.id"/>
    </el-main>
    <Footer></Footer>
  </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Edit',
  template: '#edit',
  components: {
    ProductForm,
    Header,
    Footer,
  },
};
</script>
