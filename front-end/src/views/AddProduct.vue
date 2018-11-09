<template id="add-product">
  <div class="add-product">
    <h2>添加商品</h2>
    <form v-on:submit="createProduct">
      <div class="form-group">
        <label for="add-name">名称</label>
        <input class="form-control" id="add-name" v-model="product.name" required>
      </div>
      <div class="form-group">
        <label for="add-description">描述</label>
        <textarea class="form-control" id="add-description" rows="10" v-model="product.description"></textarea>
      </div>
      <div class="form-group">
        <label for="add-price">
          价格
          <span class="glyphicon glyphicon-rmb"></span>
        </label>
        <input type="number" class="form-control" id="add-price" v-model="product.price">
      </div>
      <button type="submit" class="btn btn-primary">创建</button>
      <a class="btn btn-default">
        <router-link to="/">取消</router-link>
      </a>
    </form>
  </div>
</template>


<script>
export default {
  name: 'add-product',
  template: '#add-product',
  data: function () {
    return {product: {name: '', description: '', price: ''}
    }
  },
  methods: {
    createProduct: function() {
      //Obsolete, product is available directly from data...
      alert(this.product.name);
      router.push('/');
    }
  }
};

</script>

<style>
</style>
