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
      path: '/',
      redirect: '/categories', // 将根路径重定向到 /categories
    },
    {
      path: '/',
      children: [
        { path: '/login', component: () => import('@/views/login/Login.vue') },
        // { path: '/commodity', component: () => import('@/views/Commodity/commodity.vue') },
        { path: '/commodity', component: () => import('@/views/Commodity/commodity.vue') },
        { path: '/specifications', component: () => import('@/views/Specifications/index.vue') },
        { path: '/tags', component: () => import('@/views/tags/tags.vue') },
        { path: '/tagType', component: () => import('@/views/tags/tag_type.vue') },
        { path: '/user', component: () => import('@/views/user/index.vue') },
        { path: '/categories', component: () => import('@/views/Categories/index.vue') },
        { path: '/purchase', component: () => import('@/views/Purchase/Purchase.vue') },
        { path: '/Imgmanage', component: () => import('@/views/Imgmanage/index.vue') },

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