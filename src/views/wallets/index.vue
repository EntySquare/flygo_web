<template>
  <div class="home_view">
    <div class="cont">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="address" label="錢包地址" />
        <el-table-column prop="balance" label="錢包餘額" />
        <el-table-column prop="authorized_amount" label="授權數額" />
        <el-table-column label="詳情">
          <template #default="{ row }">
            <el-button
              class="the_details"
              type="primary"
              plain
              @click="handleClick(row.address)"
              >詳情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { QueryAllWallets } from "@/api/wallets";
import router from "@/router";
import { ElMessage } from "element-plus";

// 使用 window.innerWidth 和 window.innerHeight
const width = window.innerWidth;

const handleClick = (address: string) => {
  router.push({
    path: "/echart",
    query: {
      address: address,
    },
  });
};

const storedToken = localStorage.getItem("token");
if (!storedToken) {
  ElMessage.error("請先登入");
  router.push("/login");
}
const tableData = ref([]);
const getUserInfo = async () => {
  const res = await QueryAllWallets();
  if (res.data.code === 0) {
    tableData.value = res.data.json;
  }
  console.log("res", res.data.json);
};

onMounted(async () => {
  getUserInfo();
});
</script>

<style scoped lang="less">
.Landscape {
  display: flex;
}

.home_view {
  padding: 20px;
  width: 100vw;
}

.cont {
  padding: 15px;
  border: 1px solid #eee;
}

.phone_input {
  margin-bottom: 20px;

  :deep(.el-button--small) {
    height: 30px;
    margin: 0;
    margin-left: 10px;
  }
}

.el-table {
  --el-table-header-text-color: #000;
}

:deep(.is-leaf) {
  background-color: #e9f2f8 !important;
}

.el-button {
  margin: 4px;
}

@media (max-width: 768px) {
  .home_view {
    padding: 8px;
    font-size: 12px !important;
  }

  .cont {
    padding: 5px !important;
  }

  :deep(.el-table__header) {
    width: 100% !important;
  }

  :deep(.el-table__body) {
    width: 100% !important;
  }

  .the_details {
    font-size: 12px;
    margin: 0;
    padding: 10px;
  }
}
</style>
