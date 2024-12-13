<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">用户列表</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="姓名 : ">
            <div class="Landscape">
              <el-input clearable v-model.trim="form.full_name" />
            </div>
          </el-form-item>
          <el-form-item label="个性化用户名 : ">
            <div class="Landscape">
              <el-input clearable v-model.trim="form.name" />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button size="small" plain @click="getInfo()">查詢</el-button>
            <el-button size="small" plain @click="ResetgetInfo()"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="个性化用户名" />
        <el-table-column prop="full_name" label="姓名" />
        <el-table-column prop="avatar_url" label="头像地址">
          <template #default="{ row }">
            <img :src="row.avatar_url" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="created_time" label="创建时间" />
        <el-table-column prop="name" label="标签类型名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
      </el-table>

      <div class="fenye">
        <!-- 分页组件 -->
        <el-pagination
          v-model:current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev, pager, next, total"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
      
  <script lang="ts" setup>
import { userList } from "@/api/home";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  full_name: "",
  name: "",
  page: 0,
});

const tableData = ref([]);
const pagination = ref({
  page: 1, // 当前页
  pageSize: 10, // 每页条数
  total: 0, // 数据总条数
});

const getInfo = async () => {
  try {
    loading.value = true;
    const res = await userList(form.value);
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      tableData.value = res.data.data.user_list;
      console.log("res.data.data", res.data.data);

      if (res.data.data.user_list.length === 0) {
        ElMessage.error("暂无数据");
      }
      pagination.value.total = res.data.data.page_size;
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  } catch (err) {
    console.log("err", err);

    ElMessage.error("请求失败");
  } finally {
    loading.value = false;
  }
};

const ResetgetInfo = () => {
  form.value = {
    full_name: "",
    name: "",
    page: 0,
  };
  pagination.value.page = 1;
  getInfo();
};

const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage;
  getInfo();
};

onMounted(() => {
  getInfo();
});
</script>
      
      <style scoped lang="less">
.Landscape {
  display: flex;
}

.home_view {
  padding: 20px;
  width: 100%;
}

.cont {
  width: 100%;
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

.fenye {
  display: flex;
  justify-content: center;
}
</style>
      