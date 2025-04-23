<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">提现申请</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="搜索关键词: ">
            <div class="Landscape">
              <el-input clearable v-model.trim="form.keyword" />
            </div>
          </el-form-item>
          <el-form-item label="审核状态: ">
            <div class="Landscape">
              <el-select
              clearable
                v-model="form.review"
                placeholder="选择审核状态"
                style="width: 176px"
              >
                <el-option
                  v-for="item in reviewList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="申请状态: ">
            <div class="Landscape">
              <el-select
              clearable
                v-model="form.status"
                placeholder="选择申请状态"
                style="width: 176px"
              >
                <el-option
                  v-for="item in statusList"
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
        <el-table-column prop="order_no" label="订单号" />
        <el-table-column prop="user_id" label="用户ID" />
        <el-table-column prop="user_name" label="用户名" />
        <el-table-column prop="phone" label="用户手机号" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="account_no" label="账号" />
        <el-table-column prop="amount" label="提现金额" />
        <el-table-column prop="contact_info" label="联系方式" />
        <el-table-column prop="payment_method" label="收款方式" />
        <el-table-column prop="remarks" label="反驳原因" />
        <el-table-column prop="review" label="审核状态">
          <template #default="{ row }">
                <span>{{ reviewList.find(item => item.value == row.review)?.label || '未知状态' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
            <template #default="{ row }">
                <span>{{ statusList.find(item => item.value == row.status)?.label || '未知状态' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button
                size="small"
                plain
                v-if="row.status == 1"
                @click="modifyWithdrawal(row.id)"
                >审核</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogTableVisible1"
      title="提现申请审核"
      style="max-width: 600px"
    >
      <el-form
        :model="withdrawalForm"
        ref="withdrawalFormRef"
        label-width="auto"
        :rules="withdrawalFormrules"
      >
        <el-form-item label="备注">
          <el-input clearable v-model.trim="withdrawalForm.remarks" />
        </el-form-item>
        <el-form-item label="状态" prop="review">
            <el-select
                v-model="withdrawalForm.review"
                placeholder="选择审核状态"
                style="width: 176px"
              >
                <el-option label="通过" :value="1" />
                <el-option label="不通过" :value="2" />
              </el-select>
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
import { withdrawList,withdrawHandle } from "@/api/Querying";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const loading = ref(false);
const withdrawalFormRef = ref();
const dialogTableVisible1 = ref(false);
const form = ref({
  keyword: "",
  review: null,
  status: null,
  page: 0,
});
const withdrawalForm = ref({
    remarks:'',
    review:null,
    id:null
})
const withdrawalFormrules = ref({
    review	: [
    { required: true, message: "状态不能为空", trigger: "change" },
  ],
});
const reviewList = [
    { label: "进行中", value: 1 },
    { label: "通过", value: 2 },
    { label: "不通过", value: 3 },
]
const statusList = [
    { label: "待审核", value: 1 },
    { label: "成功", value: 2 },
    { label: "失败", value: 3 },
]
const tableData = ref([]);
const pagination = ref({
  page: 1, // 当前页
  pageSize: 10, // 每页条数
  total: 0, // 数据总条数
});

const getInfo = async () => {
  try {
    loading.value = true;
    const res = await withdrawList(form.value);
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
    keyword: "",
    review: null,
    status: null,
    page: 0,
  };
  pagination.value.page = 1;
  getInfo();
};
const modifyWithdrawal = (id:any) => {
    dialogTableVisible1.value = true;
    withdrawalForm.value.id = id
};
const confirm = () =>{
    withdrawalFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const res = await withdrawHandle(withdrawalForm.value);
            if (res.data.code === 0) {
                ElMessage.success("状态变化处理成功");
                withdrawalForm.value = {
                    remarks:'',
                    review:'',
                    id:null
                }
                withdrawalFormRef.value.resetFields()
                dialogTableVisible1.value = false;
                await getInfo();
            } else {
                ElMessage.error("状态变化处理失败");
            }
        }
    })
}
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
