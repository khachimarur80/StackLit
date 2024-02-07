import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/DashBoard.vue'
import Library from '@/views/Library.vue'
import LeaderBoard from '@/views/LeaderBoard.vue'
import vProfile from '@/views/Profile.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'StackLit' } },
  { path: '/signup', component: SignUp, meta: { title: 'StackLit | Sign Up' } },
  { path: '/login', component: Login, meta: { title: 'StackLit | Login' } },
  { path: '/dashboard', component: Dashboard, meta: { title: 'StackLit | Dashboard' } },
  { path: '/library', component: Library, meta: { title: 'StackLit | Library' } },
  { path: '/leaderboard', component: LeaderBoard, meta: { title: 'StackLit | Leaderboard' } },
  { path: '/profile', component: vProfile, meta: { title: 'StackLit | Profile' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;