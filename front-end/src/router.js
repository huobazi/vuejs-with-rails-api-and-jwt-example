import Vue from 'vue'
import Router from 'vue-router'

import { WebAppAPI } from '@/API.js';

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Add from '@/views/Add.vue'
import Edit from '@/views/Edit.vue'

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
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
