<template>
  <div class="home_view">
    <div class="cont">
      <div class="phone_input">
        <el-form
          label-position="left"
          :inline="true"
          label-width="auto"
          style="max-width: 100%"
        >
          <el-form-item label="hash : ">
            <div class="Landscape">
              <el-input v-model.trim="formHash" />
              <el-button size="small" plain @click="handleSubmit('hash')"
                >查询</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="姓名 : ">
            <div class="Landscape">
              <el-input v-model.trim="formName" />
              <el-button size="small" plain @click="handleSubmit('name')"
                >查询</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="身份证 : ">
            <div class="Landscape">
              <el-input v-model.trim="formIdCard" />
              <el-button size="small" plain @click="handleSubmit('id_card')"
                >查询</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="手机号 : ">
            <div class="Landscape">
              <el-input v-model.trim="formPhone" />
              <el-button size="small" plain @click="handleSubmit('phone')"
                >查询</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-if="width > 768" prop="hash" label="hash" />
        <el-table-column v-if="width > 768" prop="name" label="姓名" />
        <el-table-column v-if="width > 768" prop="id_card" label="身份证号码" />
        <el-table-column v-if="width > 768" prop="phone" label="手机号" />
        <el-table-column
          width="70%"
          v-if="width < 768"
          prop="hash"
          label="hash"
        />
        <el-table-column
          width="70%"
          v-if="width < 768"
          prop="name"
          label="姓名"
        />
        <el-table-column
          width="70%"
          v-if="width < 768"
          prop="id_card"
          label="身份证号码"
        />
        <el-table-column
          width="70%"
          v-if="width < 768"
          prop="phone"
          label="手机号"
        />
        <el-table-column width="70%" v-if="width < 768" label="详情">
          <template #default="{ row }">
            <el-button
              class="the_details"
              type="primary"
              plain
              @click="handleClick(row)"
              >详情</el-button
            >
          </template></el-table-column
        >

        <el-table-column
          v-if="width > 768"
          prop="mail_address"
          label="通讯地址"
        />
        <el-table-column v-if="width > 768" prop="amount" label="金额" />
        <el-table-column v-if="width > 768" prop="buy_or_sell" label="买/卖">
          <template #default="{ row }">
            {{ row.buy_or_sell == 1 ? '买' : '卖' }}
          </template></el-table-column
        >
        <el-table-column
          v-if="width > 768"
          prop="funding_source"
          label="资金来源"
        >
          <template #default="{ row }">
            {{ SourceOfFundsValuefun(row.funding_source) }}
          </template></el-table-column
        >
        <el-table-column v-if="width > 768" prop="use_for" label="委托买费用途">
          <template #default="{ row }">
            {{ UseOfExpensesOptionsfun(row.use_for) }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="width > 768"
          prop="wallet_address"
          label="接收方钱包地址"
        />
        <el-table-column
          v-if="width > 768"
          prop="political"
          label="是否有五级等以内为重要政治性职务人士"
        >
          <template #default="{ row }">
            {{ row.political == 1 ? '是' : '否' }}
          </template></el-table-column
        >
        <el-table-column v-if="width > 768" prop="flag" label="是否KYC">
          <template #default="{ row }">
            <el-checkbox
              v-model="row.flag"
              size="large"
              @change="handleChange(Number(row.flag))"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="width > 768"
          prop="ViewTheContract"
          label="查看合同"
        >
          <el-button type="primary" size="small" plain>查看</el-button
          ><el-button type="primary" size="small" plain>下载</el-button>
        </el-table-column>
        <el-table-column v-if="width > 768" prop="ViewVideo" label="查看视频"
          ><el-button type="primary" size="small" plain>查看</el-button
          ><el-button type="primary" size="small" plain
            >下载</el-button
          ></el-table-column
        >
        <el-table-column
          v-if="width > 768"
          prop="ViewIDCardFront"
          label="查看身份证正面"
          ><el-button type="primary" size="small" plain>查看</el-button
          ><el-button type="primary" size="small" plain
            >下载</el-button
          ></el-table-column
        >
        <el-table-column
          v-if="width > 768"
          prop="ViewIDCardBack"
          label="查看身份证背面"
          ><el-button type="primary" size="small" plain>查看</el-button
          ><el-button type="primary" size="small" plain
            >下载</el-button
          ></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import useHomeStore from '@/store/modules/home'
import { checkUserInfo, viewUserInfoAll } from '@/api/login'
import { ElMessageBox } from 'element-plus'
import router from '@/router'

// 使用 window.innerWidth 和 window.innerHeight
const width = window.innerWidth
const height = window.innerHeight

console.log(`窗口宽度: ${width}px, 窗口高度: ${height}px`)

// 或者使用 document.documentElement.clientWidth 和 document.documentElement.clientHeight
const clientWidth = document.documentElement.clientWidth
const clientHeight = document.documentElement.clientHeight

console.log(`客户端宽度: ${clientWidth}px, 客户端高度: ${clientHeight}px`)
const formHash = ref('')
const formName = ref('')
const formIdCard = ref('')
const formPhone = ref('')

const handleClick = (id: string) => {
  router.push('/details')
}
const flag = ref('0')

interface RuleFormRequest {
  hash: string // 隐藏字段
  name: string // 姓名
  id_card: string // 身份证号码
  phone: string // 手机号
  mail_address: string // 通讯地址
  amount: number // 金额
  buy_or_sell: number // 买/卖 (1-买, 2-卖)
  funding_source: number // 资金来源 (1-活期存款, 2-储蓄存款, 3-借贷款, 4-股票, 5-债券, 6-其他)
  use_for: string // 委托买费用途 (按实际情况处理) 投资理财1/消费性产品2/旅游3/资金周转4/其他5
  wallet_address: string // 接收方钱包地址
  political: number // 是否有五级等以内为重要政治性职务人士 (1-是, 2-否)
  flag: string // 是否KYC
  // ViewTheContract: string // 查看合同
  // ViewVideo: string // 查看视频
  // ViewIDCardFront: string // 查看身份证正面
  // ViewIDCardBack: string // 查看身份证背面
}

const storedToken = localStorage.getItem('token')
if (!storedToken) {
  router.push('/login')
}
const tableData = ref<RuleFormRequest[]>([])
const getUserInfo = async () => {
  if (storedToken) {
    const res = await viewUserInfoAll()
    if (res.data.code === 0) {
      tableData.value = res.data.json.user_info_list
    }
    console.log('res', res.data.json.user_info_list)
  }
}
const getKycInfo = async (flag: Number) => {
  const res = await checkUserInfo(String(flag))
  console.log('getKycInfo,res', res)
}

// const handleChange = async (newValue: number) => {
//   if (newValue) {
//     try {
//       await ElMessageBox.confirm('确定要勾选吗?', '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'info'
//       })
//       getKycInfo(newValue)
//     } catch (error) {
//       // 如果用户取消操作，则取消勾选
//       throw new Error('用户取消了操作')
//     }
//     sendRequest('checked')
//   } else {
//     try {
//       await ElMessageBox.confirm('确定要取消勾选吗?', '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//       })

//       getKycInfo(newValue)
//     } catch (error) {
//       throw new Error('用户取消了操作')
//     }
//     sendRequest('unchecked')
//   }
// }

const handleChange = async (newValue: Number) => {
  console.log('newValue', newValue)

  try {
    const confirmed = await ElMessageBox.confirm(
      `确定要${newValue ? '' : '取消'}勾选吗?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: newValue ? 'info' : 'warning'
      }
    )
    if (confirmed) {
      await getKycInfo(newValue)
      sendRequest(newValue ? 'checked' : 'unchecked')
    } else {
      throw new Error('用户取消了操作')
    }
  } catch (error) {
    tableData.value.forEach(item => {
      if (item.flag !== String(newValue)) {
        item.flag = String(newValue)
      }
    })
    throw new Error('用户取消了操作')
  }
}

const SourceOfFundsValuefun = (form: string) => {
  if (form == '1') {
    return '活期存款'
  } else if (form == '2') {
    return '儲蓄存款'
  } else if (form == '3') {
    return '借貸款'
  } else if (form == '4') {
    return '股票'
  } else if (form == '5') {
    return '債券'
  } else if (form == '6') {
    return '其他'
  }
}

const UseOfExpensesOptionsfun = (form: string) => {
  if (form == '1') {
    return '投資理財'
  } else if (form == '2') {
    return '消費性產品'
  } else if (form == '3') {
    return '旅遊'
  } else if (form == '4') {
    return '資金周轉'
  } else if (form == '5') {
    return '其他'
  }
}

const handleSubmit = (type: string) => {
  console.log('type', type)
  if (type === 'hash') {
  }
  if (type === 'name') {
  }
  if (type === 'id_card') {
  }
  if (type === 'phone') {
  }
}

const sendRequest = (action: 'checked' | 'unchecked') => {
  // 模拟发送请求到后台服务器，实际项目中请使用 Axios 或 Fetch API 发送请求
  console.log(`发送${action}请求到后台服务器`)
}

onMounted(() => {
  getUserInfo()
})
</script>

<style scoped lang="less">
.Landscape {
  display: flex;
}
.home_view {
  padding: 20px;
}
.cont {
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

@media (max-width: 768px) {
  .home_view {
    padding: 8px;
    font-size: 12px !important;
  }
  .cont {
    padding: 5px !important;
  }
  :deep(.el-table__header) {
    width: 100% !important;
  }
  :deep(.el-table__body) {
    width: 100% !important;
  }
  .the_details {
    font-size: 12px;
    margin: 0;
    padding: 10px;
  }
}
</style>
