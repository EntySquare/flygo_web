<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">规格</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="商品id : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim.number="form.product_id"
              />
            </div>
          </el-form-item>
          <el-form-item label="规格名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.spec_name"
              />
            </div>
          </el-form-item>
          <el-form-item label="英文规格名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.spec_name_en"
              />
            </div>
          </el-form-item>

          <el-form-item label="状态 : ">
            <div class="Landscape">
              <el-select
                v-model="form.status"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="库存 : ">
            <div class="Landscape">
              <el-select
                v-model="form.stock"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
        <el-table-column prop="product_id" label="商品id" />
        <el-table-column prop="image_urls" label="商品图片">
          <template #default="{ row }">
            <img :src="row.image_urls" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="sort" label="排序字段" />
        <el-table-column prop="spec_name" label="规格名" />
        <el-table-column prop="spec_name_en" label="英文规格名" />

        <el-table-column prop="status" label="状态">
          <template #default="{ row }">{{
            row.status === 0 ? "下架" : "上架"
          }}</template>
        </el-table-column>
        <el-table-column prop="stock" label="基础库存" />
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
        <el-form-item label="商品ID" prop="product_id">
          <el-input clearable v-model.trim.number="AddForm.product_id" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input clearable v-model.trim="AddForm.price" />
        </el-form-item>
        <el-form-item label="规格名" prop="spec_name">
          <el-input clearable v-model.trim="AddForm.spec_name" />
        </el-form-item>
        <el-form-item label="英文规格名" prop="spec_name_en">
          <el-input clearable v-model.trim="AddForm.spec_name_en" />
        </el-form-item>

        <el-form-item label="库存" prop="stock">
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
import { addSpec } from "@/api/add";
import { deleteSpec } from "@/api/delete";
import { selectSpec } from "@/api/home";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  product_id: null,
  spec_name: "",
  spec_name_en: "",
  // 页码 0-查全部 从1开始
  page: 0,
  // 状态 0-下架 1-上架
  status: null,
  // 基础库存 0-库存不足 1-库存充足
  stock: null,
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
    const res = await selectSpec({
      ...form.value,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      tableData.value = res.data.data.list; //
      if (res.data.data.list.length === 0) {
        ElMessage.error("暂无数据");
      }
      pagination.value.total = res.data.data.page_size;
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
    product_id: null,
    spec_name: "",
    spec_name_en: "",
    status: null,
    stock: null,
    page: 0,
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
  product_id: null,
  price: "",
  spec_name: "",
  spec_name_en: "",
  stock: null,
});
const rules = ref({
  product_id: [
    { required: true, message: "商品id不能为空", trigger: "change" },
    { pattern: /^\d+$/, message: "商品id只能输入数字", trigger: "change" },
  ],
  spec_name: [{ required: true, message: "规格名不能为空", trigger: "change" }],

  spec_name_en: [
    { required: true, message: "英文规格名不能为空", trigger: "change" },
  ],
  price: [{ required: true, message: "价格不能为空", trigger: "change" }],
  stock: [{ required: true, message: "请选择库存", trigger: "change" }],
});
const AddFormRef = ref();
const addInfo = async () => {
  AddFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addSpec(AddForm.value);
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
    const res = await deleteSpec({ spec_id: id });
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
  