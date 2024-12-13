import { createApp } from 'vue';
import App from './App.vue';
// 导入 normalize
import 'normalize.css';
// 导入自定义的公共样式
import '@/assets/styles/common.less';
// 导入路由
import router from './router/index';
// 导入复用组件
import plugin from "./components/index";
// 导入 pinia
import { createPinia } from 'pinia';

// 导入 element-plus
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
// 导入 element-plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { setRouter } from './utils/request';

// 创建 Pinia 实例
let pinia = createPinia();

// 创建 Vue 应用实例
const app = createApp(App);

// 挂载插件
app
    .use(ElementPlus)
    .use(router)
    .use(pinia)
    .use(plugin);

// 挂载 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 将 router 实例传递给 axios 配置文件
setRouter(router);

// 挂载应用
app.mount('#app');
