<template>
  <!-- 规格 -->
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">规格</el-text>
    </div>
    <div class="cont" v-loading="loadingImg">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
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
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="product_name" label="商品名" />
        <el-table-column prop="spec_name" label="规格名" />
        <el-table-column prop="spec_name_en" label="英文规格名" />
        <el-table-column prop="image_urls" label="规格图片">
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
                  flex-direction: column;
                  flex-wrap: wrap;
                  gap: 4px;
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
        <el-table-column prop="price" label="价格" />

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
              <el-button size="small" plain @click="AddProductLabels(row)"
                >修改商品标签</el-button
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

    <el-dialog v-model="dialogTableVisible1" title="修改规格">
      <el-form
        ref="updateFormRef"
        :model="updateForm"
        label-width="auto"
        :rules="rules"
        style="max-width: 600px"
      >
        <el-form-item label="价格" prop="price">
          <el-input clearable v-model.trim="updateForm.price" />
        </el-form-item>

        <el-form-item label="规格名" prop="spec_name">
          <el-input clearable v-model.trim="updateForm.spec_name" />
        </el-form-item>
        <el-form-item label="英文规格名" prop="spec_name_en">
          <el-input clearable v-model.trim="updateForm.spec_name_en" />
        </el-form-item>

        <el-form-item label="状态 : " prop="status">
          <el-select
            v-model="updateForm.status"
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
          <el-input clearable v-model.trim.number="updateForm.stock" />
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
    <el-dialog
      v-model="AddProductLabelsVisible"
      title="修改商品标签"
      @close="resetSelectedTags"
      @cancel="resetSelectedTags"
    >
      <el-form
        :model="AddProductLabelsForm"
        label-width="auto"
        style="max-width: 600px"
        ref="AddProductLabelsFormRef"
      >
        <el-form-item label="商品规格名" prop="product_spec_name">
          <el-input
            clearable
            disabled
            v-model.trim="uploadProductForm.product_spec_name"
          />
        </el-form-item>

        <div
          v-if="ProductLabelsList === null"
          style="text-align: center; margin-top: 20px"
        >
          暂无商品标签可修改
        </div>
        <!-- <el-form-item label="标签"></el-form-item> -->
        <div v-else>
          <el-text class="mx-1" size="large">标签</el-text>
          <div style="height: 10px"></div>
          <!-- <el-form-item
            label=""
            prop="tag_name"
            v-for="(item, index) in ProductLabelsList"
            :key="index"
          >
            <el-text class="mx-1" size="" style="margin: 0 10px">{{
              item.name
            }}</el-text>
            {{ item.tags.name }}
            <el-select
              v-model="item.tags.name"
              placeholder="输入商品标签"
              style="width: 100%"
            >
              <el-option
                v-for="i in item.tags"
                :key="i.id"
                :label="i.name"
                :value="i.name"
              />
            </el-select>
          </el-form-item> -->
          <div v-for="(group, index) in ProductLabelsList" :key="index">
            <el-select
              v-model="selectedTags[group.name]"
              :placeholder="`选择${group.name}`"
              style="width: 100%"
              @change="handleTagChange(group.name, $event)"
            >
              <!-- 渲染标签项 -->
              <el-option
                v-for="tag in group.tags"
                :key="tag.id"
                :label="tag.name"
                :value="tag.id"
              />
            </el-select>
            <!-- <div v-if="selectedTags[group.name]">
              选择的{{ group.name }}标签ID: {{ selectedTags[group.name] }}
            </div> -->
            <el-divider />
          </div>
        </div>
        <el-form-item
          class="footer"
          style="margin-top: 14px"
          v-if="ProductLabelsList === null"
        >
          <el-button
            plain
            style="width: 100%"
            @click="AddProductLabelsVisible = false"
            >取消</el-button
          >
        </el-form-item>
        <el-form-item class="footer" v-else>
          <el-button
            plain
            style="width: 48%"
            @click="AddProductLabelsVisible = false"
            >取消</el-button
          >
          <el-button
            plain
            style="width: 48%"
            v-if="ProductLabelsList !== null"
            @click="AddProductLabelsInfo"
            >修改商品标签</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script lang="ts" setup>
import { addProductTag, addSpec } from "@/api/add";
import { deleteSpec } from "@/api/delete";
import { getAvailableTag, selectSpec } from "@/api/Querying";
import { setImageUrls, uploadImages } from "@/api/img";
import { updateProductTag, updateSpec } from "@/api/update";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
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

const dialogTableVisible1 = ref(false);
const updateForm = ref({
  price: "",
  sort: "",
  spec_id: null,
  spec_name: null,
  spec_name_en: null,
  stock: null,
  status: "",
});
const updateInfoclick = (row: any) => {
  updateForm.value = {
    price: row.price || "",
    sort: row.sort || null,
    spec_id: row.id || null,
    spec_name: row.spec_name || "",
    spec_name_en: row.spec_name_en || "",
    stock: row.stock || null,
    status: row.status,
  };
  dialogTableVisible1.value = true;
};
const updateFormRef = ref();
const rules = ref({
  price: [{ required: true, message: "请输入价格", trigger: "change" }],
  spec_name: [{ required: true, message: "请输入规格名", trigger: "change" }],
  spec_name_en: [
    { required: true, message: "请输入英文规格名", trigger: "change" },
  ],
  stock: [{ required: true, message: "请输入库存", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
});
const updateInfo = async () => {
  updateFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await updateSpec({
          ...updateForm.value,
          status: String(updateForm.value.status),
        });
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
    }
  });
};
const ProductLabelsList = ref();
const AddProductLabelsVisible = ref(false);
const AddProductLabelsForm = ref({
  product_spec_id: null,
});
const uploadProductForm = ref({
  product_spec_name: "",
});

const AddProductLabelsFormRef = ref();
const AddProductLabels = async (row: any) => {
  AddProductLabelsForm.value.product_spec_id = row.id;
  uploadProductForm.value.product_spec_name = row.spec_name;
  console.log("row", row);

  const res = await getAvailableTag(AddProductLabelsForm.value);
  if (res.data.code === 0) {
    AddProductLabelsVisible.value = true;
    // console.log("res.data.data.list", res.data.data.list);
    if (res.data.data.list == null || res.data.data.list.length === 0) {
      ProductLabelsList.value = null;
      return;
    }
    if (res.data.data.list !== null || res.data.data.list.length > 0) {
      ProductLabelsList.value = res.data.data.list;
      if (res.data.data.list.tags) {
        setDefaultSelectedTags(); // 打开弹窗时设置默认选中的标签
      }
    }
  } else {
    ElMessage.error(res.data.data.message_zh);
  }
};
// 用来存储用户选择的标签id
const selectedTags = ref<any>({});
// 在初始化时设置默认选择
const setDefaultSelectedTags = () => {
  ProductLabelsList.value.forEach(
    (group: { tags: any[]; name: string | number }) => {
      group.tags.forEach((tag) => {
        if (tag.selected === 1) {
          selectedTags.value[group.name] = tag.id;
        }
      });
    }
  );
};
// 处理标签变化时，记录选择
const handleTagChange = (groupName: string, selectedId: number) => {
  selectedTags.value[groupName] = selectedId;
};

const AddProductLabelsInfo = async () => {
  AddProductLabelsFormRef.value.validate(async (valid: boolean) => {
    const selectedTagIds = Object.values(selectedTags.value).filter(
      (tagId) => tagId !== null
    );

    if (selectedTagIds.length > 0) {
      try {
        const res = await updateProductTag({
          product_spec_id: AddProductLabelsForm.value.product_spec_id,
          tag_ids: selectedTagIds,
        });
        if (res.data.code === 0) {
          ElMessage.success("修改成功");
          // 清空表单并重置验证状态
          AddProductLabelsFormRef.value.resetFields();

          AddProductLabelsVisible.value = false;
        } else {
          ElMessage.error(res.data.data.message_zh);
        }
      } catch {
        ElMessage.error("请求失败");
      } finally {
        // dialogTableVisible.value = false;
      }
    } else {
      ElMessage.error("请选择标签");
    }
  });
};

// 点击取消按钮时，清空选中的标签
const cancelSelection = () => {
  resetSelectedTags();
  // dialogVisible.value = false; // 关闭弹窗
};

// 清空选中的标签
const resetSelectedTags = () => {
  selectedTags.value = {}; // 清空选中的标签
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
  loadingImg.value = true;
  const formData = new FormData();
  formData.append("file", file); // 把文件附加到 FormData 对象中

  try {
    const response = await uploadImages(formData); // 上传文件 调用你提供的 uploadImages 方法
    console.log("response", response.data.data);
    if (response.data.code === 0) {
      console.log("associated_id", associated_id.value);

      const res = await setImageUrls({
        associated_id: associated_id.value,
        url_list: response.data.data.url_list,
        flag: "3",
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
:deep(.el-upload) {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
  