// 管理路由
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import NotFound from '@/views/NotFound.vue'
NProgress.configure({ showSpinner: false });
// 导入 layout
import layout from '@/App.vue'
let router = createRouter({
  // 设置路由模式
  history: createWebHistory(),
  // 设置路由对象
  routes: [
    {
      path: '/', component: layout,
      children: [
        { path: '/login', component: () => import('@/views/home/Login.vue') },
        { path: '', component: () => import('@/views/home/tabulation.vue') },
        { path: '/details', component: () => import('@/views/home/details.vue') },
        { path: '/wallet', component: () => import('@/views/wallets/index.vue') },
        { path: '/echart', component: () => import('@/views/wallets/echart.vue') },
      ]
    },
    // 404 路由配置
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
})

// 在路由切换前显示进度条
router.beforeEach((to, from, next) => {
  NProgress.start(); //进度条开始
  next();
});

// 在路由切换后结束进度条
router.afterEach(() => {
  NProgress.done(); //进度条结束
});

// 暴露路由对象
export default router