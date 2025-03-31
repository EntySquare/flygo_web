<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">夺宝商品</el-text>
    </div>
    <div class="cont" v-loading="loadingImg">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="商品名 : ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.name"
              />
            </div>
          </el-form-item>
          <el-form-item label="英文商品名 : ">
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
          <el-form-item label="基础库存 : ">
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
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="category_name" label="类型名" />
        <el-table-column prop="description" label="商品描述" />
        <el-table-column prop="image_urls" label="商品图片">
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
                @click="associated_id = row.id"
              >
                <img
                  v-if="row.image_urls"
                  style="width: 46px; height: auto"
                  :src="row.image_urls"
                  alt=""
                />

                <el-button size="small">上传</el-button>
              </div>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名" />
        <el-table-column prop="name_en" label="英文商品名" />
        <el-table-column prop="name_pin_yin" label="拼音商品名" />
        <el-table-column prop="price" label="基础价格" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">{{
            row.status === 0 ? "下架" : "上架"
          }}</template>
        </el-table-column>
        <el-table-column prop="stock" label="基础库存">
          <template #default="{ row }">
            {{ row.stock === 0 ? "库存不足" : "库存充足" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button size="small" plain @click="deleteInfo(row.id)"
                >删除</el-button
              >
              <el-button size="small" plain @click="updateInfoclick(row)"
                >修改</el-button
              >
              <el-button size="small" plain @click="AddSpecificationsClick(row)"
                >添加规格</el-button
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

    <el-dialog
      v-model="dialogTableVisible1"
      title="修改商品"
      style="max-width: 600px"
    >
      <el-form
        :model="UpdateForm"
        ref="UpdateFormRef"
        label-width="auto"
        :rules="UpdateFormrules"
      >
        <el-form-item label="商品描述" prop="description">
          <el-input clearable v-model.trim="UpdateForm.description" />
        </el-form-item>
        <el-form-item label="商品名" prop="name">
          <el-input clearable v-model.trim="UpdateForm.name" />
        </el-form-item>
        <el-form-item label="英文商品名" prop="name_en">
          <el-input clearable v-model.trim="UpdateForm.name_en" />
        </el-form-item>
        <el-form-item label="拼音商品名" prop="name_pin_yin">
          <el-input clearable v-model.trim="UpdateForm.name_pin_yin" />
        </el-form-item>
        <el-form-item label="基础价格" prop="price">
          <el-input clearable v-model.trim="UpdateForm.price" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select
            v-model.number="UpdateForm.status"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in optionsNum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="基础库存" prop="stock">
          <el-input clearable v-model.trim.number="UpdateForm.stock" />
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="dialogTableVisible1 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="UpdateInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="AddSpecificationsVisible"
      title="添加规格"
      style="max-width: 600px"
    >
      <el-form
        :model="AddSpecificationsForm"
        label-width="auto"
        :rules="AddSpecificationsrules"
        ref="AddSpecificationsFormRef"
      >
        <el-form-item label="商品规格ID" prop="product_id">
          <el-input
            clearable
            disabled
            v-model.trim.number="AddSpecificationsForm.product_id"
          />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input clearable v-model.trim="AddSpecificationsForm.price" />
        </el-form-item>
        <el-form-item label="规格名" prop="spec_name">
          <el-input clearable v-model.trim="AddSpecificationsForm.spec_name" />
        </el-form-item>
        <el-form-item label="英文规格名" prop="spec_name_en">
          <el-input
            clearable
            v-model.trim="AddSpecificationsForm.spec_name_en"
          />
        </el-form-item>

        <el-form-item label="状态 : " prop="status">
          <el-select
            v-model="AddSpecificationsForm.status"
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
        <el-form-item label="库存" prop="stock">
          <el-input
            clearable
            v-model.trim.number="AddSpecificationsForm.stock"
          />
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="AddSpecificationsVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="AddSpecificationsInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { addSpec,selectProduct,deleteProduct,updateProduct } from "@/api/treasureHunt";
import { setImageUrls, uploadImages } from "@/api/img";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);

// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  // 商品名
  name: "",
  // 英文商品名
  name_en: "",
  // 拼音商品名
  name_pin_yin: "",
  // 页码 0-查全部 从1开始
  page: 0,
  // 状态 0-下架 1-上架
  status: "",
  // 基础库存 0-库存不足 1-库存充足
  stock: "",
});
const options = [
  { label: "上架", value: "1" },
  { label: "下架", value: "0" },
];
const optionsNum = [
  { label: "上架", value: 1 },
  { label: "下架", value: 0 },
];
const options1 = [
  { label: "库存充足", value: "1" },
  { label: "库存不足", value: "0" },
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
    const res = await selectProduct({
      ...form.value,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      if (res.data.data.list === null || res.data.data.list.length === 0) {
        ElMessage("暂无数据");
        return;
      }
      tableData.value = res.data.data.list; //
      tableData.value.forEach((item: any) => {
        if (item.image_urls !== "") {
          item.image_urls = JSON.parse(item.image_urls)[0];
        }
      });

      pagination.value.total = res.data.data.page_size;
      pagination.value.pageSize = res.data.data.page_size;
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
    name: "",
    name_en: "",
    name_pin_yin: "",
    status: "",
    stock: "",
    page: 0,
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
    const res = await deleteProduct({ product_id: id });
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
const UpdateForm = ref({
  category_id: "",
  description: "",
  name: "",
  name_en: "",
  name_pin_yin: "",
  price: "",
  product_id: "",
  sort: "",
  status: "",
  stock: "",
});
const updateInfoclick = (row: any) => {
  UpdateForm.value = {
    category_id: row.category_id || null,
    description: row.description || "",
    name: row.name || "",
    name_en: row.name_en || "",
    name_pin_yin: row.name_pin_yin || "",
    price: row.price || "",
    product_id: row.id || null,
    sort: row.sort || null,
    status: row.status || null,
    stock: row.stock || null,
  };
  console.log("row", UpdateForm.value);

  dialogTableVisible1.value = true;
};
const UpdateFormRef = ref();
const UpdateFormrules = ref({
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
  status: [
    { required: true, message: "状态不能为空", trigger: "change" },
    { type: "number", message: "状态只能输入数字", trigger: "change" },
  ],
  stock: [
    { required: true, message: "基础库存不能为空", trigger: "change" },
    { type: "number", message: "库存只能输入数字", trigger: "change" },
  ],
});
const UpdateInfo = async () => {
  UpdateFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await updateProduct(UpdateForm.value);
        if (res.data.code === 0) {
          ElMessage.success("修改成功");
          // 清空表单并重置验证状态
          UpdateFormRef.value.resetFields();
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
    } else {
      console.log("验证失败");
    }
  });
};

const AddSpecificationsVisible = ref(false);
const AddSpecificationsForm = ref({
  product_id: null,
  price: "",
  spec_name: "",
  spec_name_en: "",
  stock: null,
  status: null,
});
const AddSpecificationsrules = ref({
  product_id: [
    { required: true, message: "商品id不能为空", trigger: "change" },
    { pattern: /^\d+$/, message: "商品id只能输入数字", trigger: "change" },
  ],
  spec_name: [{ required: true, message: "规格名不能为空", trigger: "change" }],

  spec_name_en: [
    { required: true, message: "英文规格名不能为空", trigger: "change" },
  ],
  price: [{ required: true, message: "价格不能为空", trigger: "change" }],
  status: [{ required: true, message: "状态不能为空", trigger: "change" }],
  stock: [
    { required: true, message: "库存不能为空", trigger: "change" },
    { pattern: /^\d+$/, message: "库存只能输入数字", trigger: "change" },
  ],
});
const AddSpecificationsFormRef = ref();
const AddSpecificationsClick = (row: any) => {
  AddSpecificationsForm.value.product_id = row.id;
  AddSpecificationsVisible.value = true;
};
const AddSpecificationsInfo = async () => {
  AddSpecificationsFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        console.log(
          "AddSpecificationsForm",
          AddSpecificationsForm.value,
          Number()
        );

        const res = await addSpec({
          ...AddSpecificationsForm.value,
          status: Number(AddSpecificationsForm.value.status),
        });
        if (res.data.code === 0) {
          ElMessage.success("添加成功");
          // 清空表单并重置验证状态
          AddSpecificationsFormRef.value.resetFields();
          AddSpecificationsVisible.value = false;
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
    // const formData = new FormData();
    // formData.append("file", file); // 把文件附加到 FormData 对象中
    // 1. 提取文件后缀并重命名
    const originalFileName = file.name;
    const fileExtension = originalFileName.slice(
      originalFileName.lastIndexOf(".")
    ); // 获取文件后缀
    const timestamp = Date.now();
    const newFileName = `${timestamp}img${fileExtension}`; // 使用时间戳命名文件，保留后缀
    // 2. 创建新的文件对象，保持原文件的其他属性
    const renamedFile = new File([file], newFileName, {
      type: file.type, // 原始 MIME 类型
      lastModified: file.lastModified, // 保留原始 lastModified
    });

    const formData = new FormData();
    formData.append("file", renamedFile);
    const response = await uploadImages(formData); // 上传文件 调用你提供的 uploadImages 方法
    console.log("response", response.data.data);
    if (response.data.code === 0) {
      console.log("associated_id", associated_id.value);

      const res = await setImageUrls({
        associated_id: associated_id.value,
        url_list: response.data.data.url_list,
        flag: "2",
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

.el-button {
  margin: 0px;
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
</style>