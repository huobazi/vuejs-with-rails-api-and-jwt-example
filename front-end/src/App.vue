<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// export default {
//   name: 'app',
//       created: function() {
//          console.log('app created')
//       },
//       mounted: function() {
//          console.log('app mounted')
//          console.log('this.$route', this.$route)
//       },
//       methods: {
//         foo:function(){},
//       },
//       destroyed: function() {
//         console.log('app destroyed');
//       }
//    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
