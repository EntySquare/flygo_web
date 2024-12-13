<template>
  <div class="tabMenu">
    <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
      <template v-for="item in data" :key="item.name">
        <el-menu-item v-if="!item.children" :index="item.path">
          <span>{{ item.lable }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template>
            <span>{{ item.lable }}</span>
          </template>

          <!-- 递归渲染子菜单 -->
          <template v-for="child in item.children" :key="child.name">
            <el-menu-item v-if="!child.children" :index="child.path">
              <span>{{ child.lable }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="child.path">
              <template>
                <span>{{ child.lable }}</span>
              </template>
              <!-- 子菜单递归 -->
              <CommonAsideSubMenu :data="child.children" />
            </el-sub-menu>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>



<script lang="ts" setup name="CommonAside">
import { defineProps } from "vue";

// 引入 data 数据，假设 data 是路由配置
import data from "@/router/data";
import exp from "constants";

// 可抽离递归逻辑为单独的子组件
defineProps<{ data: Array<any> }>();
</script>

<style scoped lang="less">
.tabMenu {
  height: 100vh;

  .el-menu-vertical-demo {
    height: 100vh;
  }
  ::v-deep(.el-menu-item.is-active) {
    background-color: #333 !important;
    color: #fff !important;
  }

  ::v-deep(.el-sub-menu__title.is-active) {
    background-color: #444 !important;
    color: #fff !important;
  }
}
</style>
