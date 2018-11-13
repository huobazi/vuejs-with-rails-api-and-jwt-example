import Vue from 'vue'
import Router from 'vue-router'

import { WebAppAPI } from '@/API.js';

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import AddProduct from '@/views/AddProduct.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'add-product',
      component: AddProduct
    },
  ]
});


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPageNames = ['login', 'register','about'];
  const authRequired = !publicPageNames.includes(to.name);
  const currentUser = WebAppAPI.GetCurrentUser();

  if (authRequired && (!currentUser || currentUser.id <=0)) {
    return next('/login');
  }

  next();
});

export default router;
