<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">类别列表</el-text>
    </div>
    <div class="cont" v-loading="loadingImg">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="类型名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="CategoriesForm.name"
              />
            </div>
          </el-form-item>
          <el-form-item label="英文类型名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="CategoriesForm.name_en"
              />
            </div>
          </el-form-item>
          <el-form-item label="拼音类型名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="CategoriesForm.name_pin_yin"
              />
            </div>
          </el-form-item>
          <el-form-item label="父级类名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="CategoriesForm.parent_name"
              />
            </div>
          </el-form-item>
          <el-form-item label="类型层级 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim.number="CategoriesForm.level"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button size="small" plain @click="getInfo()">查詢</el-button>
              <el-button size="small" plain @click="ResetgetInfo()"
                >重置</el-button
              >
              <el-button size="small" plain @click="Addclick"
                >添加商品</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <!-- <el-table-column prop="id" label="类型id" /> -->
        <el-table-column prop="name" label="类型名" />
        <el-table-column prop="name_en" label="英文类型名" />
        <el-table-column prop="name_pin_yin" label="拼音类型名" />

        <el-table-column prop="image_urls" label="类型图片">
          <template #default="{ row }">
            <!-- {{ row.image_urls }} -->

            <!-- 上传按钮 -->
            <el-upload
              :action="''"
              :before-upload="handleBeforeUpload"
              :file-list="fileList"
              :limit="1"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :on-change="handleFileChange"
              :show-file-list="false"
            >
              <div
                style="
                  display: flex;
                  flex-wrap: wrap;
                  gap: 4px;
                  flex-direction: column;
                "
              >
                <img
                  v-if="row.image_urls"
                  style="width: 46px; height: auto"
                  :src="row.image_urls"
                  alt=""
                />

                <el-button size="small" @click="associated_id = row.id"
                  >上传</el-button
                >
              </div>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="parent_name" label="父级类名">
          <template #default="{ row }">
            {{ row.parent_name !== "" ? row.parent_name : "暂无" }}
          </template>
        </el-table-column>
        <el-table-column prop="level" label="类型层级" />

        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button size="small" plain @click="deleteInfo(row.id)"
                >删除</el-button
              >
              <el-button size="small" plain @click="updateInfoclick(row)"
                >修改</el-button
              >
              <el-button
                size="small"
                v-if="row.parent_id === 0"
                plain
                @click="AddChildclick(row)"
                >添加子类</el-button
              >
              <el-button
                size="small"
                v-if="row.parent_id !== 0"
                plain
                @click="AddCommodityclick(row)"
                >添加商品</el-button
              >
              <el-button
                size="small"
                v-if="row.parent_id !== 0"
                plain
                @click="AddTagTypeclick(row)"
                >添加标签类型</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="fenye">
        <el-pagination
          v-model:current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev, pager, next, total"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <el-dialog v-model="dialogTableVisible" title="添加子类">
      <el-form
        :model="AddForm"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
        ref="AddFormRef"
      >
        <el-form-item label="类型名" prop="name">
          <el-input clearable v-model.trim="AddForm.name" />
        </el-form-item>

        <el-form-item label="英文类型名" prop="name_en">
          <el-input clearable v-model.trim="AddForm.name_en" />
        </el-form-item>
        <el-form-item label="拼音类型名" prop="name_pin_yin">
          <el-input clearable v-model.trim="AddForm.name_pin_yin" />
        </el-form-item>
        <el-form-item label="父级id" prop="parent_id">
          <el-input
            clearable
            v-model.trim.number="AddForm.parent_id"
            disabled
          />
        </el-form-item>

        <el-form-item class="footer">
          <el-button plain style="width: 48%" @click="addChildCancel"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="addChildInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="dialogTableVisible1" title="修改类别">
      <el-form :model="updateForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="类型名" prop="name">
          <el-input clearable v-model.trim="updateForm.name" />
        </el-form-item>
        <el-form-item label="英文类型名" prop="name_en">
          <el-input clearable v-model.trim="updateForm.name_en" />
        </el-form-item>
        <el-form-item label="拼音类型名" prop="name_pin_yin">
          <el-input clearable v-model.trim="updateForm.name_pin_yin" />
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
    <el-dialog v-model="CommodityVisible" title="添加商品">
      <el-form
        :model="CommodityForm"
        label-width="auto"
        style="max-width: 600px"
        :rules="Commodityrules"
        ref="CommodityFormRef"
      >
        <el-form-item label="类型ID" prop="category_id">
          <el-input
            clearable
            v-model.trim.number="CommodityForm.category_id"
            disabled
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input clearable v-model.trim="CommodityForm.description" />
        </el-form-item>
        <el-form-item label="商品名" prop="name">
          <el-input clearable v-model.trim="CommodityForm.name" />
        </el-form-item>
        <el-form-item label="英文商品名" prop="name_en">
          <el-input clearable v-model.trim="CommodityForm.name_en" />
        </el-form-item>
        <el-form-item label="拼音商品名" prop="name_pin_yin">
          <el-input clearable v-model.trim="CommodityForm.name_pin_yin" />
        </el-form-item>
        <el-form-item label="基础价格" prop="price">
          <el-input clearable v-model.trim="CommodityForm.price" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="CommodityForm.status"
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
          <el-input clearable v-model.trim.number="CommodityForm.stock" />
        </el-form-item>
        <el-form-item class="footer">
          <el-button plain style="width: 48%" @click="CommodityVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="CommodityInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="tagTypeVisible" title="添加标签类型">
      <el-form
        :model="tagTypeForm"
        label-width="auto"
        style="max-width: 600px"
        :rules="tagTyperules"
        ref="tagTypeFormRef"
      >
        <el-form-item label="所属类别id" prop="category_id">
          <el-input clearable v-model.trim="tagTypeForm.category_id" disabled />
        </el-form-item>
        <el-form-item label="标签类型名称" prop="name">
          <el-input clearable v-model.trim="tagTypeForm.name" />
        </el-form-item>
        <el-form-item class="footer">
          <el-button plain style="width: 48%" @click="tagTypeVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="tagTypeInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { addCategory, addProduct, addTagType } from "@/api/add";
import { deleteCategory } from "@/api/delete";
import { setImageUrls, uploadImages } from "@/api/img";
import { selectCategory } from "@/api/Querying";
import { updateCategory } from "@/api/update";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);

// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const CategoriesForm = ref({
  id: null,
  level: null,
  name: "",
  name_en: "",
  name_pin_yin: "",
  page: 0,
  parent_name: "",
  sort: null,
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
    const res = await selectCategory({
      ...CategoriesForm.value,
      level: CategoriesForm.value.level || null,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      if (res.data.data.list === null || res.data.data.list.length === 0) {
        ElMessage("暂无数据");
        return;
      }
      tableData.value = res.data.data.list; //
      pagination.value.total = res.data.data.page_size; //
      pagination.value.pageSize = res.data.data.page_size; //
      tableData.value.forEach((item: any) => {
        if (item.image_urls !== "") {
          item.image_urls = JSON.parse(item.image_urls)[0];
        }
      });
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
  CategoriesForm.value = {
    id: null,
    level: null,
    name: "",
    name_en: "",
    name_pin_yin: "",
    page: 0,
    parent_name: "",
    sort: null,
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
    const res = await deleteCategory({ category_id: id });
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
  category_id: null,
  name: "",
  name_en: "",
  name_pin_yin: "",
  sort: null,
});
const updateInfoclick = (row: any) => {
  updateForm.value = {
    category_id: row.id || null,

    name: row.name || "",
    name_en: row.name_en || "",
    name_pin_yin: row.name_pin_yin || "",
    sort: row.sort || null,
  };
  dialogTableVisible1.value = true;
};
// ! 更新类别
const updateInfo = async () => {
  try {
    const res = await updateCategory(updateForm.value);
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

// ! 添加类别
const dialogTableVisible = ref(false);
const AddChildclick = (row: any) => {
  AddForm.value.parent_id = row.id;
  console.log("row.id", row.id);
  dialogTableVisible.value = true;
};
const AddForm = ref({
  name: "",
  name_en: "",
  name_pin_yin: "",
  parent_id: 0,
});
const rules = ref({
  name: [{ required: true, message: "类型名不能为空", trigger: "change" }],
  name_en: [
    { required: true, message: "英文类型名不能为空", trigger: "change" },
  ],
  name_pin_yin: [
    { required: true, message: "拼音类型名不能为空", trigger: "change" },
  ],
  parent_id: [{ required: true, message: "父级id不能为空", trigger: "change" }],
});
const AddFormRef = ref();
const Addclick = () => {
  AddForm.value.parent_id = 0;
  dialogTableVisible.value = true;
};
const addChildInfo = async () => {
  AddFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addCategory(AddForm.value);
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
const addChildCancel = () => {
  dialogTableVisible.value = false;
  // 清空表单验证
  AddFormRef.value.resetFields();
};

// ! 添加商品

const options = [
  { label: "上架", value: 1 },
  { label: "下架", value: 0 },
];

const CommodityVisible = ref(false);
const CommodityForm = ref({
  category_id: null,
  description: "",
  name: "",
  name_en: "",
  name_pin_yin: "",
  price: null,
  status: null,
  stock: null,
});
const Commodityrules = ref({
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
  stock: [{ required: true, message: "基础库存不能为空", trigger: "change" }],
});
const AddCommodityclick = (row: any) => {
  CommodityForm.value.category_id = row.id;
  CommodityVisible.value = true;
};
const CommodityFormRef = ref();
const CommodityInfo = async () => {
  CommodityFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addProduct(CommodityForm.value);
        console.log("res.data.code", res.data.code);

        if (res.data.code === 0) {
          ElMessage.success("添加成功");
          //   // 清空表单并重置验证状态
          CommodityFormRef.value.resetFields();
          CommodityVisible.value = false;
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

// ! 添加标签类型
const tagTypeVisible = ref(false);
const tagTypeForm = ref({
  category_id: null,
  name: "",
});
const tagTyperules = ref({
  category_id: [
    { required: true, message: "所属类别名不能为空", trigger: "change" },
  ],

  name: [{ required: true, message: "商品名不能为空", trigger: "change" }],
});

const tagTypeFormRef = ref();
const AddTagTypeclick = (row: any) => {
  tagTypeForm.value.category_id = row.id;
  tagTypeVisible.value = true;
};
const tagTypeInfo = async () => {
  tagTypeFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await addTagType({ ...tagTypeForm.value });
        if (res.data.code === 0) {
          ElMessage.success("添加成功");
          // 清空表单并重置验证状态
          tagTypeFormRef.value.resetFields();
          tagTypeVisible.value = false;
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

const fileList = ref<File[]>([]); // 存储文件列表

// 最大文件大小（40MB）
const MAX_FILE_SIZE = 40 * 1024 * 1024;

// 允许的图片类型（拓展名）
const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|gif)$/i; // 支持jpg、jpeg、png、gif等图片格式

// 文件校验逻辑：校验文件大小和文件扩展名
const handleBeforeUpload = async (file: File) => {
  // 校验文件大小
  if (file.size > MAX_FILE_SIZE) {
    ElMessage.error("图片大小超过 40MB，请选择更小的图片！");
    return false; // 阻止上传
  }

  // 校验文件扩展名
  const fileExtension = file.name.split(".").pop();
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    ElMessage.error("只允许上传 JPG、JPEG、PNG 或 GIF 格式的图片！");
    return false; // 阻止上传
  }

  // 文件扩展名
  const extension = fileExtension ? fileExtension.toLowerCase() : "";

  // 如果文件校验通过，进行文件上传，并将扩展名传递给后端
  await uploadFile(file, extension);
  return false; // 阻止默认上传行为，使用自定义上传方法
};
const loadingImg = ref(false);
const associated_id = ref("");
// 文件上传函数
const uploadFile = async (file: File, extension: string) => {
  try {
    loadingImg.value = true;
    const formData = new FormData();
    formData.append("file", file); // 把文件附加到 FormData 对象中
    const response = await uploadImages(formData); // 上传文件 调用你提供的 uploadImages 方法
    console.log("response", response.data.data);
    if (response.data.code === 0) {
      console.log("associated_id", associated_id.value);

      const res = await setImageUrls({
        associated_id: associated_id.value,
        url_list: response.data.data.url_list,
        flag: "1",
      });
      console.log("res", res);
      ElMessage.success("图片上传成功！");
      getInfo();
    } else {
      ElMessage.error("图片上传失败！");
    }
  } catch (error) {
    ElMessage.error("上传请求失败，请稍后再试！");
    console.error("上传失败", error);
  } finally {
    loadingImg.value = false;
  }
};

// 上传成功时的回调
const handleUploadSuccess = (response: any, file: File) => {
  ElMessage.success("图片上传成功！");
  console.log("上传成功", response);
};

// 上传失败时的回调
const handleUploadError = (error: any, file: File, fileList: File[]) => {
  ElMessage.error("上传失败，请稍后再试！");
  console.error("上传失败", error);
};

// 文件选择变化时的回调
const handleFileChange = (file: File, fileList: File[]) => {
  // 在文件列表变化时更新文件列表
  fileList = fileList;
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
:deep(.el-upload) {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
}
:deep(.el-button + .el-button) {
  margin-left: 0;
}
</style>