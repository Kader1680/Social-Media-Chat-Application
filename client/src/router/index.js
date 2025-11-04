import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import Register from '@/views/register.vue'
import Login from '@/views/login.vue'
import Profil from '@/views/profil.vue'
import chatfiend from '../views/chatfiend.vue'
import Friends from '@/views/friends.vue'
import Editpost from '@/views/editpost.vue'
import Notifications from '@/views/Notifications.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/edit/:id',
      name: 'editpost',
      component: Editpost,
    }
    ,
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/chat',
      name: 'ChatView',
      component: ChatView,
    }
    ,

    {
      path: '/chat/:friendId',
      name: 'chatfiend',
      component: chatfiend,
    }
    ,

    {
      path: '/register',
      name: 'register',
      component: Register,
    }

    ,
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
    ,
    {
      path: '/profil',
      name: 'profil',
      component: Profil,
    }
    ,
    {
      path: '/friends',
      name: 'friends',
      component: Friends,
    }
     ,
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
    }
  ]
})

export default router
