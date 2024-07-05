// 管理所有的全局组件
import { App } from "vue";
import ChartDisplay from './ChartDisplay.vue'
// 将全局组件封装到插件中
export default {
  install(Vue: App) {
    Vue.component("ChartDisplay", ChartDisplay);
  },
};
