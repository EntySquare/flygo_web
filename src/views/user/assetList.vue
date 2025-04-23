<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">用户资产列表</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="用户id: ">
            <div class="Landscape">
              <el-input clearable v-model.trim.number="form.user_id" />
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
        <el-table-column prop="user_id" label="用户id" />
        <el-table-column prop="balance" label="余额" />
        <el-table-column prop="frozen_balance" label="冻结余额" />
        <el-table-column prop="integral" label="积分" />
        <el-table-column prop="level" label="代理商级别" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button
                size="small"
                plain
                @click="assetDetails(row.user_id)"
                >资产明细</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogTableVisible1"
      title="用户资产明细"
      style="max-width: 800px"
    >
    <el-table :data="tableData2" style="width: 100%">
        <el-table-column prop="other_id" label="关联ID" />
        <el-table-column prop="amount" label="数量" />
        <el-table-column prop="currency" label="资产" />
        <el-table-column prop="left_amount" label="修改前" />
        <el-table-column prop="right_amount" label="修改后" />
        <el-table-column prop="left_frozen_amount" label="修改前冻结" />
        <el-table-column prop="right_frozen_amount" label="修改后冻结" />
        <el-table-column prop="remark" label="备注" />
    </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { selectUserAsset,selectUserAssetRecord } from "@/api/Querying";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
const dialogTableVisible1 = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  user_id: null,
  page: 0,
});

const tableData = ref([]);
const tableData2 = ref([]);
const pagination = ref({
  page: 1, // 当前页
  pageSize: 10, // 每页条数
  total: 0, // 数据总条数
});
const assetDetails = (user_id:any) =>{
    selectUserAssetRecord({user_id}).then(res=>{
        if(res.data.code == 0){
            if(res.data.data.list){
                tableData2.value = res.data.data.list
            }else{
                tableData2.value = []
            }
            dialogTableVisible1.value = true;
        }else{
            ElMessage.error(res.data.data.message_zh)
        }
    })
}
const getInfo = async () => {
  try {
    loading.value = true;
    const res = await selectUserAsset(form.value);
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

const ResetgetInfo = () => {
  form.value = {
    full_name: "",
    name: "",
    page: 0,
  };
  pagination.value.page = 1;
  getInfo();
};

const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage;
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
