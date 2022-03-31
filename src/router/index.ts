import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/Video.vue'
import Login from '../views/Login.vue'
import CreateAccount from '../views/CreateAccount.vue'
import AccountPage from '../views/AccountPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount,
  },
  {
    path: '/account-page',
    name: 'AccountPage',
    component: AccountPage,
  },
  {
    path: '/:videoId',
    name: "Video",
    props: true,
    component: Video,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
