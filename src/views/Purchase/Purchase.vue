<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">购买订单列表</el-text>
    </div>
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item
            label="开始日期"
            :style="{ width: width > 616 ? ' 510px' : '240px' }"
          >
            <el-date-picker
              :teleported="false"
              v-model="dateRange"
              type="datetimerange"
              start-placeholder="Start "
              end-placeholder="End "
              @change="handleDateChange"
            />
          </el-form-item>

          <el-form-item label="用户id : " style="width: 240px">
            <div class="Landscape">
              <el-input clearable v-model.trim="form.user_id" />
            </div>
          </el-form-item>
          <el-form-item label="订单编号 : " style="width: 240px">
            <div class="Landscape">
              <el-input clearable v-model.trim="form.order_id" />
            </div>
          </el-form-item>
          <el-form-item label="物流状态 : " style="width: 240px">
            <el-select
              v-model="form.shipping_status"
              placeholder="Select"
              style="width: 100%"
            >
              <el-option
                v-for="item in shippingStatusVlaue"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态 : " style="width: 240px">
            <el-select
              v-model="form.status"
              placeholder="Select"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusVlaue"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        <el-table-column prop="discount" label="折扣金额" />
        <el-table-column prop="goodsImage" label="商品图片"
          ><template #default="{ row }">
            <img v-if="row.goodsImage" :src="row.goodsImage" alt="" />
            <el-text v-else>暂无图片</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" />

        <el-table-column prop="order_id" label="订单编号" />
        <el-table-column prop="paid_at" label="支付时间" />
        <el-table-column prop="pay_amount" label="实际支付金额" />

        <!-- 订单状态 0=待付款 1=已付款 -1=付款失败 2=退款中 3=退款成功 4=退款失败/取消 -->
        <el-table-column prop="status" label="订单状态">
          <template #default="{ row }">
            {{
              row.status === 0
                ? "待付款"
                : row.status === 1
                ? "已付款"
                : row.status === -1
                ? "付款失败"
                : row.status === 2
                ? "退款中"
                : row.status === 3
                ? "退款成功"
                : "退款失败/取消"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="shipping_status" label="物流状态">
          <template #default="{ row }">
            <el-dropdown
              trigger="click"
              @command="handleStatusChange(row, $event)"
            >
              <el-button size="small">
                {{
                  row.shipping_status === 0
                    ? "未发货"
                    : row.shipping_status === 1
                    ? "预备发货"
                    : row.shipping_status === 2
                    ? "已发货"
                    : row.shipping_status === 3
                    ? "派送中"
                    : row.shipping_status === 4
                    ? "已签收"
                    : "确认收货"
                }}
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="1">预备发货</el-dropdown-item>
                  <el-dropdown-item :command="2">已发货</el-dropdown-item>
                  <el-dropdown-item :command="3">派送中</el-dropdown-item>
                  <el-dropdown-item :command="4">已签收</el-dropdown-item>
                  <el-dropdown-item :command="5">确认收货</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column prop="total_amount" label="总金额" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              size="small"
              v-if="row.status === 2"
              @click="RefundOperationRow(row)"
              >退款操作</el-button
            >
            <!-- v-if="row.status === 5" -->
            <el-button size="small" @click="ViewOrderReviewsRow(row)"
              >查看评价</el-button
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
      v-model="RefundOperation"
      title="退款操作"
      style="max-width: 600px"
    >
      <el-form :model="RefundOperationForm" label-width="auto">
        <el-form-item label="操作退款" prop="name">
          <el-select
            v-model="RefundOperationForm.shipping_status"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in RefundOperationVlaue"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item class="footer">
          <el-button plain style="width: 48%" @click="addChildCancel"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="RefundOperationInfo()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="ViewOrderReviews"
      title="查看订单评价"
      style="max-width: 500px"
    >
      <el-form v-if="ViewOrderReviewsList.user_id" label-width="auto">
        <el-form-item label="用户id : ">
          <el-text class="mx-1">{{ ViewOrderReviewsList.user_id }}</el-text>
        </el-form-item>
        <el-form-item label="评价时间 : ">
          <el-text class="mx-1">{{ ViewOrderReviewsList.commentTime }}</el-text>
        </el-form-item>
        <el-form-item label="商品星级评价 : ">
          <el-text class="mx-1">{{ ViewOrderReviewsList.goods_level }}</el-text>
        </el-form-item>
        <el-form-item label="评语 : ">
          <el-text class="mx-1">{{ ViewOrderReviewsList.remarks }}</el-text>
        </el-form-item>

        <el-form-item class="footer">
          <el-button plain style="width: 100%" @click="ViewOrderReviews = false"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
      <div v-else style="text-align: center">
        <el-text style="text-align: center" size="large" class="mx-1"
          >暂无订单评价</el-text
        >
      </div>
    </el-dialog>
  </div>
</template>
        
<script lang="ts" setup>
import {
  adminQueryPurchaseOrder,
  displayOrderComment,
  proveRefundOrder,
  refuseRefundOrder,
  updateShippingStatus,
} from "@/api/order";

import { ElMessage } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import { useWindowSize } from "@/utils/useWindowSize";
const { width } = useWindowSize();
const loading = ref(false);
// const storedToken = localStorage.getItem("token");
// if (!storedToken) {
//   ElMessage.error("請先登入");
//   router.push('/login')
// }
const form = ref({
  order_id: "",
  shipping_condition: "",
  page: 0,
  shipping_status: "", // 物流状态 0:未发货 1:预备发货 2:已发货 3:派送中 4:已签收 5:确认收货
  status: "", // 订单状态 0:待付款 1:已付款 -1:付款失败/取消付款 2:退款中 3:退款成功 4:退款失败/取消
  time_duration: [] as number[],
  user_id: "",
});
const statusVlaue = ref([
  { label: "待付款", value: "0" },
  { label: "已付款", value: "1" },
  { label: "付款失败", value: "-1" },
  { label: "退款中", value: "2" },
  { label: "退款成功", value: "3" },
  { label: "退款失败/取消", value: "4" },
]);
const shippingStatusVlaue = ref([
  {
    label: "未发货",
    value: "0",
  },
  {
    label: "预备发货",
    value: "1",
  },
  {
    label: "已发货",
    value: "2",
  },
  {
    label: "派送中",
    value: "3",
  },
  {
    label: "已签收",
    value: "4",
  },
  {
    label: "确认收货",
    value: "5",
  },
]);
const RefundOperationVlaue = ref([
  {
    label: "同意退款",
    value: "1",
  },
  {
    label: "拒绝退款",
    value: "2",
  },
]);
const tableData = ref([]);
const pagination = ref({
  page: 1, // 当前页
  pageSize: 10, // 每页条数
  total: 0, // 数据总条数
});
// 绑定日期范围的变量
const dateRange = ref<[string, string] | null>(null);

// 日期改变时处理函数
const handleDateChange = () => {
  if (dateRange.value) {
    // 将日期转换为秒级时间戳
    const timestamps = dateRange.value.map((date) =>
      Math.floor(new Date(date).getTime() / 1000)
    );
    console.log("秒级时间戳数组：", timestamps);
    form.value.time_duration = timestamps;
  }
};

const getInfo = async () => {
  if (form.value.time_duration.length === 0) {
    ElMessage.error("请选择日期范围");
    return;
  }
  try {
    loading.value = true;
    const res = await adminQueryPurchaseOrder(form.value);
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,
    console.log("res", res.data);

    if (res.data.code === 0) {
      tableData.value = res.data.data;
      console.log("res.data.data", res.data.data);

      if (res.data.data.length === 0) {
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
    order_id: "",
    shipping_condition: "",
    page: 0,
    shipping_status: "",
    status: "",
    time_duration: [],
    user_id: "",
  };
  dateRange.value = null;
  pagination.value.page = 1;
  tableData.value = [];
  // getInfo();
};

const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage;
  getInfo();
};
const RefundOperation = ref(false);
const RefundOperationForm = ref({
  shipping_status: "",
});
const AgreeToRefund = ref({ userId: "", order_id: "" });
const RefundOperationRow = (row: any) => {
  console.log("row", row);
  AgreeToRefund.value.userId = row.user_id;
  AgreeToRefund.value.order_id = row.order_id;
  RefundOperation.value = true;
};
const addChildCancel = () => {
  RefundOperation.value = false;
};
const RefundOperationInfo = async () => {
  if (RefundOperationForm.value.shipping_status === "") {
    ElMessage.error("请选择操作退款");
    return;
  }
  if (RefundOperationForm.value.shipping_status === "1") {
    // 同意退款
    const res = await proveRefundOrder(AgreeToRefund.value);
    console.log("res");
    if (res.data.code === 0) {
      ElMessage.success("退款成功");
      getInfo();
      RefundOperation.value = false;
    } else {
      ElMessage.error("退款操作失败");
    }
  } else if (RefundOperationForm.value.shipping_status === "2") {
    // 拒绝退款
    const res = await refuseRefundOrder({
      order_id: AgreeToRefund.value.order_id,
    });
    console.log("res");
    if (res.data.code === 0) {
      ElMessage.success("拒绝退款成功");
      getInfo();
      RefundOperation.value = false;
    }
  }
};

const ViewOrderReviews = ref(false);

// 状态变化处理
const handleStatusChange = async (row: any, status: any) => {
  console.log("handleStatusChange", status, row);
  const res = await updateShippingStatus({
    order_id: row.order_id,
    shippingStatus: status,
  });
  console.log("♨️res", res.data.code);

  if (res.data.code === 0) {
    ElMessage.success("状态变化处理成功");
    await getInfo();
  } else {
    ElMessage.error("状态变化处理失败");
  }
};
const ViewOrderReviewsList = ref({
  user_id: "",
  commentTime: "",
  goods_level: "",
  remarks: "",
});
const ViewOrderReviewsRow = async (row: any) => {
  console.log("ViewOrderReviewsRow", row);
  try {
    loading.value = true;
    const res = await displayOrderComment({ order_id: row.order_id });
    if (res.data.code === 0) {
      if (res.data.data) {
        ViewOrderReviewsList.value.user_id = res.data.data.user_id;
        ViewOrderReviewsList.value.commentTime = res.data.data.commentTime;
        ViewOrderReviewsList.value.goods_level = res.data.data.goods_level;
        ViewOrderReviewsList.value.remarks = res.data.data.remarks;
      }
      console.log("ViewOrderReviewsList", ViewOrderReviewsList.value);

      ViewOrderReviews.value = true;
    } else {
      ElMessage.error("获取订单评价失败");
    }
  } catch {
    ElMessage.error("获取订单评价失败");
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  // getInfo();
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
:deep(.el-picker-panel__footer) {
  display: flex;
  text-align: left !important;
}
</style>
        