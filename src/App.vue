
<script setup lang="ts">
import { ref } from "vue";
const defaultActive = ref("/dashboard");
</script>
<template>
  <!-- <Suspense> 是一个用于实现组件延迟加载和异步渲染的组件 -->
  <!-- 一级路由出口 -->
  <el-container>
    <el-aside width="200px" class="sidebar">
      <CommonAside />
    </el-aside>

    <router-view></router-view>
  </el-container>
</template>
<style scoped lang="less"></style>
