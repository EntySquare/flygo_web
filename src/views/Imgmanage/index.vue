<template>
  <div class="home_view" v-loading="loadingImg">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large" style="font-size: 20px"
        >首页管理</el-text
      >
    </div>
    <div class="cont">
      <div style="margin-bottom: 14px">
        <el-text class="mx-1" size="large">轮播图管理</el-text>
      </div>
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
        <el-button size="small" @click="Carousel = 'Carousel'"
          >修改轮播图图片</el-button
        >
      </el-upload>
      <div
        style="display: flex; align-items: center; flex-wrap: wrap; gap: 14px"
      >
        <div
          style="display: flex; flex-wrap: wrap; gap: 14px"
          v-for="(src, index) in carousel_images_url_list"
          :key="src"
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 14px;
            "
          >
            <el-image
              :src="src"
              fit="contain"
              style="width: 120px; height: 120px"
            >
              <!-- <template #placeholder>
          <div class="image-slot">Loading<span class="dot"></span></div>
        </template> -->
              <template #error>
                <div class="image-slot">图片加载失败</div>
              </template>
            </el-image>
            <el-button @click="handleDeleteImageCarouse(index)">
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="cont">
      <div style="margin-bottom: 14px">
        <el-text class="mx-1" size="large">热门商品id列表管理</el-text>
      </div>
      <div style="margin-bottom: 14px">
        <!-- <el-text class="mx-1" size="">当前热门商品id列表</el-text> -->
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%; margin-top: 14px"
        >
          <el-form-item label="搜索商品名 : ">
            <el-input
              style="width: 175px"
              clearable
              v-model.trim="NameOfProduct"
            />
            <el-button style="margin-left: 4px" @click="searchProduct"
              >搜索</el-button
            ></el-form-item
          ></el-form
        >
      </div>
      <el-table :data="hot_product_tableData" style="width: 100%">
        <el-table-column prop="description" label="商品描述" />
        <el-table-column prop="image_urls" label="商品图片">
          <template #default="{ row }">
            <img
              v-if="row.image_urls"
              style="width: 40px; height: auto"
              :src="JSON.parse(row.image_urls)"
              alt=""
            />
            <el-text v-else>暂无图片</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名" />
        <el-table-column prop="name_en" label="英文商品名" />
        <el-table-column prop="name_pin_yin" label="拼音商品名" />
        <el-table-column prop="price" label="基础价格" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            {{ row.status === 0 ? "下架" : "上架" }}</template
          ></el-table-column
        >
        <el-table-column prop="stock" label="基础库存">
          <template #default="{ row }">
            {{ row.stock === 0 ? "库存不足" : "库存充足" }}</template
          ></el-table-column
        >
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" plain @click="deleteHotProduct(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cont">
      <div style="margin-bottom: 14px">
        <el-text class="mx-1" size="large">平铺图管理</el-text>
      </div>
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
        <el-button size="small" @click="Carousel = 'Tiling'"
          >修改平铺图图片</el-button
        >
      </el-upload>
      <div
        style="display: flex; align-items: center; flex-wrap: wrap; gap: 14px"
      >
        <div
          style="display: flex; flex-wrap: wrap; gap: 14px"
          v-for="(src, index) in raw_images_url_list"
          :key="src"
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 14px;
            "
          >
            <el-image
              :src="src"
              fit="contain"
              style="width: 120px; height: 120px"
            >
              <!-- <template #placeholder>
          <div class="image-slot">Loading<span class="dot"></span></div>
        </template> -->
              <template #error>
                <div class="image-slot">图片加载失败</div>
              </template>
            </el-image>
            <el-button @click="handleDeleteImageTiling(index)">
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="cont">
      <div style="margin-bottom: 14px">
        <el-text class="mx-1" size="large">今日商品列表管理</el-text>
      </div>
      <div style="margin-bottom: 14px">
        <!-- <el-text class="mx-1" size="">今日商品列表</el-text> -->
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%; margin-top: 14px"
        >
          <el-form-item label="搜索商品名 : ">
            <el-input
              style="width: 175px"
              clearable
              v-model.trim="todayProduct"
            />
            <el-button style="margin-left: 4px" @click="searchtoday"
              >搜索</el-button
            ></el-form-item
          ></el-form
        >
      </div>
      <el-table :data="today_product_tableData" style="width: 100%">
        <!-- <el-table-column prop="category_name" label="类型名" /> -->
        <el-table-column prop="description" label="商品描述" />
        <el-table-column prop="image_urls" label="商品图片">
          <template #default="{ row }">
            <img
              v-if="row.image_urls"
              style="width: 40px; height: auto"
              :src="JSON.parse(row.image_urls)"
              alt=""
            />
            <el-text v-else>暂无图片</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名" />
        <el-table-column prop="name_en" label="英文商品名" />
        <el-table-column prop="name_pin_yin" label="拼音商品名" />
        <el-table-column prop="price" label="基础价格" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            {{ row.status === 0 ? "下架" : "上架" }}</template
          ></el-table-column
        >
        <el-table-column prop="stock" label="基础库存">
          <template #default="{ row }">
            {{ row.stock === 0 ? "库存不足" : "库存充足" }}</template
          ></el-table-column
        >
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" plain @click="deleteTodayProduct(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="HotItemsVisible"
      title="设置热门商品"
      style="max-width: 600px"
    >
      <el-form :model="HotItemsList" label-width="auto">
        <el-form-item label="类型名 :" prop="category_name">
          {{ HotItemsList.category_name }}
        </el-form-item>

        <el-form-item label="商品描述 :" prop="description">
          {{ HotItemsList.description }}
        </el-form-item>
        <el-form-item label="商品图片 :" prop="image_urls">
          <img
            v-if="HotItemsList.image_urls"
            style="width: 200px; height: 200px"
            :src="JSON.parse(HotItemsList.image_urls)"
            alt=""
          />
          <el-text v-else>暂无图片</el-text>
        </el-form-item>

        <el-form-item label="商品名 :" prop="name">
          {{ HotItemsList.name }}
        </el-form-item>
        <el-form-item label="英文商品名 :" prop="name_en">
          {{ HotItemsList.name_en }}
        </el-form-item>
        <el-form-item label="拼音商品名 :" prop="name_pin_yin">
          {{ HotItemsList.name_pin_yin }}
        </el-form-item>
        <el-form-item label="基础价格 :" prop="price">
          {{ HotItemsList.price }}
        </el-form-item>
        <el-form-item label="状态 :" prop="price">
          {{ HotItemsList.status === 0 ? "下架" : "上架" }}
        </el-form-item>
        <el-form-item label="基础库存 :" prop="price">
          {{ HotItemsList.stock === 0 ? "库存不足" : "库存充足" }}
        </el-form-item>
        <el-form-item class="footer">
          <el-button plain style="width: 48%" @click="HotItemsVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="HotItemsInfo()"
            >设置该商品为热门商品</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="todayProductVisible"
      title="设置今日商品"
      style="max-width: 600px"
    >
      <el-form :model="todayProductList" label-width="auto">
        <el-form-item label="类型名 :" prop="category_name">
          {{ todayProductList.category_name }}
        </el-form-item>

        <el-form-item label="商品描述 :" prop="description">
          {{ todayProductList.description }}
        </el-form-item>
        <el-form-item label="商品图片 :" prop="image_urls">
          <img
            v-if="todayProductList.image_urls"
            style="width: 200px; height: 200px"
            :src="JSON.parse(todayProductList.image_urls)"
            alt=""
          />
          <el-text v-else>暂无图片</el-text>
        </el-form-item>

        <el-form-item label="商品名 :" prop="name">
          {{ todayProductList.name }}
        </el-form-item>
        <el-form-item label="英文商品名 :" prop="name_en">
          {{ todayProductList.name_en }}
        </el-form-item>
        <el-form-item label="拼音商品名 :" prop="name_pin_yin">
          {{ todayProductList.name_pin_yin }}
        </el-form-item>
        <el-form-item label="基础价格 :" prop="price">
          {{ todayProductList.price }}
        </el-form-item>
        <el-form-item label="状态 :" prop="price">
          {{ todayProductList.status === 0 ? "下架" : "上架" }}
        </el-form-item>
        <el-form-item label="基础库存 :" prop="price">
          {{ todayProductList.stock === 0 ? "库存不足" : "库存充足" }}
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="todayProductVisible = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="todayItemsInfo()"
            >设置该商品为今日商品</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
        
<script lang="ts" setup>
import {
  homeData,
  selectProduct,
  setCarouselImages,
  setHotList,
  setRawImages,
  setTodayDeal,
  userList,
} from "@/api/Querying";
import { uploadImages } from "@/api/img";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const carousel_images_url_list = ref<string[]>([]);
const raw_images_url_list = ref<string[]>([]);
const hot_product_id_list = ref<string[]>([]); // 热门商品id列表
const hot_product_tableData = ref<string[]>([]); // 热门商品id列表

const today_product_id_list = ref<string[]>([]); // 今日商品id列表
const today_product_tableData = ref<string[]>([]); // 今日商品id列表
const NameOfProduct = ref(""); // 热门商品名
const todayProduct = ref(""); // 热门商品名
const Carousel = ref("Carousel");
const HotItemsVisible = ref(false);
const todayProductVisible = ref(false);
const HotItemsList = ref();
const todayProductList = ref();
const appHomeData = async () => {
  try {
    loadingImg.value = true;
    const res = await homeData();
    console.log("res.data.data", res.data);
    carousel_images_url_list.value = res.data.carousel_images_url_list;
    raw_images_url_list.value = res.data.raw_images_url_list;
    hot_product_tableData.value = res.data.hot_product_id_list;
    hot_product_id_list.value = res.data.hot_product_id_list.map(
      (item: { id: any }) => item.id
    );
    today_product_id_list.value = res.data.today_product_id_list.map(
      (item: { id: any }) => item.id
    );
    today_product_tableData.value = res.data.today_product_id_list;
  } catch (err) {
    console.log("err", err);

    ElMessage.error("请求失败");
  } finally {
    loadingImg.value = false;
  }
};

const fileList = ref<File[]>([]); // 存储文件列表

// 最大文件大小（40MB）
const MAX_FILE_SIZE = 40 * 1024 * 1024;
// 最大图片数
const MAX_IMAGES = 3;

// 允许的图片类型（拓展名）
const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|gif)$/i; // 支持jpg、jpeg、png、gif等图片格式

// 文件校验逻辑：校验文件大小和文件扩展名
const handleBeforeUpload = async (file: File) => {
  // 检查是否超出最大图片数
  if (
    Carousel.value === "Carousel" &&
    carousel_images_url_list.value.length >= MAX_IMAGES
  ) {
    ElMessage.error(
      `最多只能上传 ${MAX_IMAGES} 张轮播图图片，请先删除多余图片！`
    );
    return false;
  }
  if (
    Carousel.value == "Tiling" &&
    raw_images_url_list.value.length >= MAX_IMAGES
  ) {
    ElMessage.error(
      `最多只能上传 ${MAX_IMAGES} 张平铺图图片，请先删除多余图片！`
    );
  }

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

// 文件上传函数
const uploadFile = async (file: File, extension: string) => {
  try {
    loadingImg.value = true;
    const formData = new FormData();
    formData.append("file", file); // 把文件附加到 FormData 对象中
    const response = await uploadImages(formData); // 上传文件 调用你提供的 uploadImages 方法
    console.log("response", response.data.data);
    if (response.data.code === 0) {
      console.log("response.data.data", response.data.data.url_list[0]);
      const image_urls = response.data.data.url_list[0];
      if (Carousel.value === "Carousel") {
        carousel_images_url_list.value.push(image_urls); // 添加到本地数组
        console.log(
          "carousel_images_url_list.value",
          carousel_images_url_list.value
        );

        const res = await setCarouselImages({
          url_list: carousel_images_url_list.value,
        });
      } else if (Carousel.value === "Tiling") {
        raw_images_url_list.value.push(image_urls); // 添加到本地数组
        console.log("raw_images_url_list.value", raw_images_url_list.value);
        const res = await setRawImages({
          url_list: raw_images_url_list.value,
        });
      }

      ElMessage.success("图片上传成功！");
      await appHomeData();
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
// 删除图片方法
const handleDeleteImageCarouse = async (index: number) => {
  carousel_images_url_list.value.splice(index, 1); // 删除指定索引的图片
  console.log("carousel_images_url_list.value", carousel_images_url_list.value);
  //   const updatedPaths = JSON.stringify(carousel_images_url_list.value); // 转为指定的数组格式
  //   console.log("更新后的图片路径数组:", updatedPaths);
  const res = await setCarouselImages({
    url_list: carousel_images_url_list.value,
  }); // 调用更新方法
  console.log("res", res);
  appHomeData();
};
// 删除图片方法
const handleDeleteImageTiling = async (index: number) => {
  raw_images_url_list.value.splice(index, 1); // 删除指定索引的图片
  console.log("raw_images_url_list.value", raw_images_url_list.value);
  //   const updatedPaths = JSON.stringify(raw_images_url_list.value); // 转为指定的数组格式
  //   console.log("更新后的图片路径数组:", updatedPaths);
  const res = await setRawImages({ url_list: raw_images_url_list.value }); // 调用更新方法
  console.log("res", res);
  appHomeData();
};

const searchProduct = async () => {
  if (NameOfProduct.value === "") {
    ElMessage.error("请输入商品名！");
    return;
  }
  if (hot_product_tableData.value.length === 3) {
    ElMessage.error("最多只能设置3个热门商品！请删除后重试");
    return;
  }
  try {
    loadingImg.value = true;
    const res = await selectProduct({ name: NameOfProduct.value });
    console.log("res", res.data.data.list);
    if (res.data.data.list === null) {
      ElMessage.error("没有找到该商品！");
      loadingImg.value = false;
      return;
    }
    HotItemsList.value = res.data.data.list[0];

    HotItemsVisible.value = true;
  } catch {
  } finally {
    loadingImg.value = false;
  }
};
const searchtoday = async () => {
  if (todayProduct.value === "") {
    ElMessage.error("请输入商品名！");
    return;
  }
  if (today_product_tableData.value.length === 3) {
    ElMessage.error("最多只能设置3个今日商品！请删除后重试");
    return;
  }
  console.log(
    "today_product_tableData.value.length.value",
    today_product_tableData.value.length
  );

  try {
    loadingImg.value = true;
    const res = await selectProduct({ name: todayProduct.value });
    if (res.data.data.list === null) {
      ElMessage.error("没有找到该商品！");
      loadingImg.value = false;
      return;
    }
    console.log("res", res.data.data.list);
    todayProductList.value = res.data.data.list[0];

    todayProductVisible.value = true;
  } finally {
    loadingImg.value = false;
  }
};
const deleteHotProduct = async (id: string) => {
  const index = hot_product_id_list.value.indexOf(id);
  hot_product_id_list.value.splice(index, 1);
  console.log("hot_product_id_list", hot_product_id_list.value);
  const res = await setHotList({
    product_id_list: hot_product_id_list.value,
  });
  ElMessage.success("删除成功！");
  appHomeData();
  console.log("res", res);
};
const deleteTodayProduct = async (id: string) => {
  const index = today_product_id_list.value.indexOf(id);
  today_product_id_list.value.splice(index, 1);
  console.log("today_product_id_list", today_product_id_list.value);
  const res = await setTodayDeal({
    product_id_list: today_product_id_list.value,
  });
  ElMessage.success("删除成功！");
  appHomeData();
  console.log("res", res);
};
const HotItemsInfo = async () => {
  hot_product_id_list.value.push(HotItemsList.value.id);

  const res = await setHotList({
    product_id_list: hot_product_id_list.value,
  });
  ElMessage.success("设置成功！");
  HotItemsVisible.value = false;
  appHomeData();
};
const todayItemsInfo = async () => {
  console.log("today_product_id_list", today_product_id_list.value);
  today_product_id_list.value.push(todayProductList.value.id);
  console.log("today_product_id_list", today_product_id_list.value);
  const res = await setTodayDeal({
    product_id_list: today_product_id_list.value,
  });
  ElMessage.success("设置成功！");
  todayProductVisible.value = false;
  appHomeData();
};
onMounted(() => {
  appHomeData();
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
  margin-bottom: 24px;
}
.image-slot {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
}
:deep(.is-leaf) {
  background-color: #e9f2f8 !important;
}
.el-table {
  --el-table-header-text-color: #000;
}
</style>
        