<template>
  <div class="home_view">
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="hash : ">
            <div class="Landscape">
              <el-input v-model.trim="formHash" />
              <el-button size="small" plain @click="handleSubmit('hash')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="姓名 : ">
            <div class="Landscape">
              <el-input v-model.trim="formName" />
              <el-button size="small" plain @click="handleSubmit('name')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="身份證 : ">
            <div class="Landscape">
              <el-input v-model.trim="formIdCard" />
              <el-button size="small" plain @click="handleSubmit('id_card')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="手機號 : ">
            <div class="Landscape">
              <el-input v-model.trim="formPhone" />
              <el-button size="small" plain @click="handleSubmit('phone')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="hash" label="hash" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="id_card" label="身份證號碼" />
        <el-table-column prop="phone" label="手機號" />
      </el-table>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { onMounted, ref } from "vue";
const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const tableData = ref();
const getInfo = async () => {
  const res = await viewUserInfo({});
  try {
    loading.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  getInfo();
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
  