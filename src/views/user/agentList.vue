<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">代理商管理</el-text>
    </div>
    <div class="cont">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="amount" label="数量" />
        <el-table-column prop="rate" label="比例" />
        <el-table-column prop="id" label="主键ID" />
        <el-table-column prop="level" label="级别" />
        <el-table-column prop="product_id" label="商品ID" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button size="small" plain @click="modify(row)"
                >修改</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogTableVisible1"
      title="修改"
      style="max-width: 500px"
    >
    <el-form
        :model="form"
        label-width="auto"
      >
        <el-form-item label="数量">
          <el-input clearable v-model.trim.number="form.amount" />
        </el-form-item>
        <el-form-item label="比例">
          <el-input clearable v-model.trim.number="form.rate" />
        </el-form-item>
        <el-form-item label="级别">
          <el-input clearable v-model.trim.number="form.level" />
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="dialogTableVisible1 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="confirm()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { selectAgentConfig, updateAgentConfig } from "@/api/Querying";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
const dialogTableVisible1 = ref(false);
const form = ref({
    amount: null,
    id:null,
    level:null,
    product_id:null,
    rate:null,
});
const tableData = ref([]);
const pagination = ref({
  page: 1, // 当前页
  pageSize: 10, // 每页条数
  total: 0, // 数据总条数
});
const modify = (row: any) => {
  dialogTableVisible1.value = true;
  form.value = row
};
const getInfo = async () => {
  try {
    loading.value = true;
    const res = await selectAgentConfig(form.value);
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      tableData.value = res.data.data.list;
      console.log("res.data.data", res.data.data);

      if (res.data.data.list.length === 0) {
        ElMessage("暂无数据");
      }
      // pagination.value.total = res.data.data.page_size;
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
const confirm = () =>{
  updateAgentConfig(form.value).then((res:any)=>{
    if (res.data.code === 0) {
      ElMessage.success("修改成功");
      getInfo();
      dialogTableVisible1.value = false;
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  })
}
const ResetgetInfo = () => {
  form.value = {
    amount: null,
    id:null,
    level:null,
    product_id:null,
    rate:null,
  };
  pagination.value.page = 1;
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
