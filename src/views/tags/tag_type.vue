<template>
  <div class="home_view">
    <div class="title" style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">标签类型</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="所属类别名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim.number="form.category_name"
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
      <el-table :data="tableData" style="max-width: 100%" v-loading="loading">
        <el-table-column prop="category_name" label="所属类别名" />
        <el-table-column prop="name" label="标签类型名称" />

        <!-- <el-table-column prop="product_spec_id" label="商品规格id" />
        <el-table-column prop="tag_id" label="标签id" /> -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" plain @click="deleteInfo(row.id)"
              >删除</el-button
            >
            <el-button size="small" plain @click="updateInfoclick(row)"
              >修改</el-button
            >
            <el-button size="small" plain @click="AddTagsclick(row)"
              >添加标签</el-button
            >
            <el-button size="small" plain @click="DetailClick(row.id)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <!-- <div class="fenye">
        <el-pagination
          v-model:current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev, pager, next, total"
          @current-change="handlePageChange"
        />
      </div> -->
    </div>

    <el-dialog
      v-model="dialogTableVisible1"
      title="修改标签类型"
      style="max-width: 600px"
    >
      <el-form :model="updateForm" label-width="auto">
        <!-- <el-form-item label="所属类别ID" prop="category_id">
          <el-input clearable v-model.trim.number="updateForm.category_id" />
        </el-form-item> -->
        <el-form-item label="标签类型名称" prop="name">
          <el-input clearable v-model.trim="updateForm.name" />
        </el-form-item>

        <!-- <el-form-item label="标签类型ID" prop="tag_type_id">
          <el-input clearable v-model.trim="updateForm.tag_type_id" />
        </el-form-item> -->
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
    <el-dialog v-model="tagsVisible" title="添加标签" style="max-width: 600px">
      <el-form
        :model="tagsForm"
        label-width="auto"
        :rules="tagsrules"
        ref="tagsFormRef"
      >
        <el-form-item label="标签所属类型ID" prop="tag_type_id">
          <el-input
            clearable
            v-model.trim.number="tagsForm.tag_type_id"
            disabled
          />
        </el-form-item>
        <el-form-item label="标签名称" prop="name">
          <el-input clearable v-model.trim="tagsForm.name" />
        </el-form-item>

        <el-form-item class="footer">
          <el-button plain style="width: 48%" @click="tagsVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="tagsInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      style="width: 90%"
      v-model="DetailsdialogTableVisible"
      title="标签详情"
    >
      <div class="cont">
        <el-table :data="tagstableData" style="width: 100%">
          <el-table-column prop="tag_type_name" label="所属标签类型名" />
          <el-table-column prop="name" label="标签类型名称" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button size="small" plain @click="tagsdeleteInfo(row.id)"
                >删除</el-button
              >
              <el-button size="small" plain @click="tagsupdateInfoclick(row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      v-model="tagsdialogTableVisible1"
      title="修改标签"
      style="max-width: 600px"
    >
      <el-form
        :model="tagsupdateForm"
        label-width="auto"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input clearable v-model.trim="tagsupdateForm.name" />
        </el-form-item>
        <!-- <el-form-item label="标签id" prop="tag_id">
          <el-input clearable v-model.trim.number="updateForm.tag_id" />
        </el-form-item> -->
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="tagsdialogTableVisible1 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="tagsupdateInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
    
    <script lang="ts" setup>
import { addTag, addTagType } from "@/api/add";
import { deleteTag, deleteTagType } from "@/api/delete";
import { selectTag, selectTagType } from "@/api/Querying";
import { updateTag, updateTagType } from "@/api/update";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
const form = ref({
  category_name: null,
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
    const res = await selectTagType(form.value);
    if (res.data.code === 0) {
      if (res.data.data.list === null || res.data.data.list.length === 0) {
        ElMessage("暂无数据");
        return;
      }
      tableData.value = res.data.data.list; //
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
    category_name: null,
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
    const res = await deleteTagType({ tag_type_id: id });
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
  tag_type_id: null,
});
const updateInfoclick = (row: any) => {
  updateForm.value = {
    name: row.name || "",
    sort: row.sort || null,

    tag_type_id: row.id || null,
  };
  dialogTableVisible1.value = true;
};
const updateInfo = async () => {
  if (updateForm.value.name.trim() === "") {
    ElMessage.error("标签类型名称不能为空");
    return;
  }
  try {
    const res = await updateTagType(updateForm.value);
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

const tagsVisible = ref(false);
const tagsForm = ref({
  name: "",
  tag_type_id: null,
});
const tagsrules = ref({
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
const tagsFormRef = ref();
const AddTagsclick = (row: any) => {
  tagsForm.value.tag_type_id = row.id;
  tagsVisible.value = true;
};
const tagsInfo = async () => {
  tagsFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addTag(tagsForm.value);
        if (res.data.code === 0) {
          ElMessage.success("添加成功");
          // 清空表单并重置验证状态
          tagsFormRef.value.resetFields();
          tagsVisible.value = false;
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
const DetailID = ref();
const DetailClick = (id: number) => {
  //数组清空
  tagstableData.value = [];
  DetailID.value = id;
  console.log("DetailID", DetailID.value);
  tagsgetInfo();

  DetailsdialogTableVisible.value = true;
};
const DetailsdialogTableVisible = ref(false);
onMounted(() => {
  getInfo();
});

const tagstableData = ref([]);

const tagsgetInfo = async () => {
  try {
    const res = await selectTag({
      tag_type_id: DetailID.value,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      // console.log("res.data.data", res.data.data);

      if (res.data.data.list === null || res.data.data.list.length === 0) {
        ElMessage("暂无数据");
        return;
      }
      tagstableData.value = res.data.data.list;
    } else {
      // ElMessage.error(res.data.data.message_zh);
    }
  } catch {
    ElMessage.error("请求失败");
  }
};

const tagsdeleteInfo = async (id: number) => {
  console.log("id", id);
  try {
    const res = await deleteTag({ tag_id: id });
    if (res.data.code === 0) {
      ElMessage.success("删除成功");
      tagsgetInfo();
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  } catch {}
};
const tagsdialogTableVisible1 = ref(false);
const tagsupdateForm = ref({
  name: "",
  sort: "",
  tag_id: null,
});
const tagsupdateInfoclick = (row: any) => {
  tagsupdateForm.value = {
    name: row.name || "",
    sort: row.sort || null,
    tag_id: row.id || null,
  };
  console.log("tagsupdateForm", tagsupdateForm.value);
  tagsdialogTableVisible1.value = true;
};
const tagsupdateInfo = async () => {
  if (tagsupdateForm.value.name.trim() === "") {
    ElMessage.error("标签名称不能为空");
    return;
  }
  console.log("tagsupdateForm111111", tagsupdateForm.value);
  try {
    const res = await updateTag(tagsupdateForm.value);
    if (res.data.code === 0) {
      ElMessage.success("修改成功");
      // 清空表单并重置验证状态
      tagsupdateForm.value = {
        name: "",
        sort: "",
        tag_id: null,
      };

      tagsdialogTableVisible1.value = false;
      tagsgetInfo();
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  } catch {
    ElMessage.error("请求失败");
  } finally {
    // dialogTableVisible1.value = false;
  }
};
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
    