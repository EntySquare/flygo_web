<template>
  <div>
    <el-drawer
      v-model="isVisible"
      :with-header="false"
      direction="ltr"
      size="210px"
    >
      <CommonAside />
    </el-drawer>
  </div>
</template>

<script lang="ts" setup name="CommonAside">
import router from "@/router";
import { onMounted, ref } from "vue";
// 可抽离递归逻辑为单独的子组件
defineProps();
const isVisible = ref(false);

function openDrawer() {
  isVisible.value = true;
}
function closeDrawer() {
  isVisible.value = false;
}
// 监听路由变化，路由切换时关闭抽屉
onMounted(() => {
  router.afterEach(() => {
    closeDrawer();
  });
});
defineExpose({
  openDrawer,
  closeDrawer,
});
</script>

<style scoped lang="less">
:deep(.el-drawer__body) {
  padding: 0 !important;
}
// :deep(.el-drawer) {
//   --el-drawer-padding-primary: var(--el-dialog-padding-primary, 0px) !important;
// }
</style>
