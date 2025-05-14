import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../views/Shop.vue'
import SuccessPay from '../views/SuccessPay.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import UsageConditions from '../views/UsageConditions.vue'
import admin from '../views/admin.vue'
import HomePage from '../views/HomePage.vue'
import howtostart from '../views/info.vue'
import leaderboard from '../views/LeaderBoard.vue'
import daily from '../views/DailyRewards.vue'
import cases from '../views/Cases.vue'
import test from '../views/test.vue'
import profile from '../views/profile.vue'

import cs from '../views/ComingSoon.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: HomePage
    },
    {
      path: '/store',
      name: 'home',
      component: Shop
    },
    {
      path: '/success',
      name:'success-pay',
      component: SuccessPay
    },
    {
      path: '/privacy-policy',
      name: 'privacy',
      component: PrivacyPolicy
    },
    {
      path: '/usage-conditions',
      name: 'conditions',
      component: UsageConditions
    },
    {
      path: '/krabikpolitsai',
      name: 'admin',
      component: admin
    },
    {
      path: '/info',
      name: 'howtostart',
      component: howtostart
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: leaderboard
    },
    {
      path: '/daily',
      name: 'daily',
      component: daily
    },
    {
      path: '/cases',
      name: 'cases',
      component: cases
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
  ]
})

export default router
