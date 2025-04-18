<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">夺宝列表</el-text>
    </div>
    <div class="cont">
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
                v-model.trim="form.product_name"
              />
            </div>
          </el-form-item>
        <el-form-item label="类型 : ">
            <div class="Landscape">
              <el-select
                v-model="form.buy_type"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in buyTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
            <el-button size="small" plain @click="ResetgetInfo()">重置</el-button>
            <el-button size="small" plain @click="add()">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="product_name" label="商品名" />
        <el-table-column prop="product_id" label="夺宝商品ID" />
        <el-table-column prop="buy_type" label="类型" />
        <el-table-column prop="amount" label="金额或积分" />
        <el-table-column prop="join_count" label="参与数量" />
        <el-table-column prop="remaining" label="剩余人次" />
        <el-table-column prop="total_slots" label="总需人次" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <span v-if="row.status=='NotStarted'">未进行</span>
            <span v-else-if="row.status=='Processing'">进行中</span>
            <span v-else-if="row.status=='End'">结束</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
              <el-button v-if="row.status=='NotStarted'" size="small" plain @click="modifyState(row.id)">修改状态</el-button>
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
      title="新增"
      style="max-width: 600px"
    >
      <el-form
        :model="addForm"
        ref="addFormRef"
        label-width="auto"
        :rules="addFormrules"
      >
        <el-form-item label="购买类型" prop="buy_type">
          <div class="Landscape">
              <el-select
                v-model="addForm.buy_type"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in buyTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
        </el-form-item>
        <el-form-item label="商品id" prop="product_id">
          <el-input clearable v-model.trim.number="addForm.product_id" />
        </el-form-item>
        <el-form-item label="总需人次" prop="total_slots">
          <el-input clearable v-model.trim.number="addForm.total_slots" />
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="dialogTableVisible1 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="confirmAdd()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { selectItem,addItem,updateItemStatusProcessing } from "@/api/treasureHunt";
import { setImageUrls, uploadImages } from "@/api/img";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const loading = ref(false);
const dialogTableVisible1 = ref(false);
const tableData = ref([]);
const addFormRef = ref();
const form = ref({
  product_name:null,
  status:null,
  buy_type:null,
});
const addForm = ref({
  buy_type: "", 
  product_id: "", 
  total_slots: "", 
});
const addFormrules = ref({
  buy_type: [
    { required: true, message: "参与数量不能为空", trigger: "change" },
  ],
  product_id: [
    { required: true, message: "商品id不能为空", trigger: "change" },
  ],
  total_slots: [
    { required: true, message: "总需人次不能为空", trigger: "change" },
  ],
});
const buyTypeOptions = [
  { label: "金额", value: "Amount" },
  { label: "积分", value: "Point" },
];
const statusOptions = [
  { label: "未进行", value: "NotStarted" },
  { label: "进行中", value: "Processing" },
  { label: "结束", value: "End" },
];
const pagination = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页显示的数量
  total: 0, // 总记录数
});
const modifyState = (id:any) => {
  updateItemStatusProcessing({id:id}).then((res) => {
    if (res.data.code === 0) {
      ElMessage.success("修改成功");
      getInfo();
    } else {
      ElMessage.error(res.data.data.message_zh);
    }
  });
};
const confirmAdd = () => {
  addFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      addItem({ ...addForm.value }).then((res) => {
        if (res.data.code === 0) {
          ElMessage.success("添加成功");
          dialogTableVisible1.value = false;
          getInfo();
        } else {
          ElMessage.error(res.data.data.message_zh);
        }
      });
    }
  })
 
};
const add = () =>{
  dialogTableVisible1.value = true;
}
const ResetgetInfo = () => {
  form.value = {
    product_name:null,
    status:null,
    buy_type:null,
  };
  pagination.value.page = 1;
  getInfo();
};
const getInfo = async () => {
  try {
    loading.value = true;
    const res = await selectItem({
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
