<template>
  <div class="home_view">
    <div style="margin-bottom: 14px">
      <el-text class="mx-1" size="large">夺宝列表</el-text>
    </div>
    <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
        <el-form-item label="夺宝参与积分数量: ">
          <div class="Landscape">
            <el-input
              style="width: 175px"
              clearable
              v-model.trim="keyValues.treasure_hunt_point_involved"
            />
          </div>
          <el-button style="margin-left:15px" type="primary" @click="keepKeyValues('treasure_hunt_point_involved')">保存</el-button>
        </el-form-item>
        <el-form-item label="夺宝参与金额: ">
          <div class="Landscape">
            <el-input
              style="width: 175px"
              clearable
              v-model.trim="keyValues.treasure_hunt_amount_involved"
            />
          </div>
          <el-button style="margin-left:15px" type="primary" @click="keepKeyValues('treasure_hunt_amount_involved')">保存</el-button>
        </el-form-item>
        <el-form-item label="夺宝邀请次数: ">
          <div class="Landscape">
            <el-input
              style="width: 175px"
              clearable
              v-model.trim="keyValues.treasure_hunt_invite"
            />
          </div>
          <el-button style="margin-left:15px" type="primary" @click="keepKeyValues('treasure_hunt_invite')">保存</el-button>
        </el-form-item>
        <el-form-item label="夺宝积分/金额每日可参与: ">
          <div class="Landscape">
            <el-input
              style="width: 175px"
              clearable
              v-model.trim="keyValues.treasure_hunt_daily"
            />
          </div>
          <el-button style="margin-left:15px" type="primary" @click="keepKeyValues('treasure_hunt_daily')">保存</el-button>
        </el-form-item>
        <el-form-item label="夺宝积分参与条件: ">
          <div class="Landscape">
              <el-select
              clearable
                v-model="keyValues.treasure_hunt_point_partake"
                placeholder="Select"
                style="width: 176px"
              >
                <el-option
                  v-for="item in treasureHuntPointPartake"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          <el-button style="margin-left:15px" type="primary" @click="keepKeyValues('treasure_hunt_point_partake')">保存</el-button>
        </el-form-item>
      </el-form>
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
            <!-- <el-button size="small" plain @click="add()">新增</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="product_name" label="商品名" />
        <el-table-column prop="product_id" label="夺宝商品ID" />
        <el-table-column prop="buy_type" label="类型">
          <template #default="{ row }">
            <span v-if="row.buy_type=='Amount'">金额</span>
            <span v-else-if="row.buy_type=='Point'">积分</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="amount" label="金额或积分" /> -->
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
              <el-button v-if="row.status!='End'" size="small" plain @click="modifyWinningState(row.id)">设置中奖</el-button>
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
    <el-dialog
      v-model="dialogTableVisible2"
      title="设置中奖"
      style="max-width: 400px"
    >
    <el-form
        :model="winningForm"
        ref="winningFormRef"
        label-width="auto"
        :rules="winningFormrules"
      >
      <el-form-item label="用户" prop="user_id">
          <div class="Landscape">
              <el-select
                v-model="winningForm.user_id"
                placeholder="Select"
                style="width: 176px"
                @change="getUserInfo"
                value-key=id
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.id"
                  :label="item.full_name"
                  :value="item.id"
                />
              </el-select>
            </div>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="userInfo.phone" disabled/>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userInfo.email" disabled/>
        </el-form-item>
        <el-form-item class="footer">
          <el-button
            plain
            style="width: 48%"
            @click="dialogTableVisible2 = false"
            >取消</el-button
          >
          <el-button plain style="width: 48%" @click="confirmWinning()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { selectItem,addItem,updateItemStatusProcessing,setWinner,getKeyValues,keyValuesUpdate } from "@/api/treasureHunt";
import { setImageUrls, uploadImages } from "@/api/img";
import { userList } from "@/api/Querying";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const loading = ref(false);
const dialogTableVisible1 = ref(false);
const dialogTableVisible2 = ref(false);
const tableData = ref([]);
const addFormRef = ref();
const winningFormRef = ref();
const form = ref({
  product_name:null,
  status:null,
  buy_type:null,
});
const winningForm = ref({
  user_id:null,
  item_id:null,
});
const keyValues = ref({
  treasure_hunt_point_involved:'',//夺宝参与积分数量
  treasure_hunt_amount_involved:'',//夺宝参与金额
  treasure_hunt_invite:'',//夺宝邀请 N次
  treasure_hunt_daily:'',//夺宝积分/金额每日可参与
  treasure_hunt_point_partake:'',//夺宝积分参与条件
  treasure_hunt_amount_daily:'',
  treasure_hunt_point_daily:'',
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
const winningFormrules = ref({
  user_id: [
    { required: true, message: "请选择用户", trigger: "change" },
  ],
});
const treasureHuntPointPartake = [
    { label: "无限制", value: '0' },
    { label: "购买过商品的⽤户", value: '1' },
    { label: "参与过0元购的⽤户", value: '2' },
    { label: "没有购买过任何东⻄，但账户有余额的⽤户", value: '3' },
]
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
const userInfo = ref({})
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
const getKeyValuesInfo = () =>{
  getKeyValues().then(res=>{
    if(res.data.code == 0){
      keyValues.value = res.data.data;
      console.log(keyValues.value,'keyValues.value');
      
    }
  })
}
const keepKeyValues = (key:any) =>{
  let data = {
    key:key,
    value:keyValues.value[key]
  }
  console.log(data,'data');
  keyValuesUpdate(data).then(res=>{
    if(res.data.code == 0){
      ElMessage.success("修改成功");
      getKeyValuesInfo()
    }
  })
}
const userOptions = ref([]);
const getUserInfo = (id:any) =>{
  const selectedUser = userOptions.value.find(item => item.id === id);
  // console.log(item);
  if(selectedUser){
    userInfo.value.phone = selectedUser.phone || '-';
    userInfo.value.email = selectedUser.email || '-';
  }
}
const modifyWinningState = (id:any) => {
  let data = {
    full_name: "",
    name: "",
    page: 0
  }
  userList(data).then(res=>{
    if(res.data.code == 0){
      winningForm.value.item_id = id;
      userOptions.value = res.data.data.user_list
      dialogTableVisible2.value = true;
    }
  })
};
const confirmWinning = () =>{
  winningFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      setWinner({ ...winningForm.value }).then((res) => {
        if (res.data.code === 0) {
          ElMessage.success("设置成功");
          dialogTableVisible2.value = false;
          getInfo();
        } else {
          ElMessage.error(res.data.data.message_zh);
        }
      });
    }
  })
}
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
  getKeyValuesInfo();
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
