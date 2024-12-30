
<script setup lang="ts">
import { ref, watch } from "vue";
import { useWindowSize } from "@/utils/useWindowSize";
import { useRoute } from "vue-router";

const { width, height } = useWindowSize();
// 获取 CommonAside 组件实例
const commonAsideRef = ref();

// 调用 CommonAside 的 openDrawer 方法
function openCommonAside() {
  if (commonAsideRef.value) {
    commonAsideRef.value.openDrawer();
  }
}
const route = useRoute(); // 获取当前路由信息
const isLoginPage = ref(false);

// 监听路由变化，判断是否为登录页面
watch(
  () => route.path,
  (newPath) => {
    isLoginPage.value = newPath === "/login";
  },
  { immediate: true } // 初始化时立即触发
);
</script>
<template>
  <!-- <Suspense> 是一个用于实现组件延迟加载和异步渲染的组件 -->
  <!-- 一级路由出口 -->
  <el-container v-if="!isLoginPage">
    <!-- <div style="font-size: 30px; background: #000">{{ width }}</div> -->
    <el-aside
      :width="width > 1070 ? '200px' : '140px'"
      class="sidebar"
      v-if="width > 1000"
      style="position: fixed; height: 100%"
    >
      <CommonAside style="height: 100%" />
    </el-aside>
    <el-aside style="width: 38px" v-else @click="openCommonAside">
      <div class="svgcss">
        <svg
          t="1734936777883"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5143"
          width="24"
          height="24"
        >
          <path
            d="M927.25551408 262.13793185H96.96293925c-27.37948445 0-49.56463408-21.73610667-49.56463407-48.54518518s22.19728592-48.54518518 49.56463407-48.54518519h830.29257483c27.37948445 0 49.56463408 21.73610667 49.56463407 48.54518519 0 26.82121482-22.19728592 48.54518518-49.56463407 48.54518518zM927.25551408 837.21633185H96.96293925c-27.37948445 0-49.56463408-21.73610667-49.56463407-48.54518518s22.19728592-48.54518518 49.56463407-48.54518519h830.29257483c27.37948445 0 49.56463408 21.73610667 49.56463407 48.54518519s-22.19728592 48.54518518-49.56463407 48.54518518zM927.25551408 550.29001482H96.96293925c-27.37948445 0-49.56463408-21.73610667-49.56463407-48.54518519s22.19728592-48.54518518 49.56463407-48.54518518h830.29257483c27.37948445 0 49.56463408 21.73610667 49.56463407 48.54518518s-22.19728592 48.54518518-49.56463407 48.54518519z"
            fill="#666666"
            p-id="5144"
          ></path>
        </svg>
      </div>
    </el-aside>

    <CommonDialog ref="commonAsideRef" />
    <router-view
      :style="{
        marginLeft: width > 1000 ? (width > 1070 ? '200px' : '140px') : '0',
      }"
    ></router-view>
  </el-container>
  <router-view v-else></router-view>
</template>
<style scoped lang="less">
.svgcss {
  background: #e9f2f8;
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
}
</style>