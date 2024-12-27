// 管理所有的全局组件
import { App } from "vue";
import CommonAside from "@/components/CommonAside.vue";
import CommonDialog from "@/components/CommonDialog.vue";
// 将全局组件封装到插件中
export default {
  install(Vue: App) {
    CommonAside: Vue.component("CommonAside", CommonAside);
    CommonDialog: Vue.component("CommonDialog", CommonDialog);
  },
};
