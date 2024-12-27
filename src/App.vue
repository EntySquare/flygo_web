
<script setup lang="ts">
import { ref } from "vue";
import { useWindowSize } from "@/utils/useWindowSize";

const { width, height } = useWindowSize();
// 获取 CommonAside 组件实例
const commonAsideRef = ref();

// 调用 CommonAside 的 openDrawer 方法
function openCommonAside() {
  if (commonAsideRef.value) {
    commonAsideRef.value.openDrawer();
  }
}
</script>
<template>
  <!-- <Suspense> 是一个用于实现组件延迟加载和异步渲染的组件 -->
  <!-- 一级路由出口 -->
  <el-container>
    <!-- <div style="font-size: 30px; background: #000">{{ width }}</div> -->
    <el-aside
      :width="width > 1070 ? '200px' : '140px'"
      class="sidebar"
      v-if="width > 1000"
    >
      <CommonAside />
    </el-aside>
    <el-aside class="svgcss" v-else @click="openCommonAside">
      <div>
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
    <router-view></router-view>
  </el-container>
</template>
<style scoped lang="less">
.svgcss {
  background: #efecec;
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
