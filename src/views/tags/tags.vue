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
          <el-form-item label="标签所属类型ID : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.number.trim="form.tag_type_id"
              />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button size="small" plain @click="getInfo()">查詢</el-button>
            <el-button size="small" plain @click="ResetgetInfo()"
              >重置</el-button
            >
            <el-button size="small" plain @click="dialogTableVisible = true"
              >添加商品</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="tag_type_id" label="所属类别ID" />
        <el-table-column prop="name" label="标签类型名称" />
        <el-table-column prop="sort" label="排序字段" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" plain @click="deleteInfo(row.ID)"
              >删除</el-button
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
    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <el-form
        :model="AddForm"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
        ref="AddFormRef"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input clearable v-model.trim="AddForm.name" />
        </el-form-item>
        <el-form-item label="标签所属类型ID" prop="tag_type_id">
          <el-input clearable v-model.trim.number="AddForm.tag_type_id" />
        </el-form-item>

        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="dialogTableVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="addInfo()"
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
import { selectTag } from "@/api/home";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  tag_type_id: null,
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
      tableData.value = res.data.data.list;
      if (res.data.data.list.length === 0) {
        ElMessage.error("暂无数据");
      }
      // pagination.value.total = res.data.data.page_size;
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  } catch {
    ElMessage.error("请求失败");
  } finally {
    loading.value = false;
  }
};

const ResetgetInfo = () => {
  form.value = {
    tag_type_id: null,
  };
  pagination.value.page = 1;
  getInfo();
};

const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage;
  getInfo();
};
const dialogTableVisible = ref(false);
const AddForm = ref({
  name: "",
  tag_type_id: null,
});
const rules = ref({
  tag_type_id: [
    { required: true, message: "标签所属类型ID不能为空", trigger: "change" },
    {
      pattern: /^\d+$/,
      message: "标签所属类型ID只能输入数字",
      trigger: "change",
    },
  ],

  name: [{ required: true, message: "标签名称不能为空", trigger: "change" }],
});
const AddFormRef = ref();
const addInfo = async () => {
  AddFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addTag(AddForm.value);
        if (res.data.code === 0) {
          ElMessage.success("添加成功");
          // 清空表单并重置验证状态
          AddFormRef.value.resetFields();
          dialogTableVisible.value = false;
          getInfo();
        } else {
          ElMessage.error(res.data.data.message_zh);
        }
      } catch {
        ElMessage.error("请求失败");
      } finally {
        // dialogTableVisible.value = false;
      }
    } else {
      console.log("验证失败");
    }
  });
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
    