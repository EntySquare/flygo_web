<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">类别</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="类型ID : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.number.trim="form.id"
              />
            </div>
          </el-form-item>
          <el-form-item label="类型层级 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim.number="form.level"
              />
            </div>
          </el-form-item>
          <el-form-item label="类型名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.name"
              />
            </div>
          </el-form-item>
          <el-form-item label="英文类型名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.name_en"
              />
            </div>
          </el-form-item>
          <el-form-item label="拼音商品名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.name_pin_yin"
              />
            </div>
          </el-form-item>
          <el-form-item label="父级id : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim.number="form.parent_id"
              />
            </div>
          </el-form-item>
          <el-form-item label="排序字段 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim.number="form.sort"
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
        <el-table-column prop="ID" label="类型id" />
        <el-table-column prop="image_urls" label="类型图片">
          <template #default="{ row }">
            <img v-if="row.image_urls" :src="row.image_urls" alt="" />
            <el-text v-else>暂无图片</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="类型层级" />
        <el-table-column prop="name" label="类型名" />
        <el-table-column prop="name_en" label="英文类型名" />
        <el-table-column prop="name_pin_yin" label="拼音类型名" />
        <el-table-column prop="parent_id" label="父级id">
          <template #default="{ row }">
            {{ row.parent_id !== 0 ? row.parent_id : "无父级" }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序字段" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">{{
            row.status === 0 ? "下架" : "上架"
          }}</template>
        </el-table-column>

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
        <el-form-item label="类型ID" prop="category_id">
          <el-input clearable v-model.trim.number="AddForm.category_id" />
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input clearable v-model.trim="AddForm.description" />
        </el-form-item>
        <el-form-item label="商品名" prop="name">
          <el-input clearable v-model.trim="AddForm.name" />
        </el-form-item>
        <el-form-item label="英文商品名" prop="name_en">
          <el-input clearable v-model.trim="AddForm.name_en" />
        </el-form-item>
        <el-form-item label="拼音商品名" prop="name_pin_yin">
          <el-input clearable v-model.trim="AddForm.name_pin_yin" />
        </el-form-item>
        <el-form-item label="基础价格" prop="price">
          <el-input clearable v-model.trim="AddForm.price" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="AddForm.status"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="基础库存" prop="stock">
          <el-select
            v-model="AddForm.stock"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { addProduct } from "@/api/add";
import { deleteProduct } from "@/api/delete";
import { selectCategory } from "@/api/home";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);

// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  id: null,
  level: null,
  name: "",
  name_en: "",
  name_pin_yin: "",
  page: 0,
  parent_id: null,
  sort: null,
});
const options = [
  { label: "上架", value: 1 },
  { label: "下架", value: 0 },
];
const options1 = [
  { label: "库存充足", value: 1 },
  { label: "库存不足", value: 0 },
];
const tableData = ref([]);
const pagination = ref({
  page: 1, // 当前页
  pageSize: 10, // 每页条数
  total: 0, // 数据总条数
});

const getInfo = async () => {
  try {
    loading.value = true;
    const res = await selectCategory({
      ...form.value,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      tableData.value = res.data.data.list; //
      if (res.data.data.list.length === 0) {
        ElMessage.error("暂无数据");
      }
      pagination.value.total = res.data.data.page_size; //
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
    id: null,
    level: null,
    name: "",
    name_en: "",
    name_pin_yin: "",
    page: 0,
    parent_id: null,
    sort: null,
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
  category_id: null,
  description: "",
  name: "",
  name_en: "",
  name_pin_yin: "",
  price: null,
  status: null,
  stock: null,
});
const rules = ref({
  category_id: [
    { required: true, message: "类型ID不能为空", trigger: "change" },
    { pattern: /^\d+$/, message: "类型ID只能输入数字", trigger: "change" },
  ],
  description: [
    { required: true, message: "商品描述不能为空", trigger: "change" },
  ],
  name: [{ required: true, message: "商品名不能为空", trigger: "change" }],
  name_en: [
    { required: true, message: "英文商品名不能为空", trigger: "change" },
  ],
  name_pin_yin: [
    { required: true, message: "拼音商品名不能为空", trigger: "change" },
  ],
  price: [{ required: true, message: "基础价格不能为空", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
  stock: [{ required: true, message: "请选择基础库存", trigger: "change" }],
});
const AddFormRef = ref();
const addInfo = async () => {
  AddFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addProduct(AddForm.value);
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
    const res = await deleteProduct({ category_id: id });
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
.footer {
  display: flex;
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>