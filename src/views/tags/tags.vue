<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">标签</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="标签所属类型名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.tag_type_name"
              />
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
        <el-table-column prop="tag_type_name" label="所属类别名" />
        <el-table-column prop="name" label="标签类型名称" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" plain @click="deleteInfo(row.id)"
              >删除</el-button
            >
            <el-button size="small" plain @click="updateInfoclick(row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
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

    <el-dialog v-model="dialogTableVisible1" title="修改标签">
      <el-form :model="updateForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="标签名称" prop="name">
          <el-input clearable v-model.trim="updateForm.name" />
        </el-form-item>
        <el-form-item label="标签id" prop="tag_id">
          <el-input clearable v-model.trim.number="updateForm.tag_id" />
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="dialogTableVisible1 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="updateInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
    
<script lang="ts" setup>
import { addTag } from "@/api/add";
import { deleteTag } from "@/api/delete";
import { selectTag } from "@/api/Querying";
import { updateTag } from "@/api/update";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  tag_type_name: "",
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
    const res = await selectTag({
      ...form.value,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      // console.log("res.data.data", res.data.data);

      if (res.data.data.list === null || res.data.data.list.length === 0) {
        ElMessage("暂无数据");
        return;
      }
      tableData.value = res.data.data.list;
      pagination.value.total = res.data.data.page_size;
    } else {
      // ElMessage.error(res.data.data.message_zh);
    }
  } catch {
    ElMessage.error("请求失败");
  } finally {
    loading.value = false;
  }
};

const ResetgetInfo = () => {
  form.value = {
    tag_type_name: "",
  };
  pagination.value.page = 1;
  getInfo();
};

const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage;
  getInfo();
};

const deleteInfo = async (id: number) => {
  console.log("id", id);
  try {
    loading.value = true;
    const res = await deleteTag({ tag_id: id });
    if (res.data.code === 0) {
      ElMessage.success("删除成功");
      getInfo();
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  } catch {
  } finally {
    loading.value = false;
  }
};
const dialogTableVisible1 = ref(false);
const updateForm = ref({
  name: "",
  sort: "",
  tag_id: null,
});
const updateInfoclick = (row: any) => {
  updateForm.value = {
    name: row.name || "",
    sort: row.sort || null,
    tag_id: row.id || null,
  };
  dialogTableVisible1.value = true;
};
const updateFormRef = ref();
const updateInfo = async () => {
  try {
    const res = await updateTag(updateForm.value);
    if (res.data.code === 0) {
      ElMessage.success("修改成功");
      // 清空表单并重置验证状态

      dialogTableVisible1.value = false;
      getInfo();
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  } catch {
    ElMessage.error("请求失败");
  } finally {
    // dialogTableVisible1.value = false;
  }
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
    