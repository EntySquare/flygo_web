<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">夺宝中奖列表</el-text>
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
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.user_id"
              />
            </div>
          </el-form-item>
          <el-form-item label="用户名: ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.user_name"
              />
            </div>
          </el-form-item>
          <el-form-item label="订单编号: ">
            <div class="Landscape">
              <el-input
                style="width: 175px"
                clearable
                v-model.trim="form.order_no"
              />
            </div>
          </el-form-item>
          <el-form-item label="处理状态: ">
            <div class="Landscape">
              <el-select
              clearable
                v-model="form.handle_status"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in handleStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="物流状态: ">
            <div class="Landscape">
              <el-select
              clearable
                v-model="form.shipping_status"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in shippingStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="状态: ">
            <div class="Landscape">
              <el-select
                v-model="form.status"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in statusOptions"
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
        <el-table-column prop="user_id" label="用户id" />
        <el-table-column prop="user_name" label="用户名" />
        <el-table-column prop="order_no" label="订单编号" />
        <el-table-column prop="goodsName" label="商品名称" />
        <el-table-column prop="goodsImage" label="商品图片">
            <template #default="{ row }">
                <img
                :src="row.goodsImage"
                alt=""
                style="width: 50px; height: 50px"
                />
          </template>
        </el-table-column>
<!--        <el-table-column prop="total_amount" label="总金额" />-->
        <el-table-column prop="tracking_number" label="物流跟踪号" />
<!--        <el-table-column prop="order_id" label="订单id" />-->
<!--        <el-table-column prop="pay_amount" label="实际支付金额" />-->
        <el-table-column prop="pay_type" label="支付方式">
            <template #default="{ row }">
                <span v-if="row.pay_type==1">paypal</span>
              <span v-else-if="row.pay_type==2">stripe</span>
              <span v-else-if="row.pay_type==3">余额</span>
              <span v-else-if="row.pay_type==4">积分</span>
            </template>
        </el-table-column>
        <el-table-column prop="product_id" label="夺宝商品ID" />
        <el-table-column prop="specs_id" label="规格ID" />
        <el-table-column prop="remarks" label="顾客备注" />
        <!-- <el-table-column show-overflow-tooltip prop="shipping_address" label="收货地址" /> -->
        <el-table-column prop="shipping_status" label="物流状态">
            <template #default="{ row }">
                <span>{{ shippingStatusOptions.find(item => item.value == row.shipping_status)?.label || '未知状态' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <span v-if="row.status == 'Winner'">中奖</span>
            <span v-else-if="row.status == 'Pickup'">提货</span>
            <span v-else-if="row.status == 'Platform'">卖给平台</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button
                size="small"
                plain
                @click="modifyWinner(row.status,row.id)"
                >处理中奖</el-button
              >
              <el-button
                size="small"
                plain
                @click="modifyShippingStatus(row)"
                >物流状态</el-button
              >
              <el-button v-if="row.status == 'Pickup'" size="small" @click="viewOrderDetails(row)"
                >订单详情</el-button
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
      title="处理中奖订单"
      style="max-width: 600px"
    >
      <el-form
        :model="winningForm"
        ref="winningFormRef"
        label-width="auto"
        :rules="winningFormrules"
      >
        <el-form-item label="物流单号" prop="tracking_number">
          <el-input clearable v-model.trim="winningForm.tracking_number" />
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
    <el-dialog
      v-model="dialogTableVisible2"
      title="处理物流状态"
      style="max-width: 600px"
    >
      <el-form
        :model="shippingForm"
        ref="shippingFormRef"
        label-width="auto"
        :rules="shippingFormrules"
      >
        <el-form-item label="物流单号" prop="tracking_number">
          <el-input clearable v-model.trim="shippingForm.tracking_number" />
        </el-form-item>
        <el-form-item label="物流状态" prop="shipping_status">
            <el-select
                v-model="shippingForm.shipping_status"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in shippingStatusOptions"
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
            @click="dialogTableVisible2 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="confirmShipping()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="viewOrderDetailsDialog"
      title="查看订单详情"
      style="max-width: 900px"
    >
    <h3 class="dialog-title">收货地址信息：</h3>
    <el-form label-width="auto" :inline="true">
        <el-form-item label="国家: ">
          <el-input v-model="address_info.Country" disabled />
        </el-form-item>
        <el-form-item label="省份: ">
          <el-input v-model="address_info.Province" disabled />
        </el-form-item>
        <el-form-item label="城市: ">
          <el-input v-model="address_info.City" disabled />
        </el-form-item>
        <el-form-item label="详细地址: ">
          <el-input type="textarea" v-model="address_info.Address" disabled />
        </el-form-item>
        <el-form-item label="手机号: ">
          <el-input v-model="address_info.Phone" disabled />
        </el-form-item>
        <el-form-item label="邮编: ">
          <el-input v-model="address_info.PostalCode" disabled />
        </el-form-item>
    </el-form>
    <h3 class="dialog-title">商品列表：</h3>
    <el-table :data="tableData2" style="width: 100%">
      <el-table-column prop="price" label="基础价格" />
      <el-table-column prop="product_name" label="商品名字" />
      <el-table-column prop="product_name_en" label="商品名字英文" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="spec_images" label="规格图片">
        <template #default="{ row }">
            <img v-if="row.spec_images" :src="row.spec_images ? JSON.parse(row.spec_images) : ''" alt="" />
            <el-text v-else>暂无图片</el-text>
          </template>
      </el-table-column>
      <el-table-column prop="spec_name" label="规格名" />
      <el-table-column prop="spec_name_en" label="规格名英文" />
    </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  adminQueryPurchaseOrder,
  updateShippingStatus,
  handleWinner,
  orderDetail
} from "@/api/treasureHunt";
import { setImageUrls, uploadImages } from "@/api/img";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const loading = ref(false);
const dialogTableVisible1 = ref(false);
const dialogTableVisible2 = ref(false);
const viewOrderDetailsDialog = ref(false);
const tableData = ref([]);
const tableData2 = ref([]);
const address_info = ref({});
const winningFormRef = ref();
const shippingFormRef = ref();
const form = ref({
    handle_status: null,
    order_no: null,
    shipping_status: null,
    status: null,
    user_id: null,
    user_name: null,
});
const winningForm = ref({
    tracking_number:''
});
const shippingForm = ref({
    tracking_number:'',
    shipping_status:0
});
const winningFormrules = ref({
    tracking_number	: [
    { required: true, message: "物流单号不能为空", trigger: "change" },
  ],
});
const shippingFormrules = ref({
    tracking_number	: [
    { required: true, message: "物流单号不能为空", trigger: "change" },
  ],
});
const handleStatusOptions = [
  { label: "未处理", value: 0 },
  { label: "已处理", value: 1 },
]
const shippingStatusOptions = [
  { label: "未发货", value: 0 },
  { label: "预备发货", value: 1 },
  { label: "已发货", value: 2 },
  { label: "派送中", value: 3 },
  { label: "已签收", value: 4 },
  { label: "确认收货", value: 5 },
]
const statusOptions = [
  { label: "中奖", value: "Winner" },
  { label: "提货", value: "Pickup" },
  { label: "卖给平台", value: "Platform" },
];
const pagination = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页显示的数量
  total: 0, // 总记录数
});
// 状态变化处理
const handleStatusChange = async (row: any, status: any) => {
  console.log("handleStatusChange", status, row);
  const res = await updateShippingStatus({
    order_no: row.order_no,
    shipping_status: status,
  });
  if (res.data.code === 0) {
    ElMessage.success("状态变化处理成功");
    await getInfo();
  } else {
    ElMessage.error("状态变化处理失败");
  }
};
const modifyWinner = (status:any,id: any) => {
    winningForm.value = {
        tracking_number:''
    }
    if(status=='Pickup'){
        dialogTableVisible1.value = true;
        winningForm.value.winner_id = id
    }else{
        handleWinner({ winner_id: id }).then((res) => {
            if (res.data.code === 0) {
            ElMessage.success("修改成功");
            getInfo();
            } else {
            ElMessage.error(res.data.data.message_zh);
            }
        });
    }
};
const confirmShipping = () =>{
    shippingFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const res = await updateShippingStatus(shippingForm.value);
            if (res.data.code === 0) {
                ElMessage.success("状态变化处理成功");
                dialogTableVisible2.value = false;
                await getInfo();
            } else {
                ElMessage.error("状态变化处理失败");
            }
        }
    })
   
}
const viewOrderDetails = async (row: any) => {
  try {
    // loading.value = true;
    const res = await orderDetail({ order_no: row.order_no });
    if (res.data.code === 0) {
      viewOrderDetailsDialog.value = true;
      if(res.data.data.products.length > 0){
        tableData2.value = res.data.data.products;
      }else{
        tableData2.value = []
      }
      address_info.value = res.data.data.address_info;
    } else {
      ElMessage.error("获取订单评价失败");
    }
  } catch {
    ElMessage.error("获取订单评价失败");
  } finally {
    // loading.value = false;
  }
};
const confirm = () => {
winningFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
        handleWinner({ ...winningForm.value }).then((res) => {
        if (res.data.code === 0) {
          ElMessage.success("处理成功");
          dialogTableVisible1.value = false;
          getInfo();
        } else {
          ElMessage.error(res.data.data.message_zh);
        }
      });
    }
  });
};
const modifyShippingStatus = (row:any) => {
  dialogTableVisible2.value = true;
  shippingForm.value = {
    tracking_number:'',
    shipping_status:row.shipping_status,
    order_no:row.order_no,
  }
};
const ResetgetInfo = () => {
  form.value = {
    product_name: null,
    status: null,
    buy_type: null,
  };
  pagination.value.page = 1;
  getInfo();
};
const getInfo = async () => {
  try {
    loading.value = true;
    const res = await adminQueryPurchaseOrder({
      ...form.value,
    });
    // page: pagination.value.page,
    // pageSize: pagination.value.pageSize,

    if (res.data.code === 0) {
      if (res.data.data.winner_list === null || res.data.data.winner_list.length === 0) {
        ElMessage("暂无数据");
        return;
      }
      tableData.value = res.data.data.winner_list; //
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
const handlePageChange = (newPage: number) => {
  pagination.value.page = newPage;
  getInfo();
};
onMounted(() => {
  getInfo();
});
</script>

<style scoped lang="less">
.dialog-title{
  margin-bottom: 20px;
}
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
