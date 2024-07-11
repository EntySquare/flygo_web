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
              <el-input v-model.trim="formHash"/>
              <el-button size="small" plain @click="handleSubmit('hash')"
              >查询
              </el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="姓名 : ">
            <div class="Landscape">
              <el-input v-model.trim="formName"/>
              <el-button size="small" plain @click="handleSubmit('name')"
              >查询
              </el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="身份证 : ">
            <div class="Landscape">
              <el-input v-model.trim="formIdCard"/>
              <el-button size="small" plain @click="handleSubmit('id_card')"
              >查询
              </el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="手机号 : ">
            <div class="Landscape">
              <el-input v-model.trim="formPhone"/>
              <el-button size="small" plain @click="handleSubmit('phone')"
              >查询
              </el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-if="width > 768" prop="hash" label="hash"/>
        <el-table-column v-if="width > 768" prop="name" label="姓名"/>
        <el-table-column v-if="width > 768" prop="id_card" label="身份证号码"/>
        <el-table-column v-if="width > 768" prop="phone" label="手机号"/>
        <el-table-column
            width="70%"
            v-if="width < 768"
            prop="hash"
            label="hash"
        />
        <el-table-column
            width="68%"
            v-if="width < 768"
            prop="name"
            label="姓名"
        />
        <el-table-column
            width="68%"
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
                @click="handleClick(row.hash)"
            >详情
            </el-button
            >
          </template>
        </el-table-column
        >

        <el-table-column
            v-if="width > 768"
            prop="mail_address"
            label="通讯地址"
        />
        <el-table-column v-if="width > 768" prop="amount" label="金额"/>
        <el-table-column v-if="width > 768" prop="buy_or_sell" label="买/卖">
          <template #default="{ row }">
            {{ row.buy_or_sell == 1 ? '买' : '卖' }}
          </template>
        </el-table-column
        >
        <el-table-column
            v-if="width > 768"
            prop="funding_source"
            label="资金来源"
        >
          <template #default="{ row }">
            {{ SourceOfFundsValuefun(row.funding_source) }}
          </template>
        </el-table-column
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
          </template>
        </el-table-column
        >
        <el-table-column v-if="width > 768" prop="flag" label="是否KYC">
          <template #default="{ row }">
            <el-checkbox
                v-model="row.flagBool"
                size="large"
                @change="handleChange(Number(row.flagBool), row.hash)"
            />
          </template>
        </el-table-column>
        <el-table-column
            v-if="width > 768"
            prop="ViewTheContract"
            label="查看合同"
        >
          <template #default="{ row }">
            <a :href="row.upload_info_list[3].url" target="_blank">
              <el-button type="primary" size="small" plain> 查看</el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column v-if="width > 768" prop="ViewVideo" label="查看视频">
          <template #default="{ row }">
            <a :href="row.upload_info_list[2].url" target="_blank">
              <el-button type="primary" size="small" plain> 查看</el-button>
            </a>
            <el-button type="primary" size="small" plain> 上传</el-button>
          </template>
        </el-table-column
        >
        <el-table-column
            v-if="width > 768"
            prop="ViewIDCardFront"
            label="查看身份证正面"
        >
          <template #default="{ row }">
            <el-button
                type="primary"
                size="small"
                @click="viewClick(row.upload_info_list[0].url, 'idcardF')"
                plain
            >
              查看
            </el-button>
            <!-- <a :href="row.upload_info_list[0].url" target="_blank">
              <el-button type="primary" size="small" plain> 下载 </el-button>
            </a> -->
          </template>
        </el-table-column
        >
        <el-table-column
            v-if="width > 768"
            prop="ViewIDCardBack"
            label="查看身份证背面"
        >
          <template #default="{ row }">
            <el-button
                type="primary"
                size="small"
                @click="viewClick(row.upload_info_list[1].url, 'idcardB')"
                plain
            >
              查看
            </el-button>
            <!-- <a :href="row.upload_info_list[1].url" target="_blank">
              <el-button type="primary" size="small" plain> 下载 </el-button>
            </a> -->
          </template>
        </el-table-column
        >
      </el-table>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog
        v-model="dialogVisible"
        :title="dialogTitle"
        :close-on-click-modal="true"
        :close-on-press-escape="true"
        :show-close="true"
        width="40%"
    >
      <img
          :src="dialogUrl"
          alt="查看身份证正面"
          style="width: 100%; height: auto"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {checkUserInfo, uploadFile, viewUserInfo} from '@/api/login'
import {ElMessage, ElMessageBox} from 'element-plus'
import router from '@/router'
import {useRoute} from 'vue-router'
import ffmpegFunctions from "@/utils/ffmpeg";

// 使用 window.innerWidth 和 window.innerHeight
const width = window.innerWidth
const height = window.innerHeight
const route = useRoute()

console.log(`窗口宽度: ${width}px, 窗口高度: ${height}px`)

const dialogVisible = ref(false)
const dialogUrl = ref('')
const dialogTitle = ref('图片预览')
const videoType = ref(false)

const viewClick = (link: string, type: 'idcardF' | 'idcardB') => {
  dialogUrl.value = link
  if (type === 'idcardF') {
    dialogTitle.value = '身份证正面预览'
  } else if (type === 'idcardB') {
    dialogTitle.value = '身份证背面预览'
  }
  dialogVisible.value = true
}

// 或者使用 document.documentElement.clientWidth 和 document.documentElement.clientHeight
const clientWidth = document.documentElement.clientWidth
const clientHeight = document.documentElement.clientHeight

console.log(`客户端宽度: ${clientWidth}px, 客户端高度: ${clientHeight}px`)
const formHash = ref('')
const formName = ref('')
const formIdCard = ref('')
const formPhone = ref('')
const videoMsg = ref('')

const handleClick = (id: string) => {
  router.push({
    path: '/details',
    query: {
      hash: id
    }
  })
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
  flagBool: boolean
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
    const res = await viewUserInfo({})
    if (res.data.code === 0) {
      tableData.value = res.data.json.user_info_list
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
      }
    }
    console.log('res', res.data.json.user_info_list)
  }
}
const getKycInfo = async (flag: Number, hash: string) => {
  return await checkUserInfo({hash: hash, flag: flag.toString()})
}

const handleChange = async (newValue: Number, hash: string) => {
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
      const res = await getKycInfo(newValue, hash)
      if (res.data.code !== 0) {
        throw new Error('操作失败')
      } else {
        // 刷新页面
        getUserInfo()
      }
    } else {
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
      }
      throw new Error('用户取消了操作')
    }
  } catch (error) {
    for (const item of tableData.value) {
      item.flagBool = item.flag === '1'
    }
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

const handleSubmit = async (type: string) => {
  let queryParam: Record<string, any> = {}

  // 根据 type 设定查询参数
  switch (type) {
    case 'hash':
      queryParam = {hash: formHash.value}
      break
    case 'name':
      queryParam = {name: formName.value}
      break
    case 'id_card':
      queryParam = {id_card: formIdCard.value}
      break
    case 'phone':
      queryParam = {phone: formPhone.value}
      break
    default:
      ElMessage.error('无效的查询类型')
      return
  }

  try {
    // 发起查询请求
    const res = await viewUserInfo(queryParam)

    if (res.data.code === 0) {
      if (res.data.json.user_info_list.length === 0) {
        ElMessage.error('未查询到该用户信息')
        return
      }

      // 处理查询结果
      tableData.value = res.data.json.user_info_list
      ElMessage.success('查询成功')

      // 更新 flagBool 属性
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
      }
    } else {
      ElMessage.error(`查询失败: ${res.data.message}`)
    }
  } catch (error) {
    ElMessage.error('查询失败，请重试')
  }
}

const compressAndUploadVideo = async (file: File, hash: string) => {
  if (file) {
    if (file.type.startsWith('video/')) {
      if (file.size > 500 * 1024 * 1024) {
        ElMessage.error('影片需小於500mb')
        return false
      }
      const reader = new FileReader()
      reader.onload = () => {
      }
      reader.onerror = () => {
        ElMessage.error('影片讀取失敗')
        return false
      }

      try {
        const videoBlob = (await ffmpegFunctions.compressVideo(
            file,
            file.name,
            file.type,
            videoMsg.value
        )) as Blob
        const formData = new FormData()
        formData.append(`${hash}_video`, videoBlob)
        const response = await uploadFile(formData, 'multipart/form-data')
        if (response.data.code === 0) {
          reader.readAsDataURL(file)
          ElMessage.success('影片上傳成功')
          return true
        } else {
          ElMessage.error('影片上傳失敗')
          return false
        }
      } catch (error) {
        ElMessage.error('影片上傳失敗')
        return false
      }
    } else {
      ElMessage.error('請選擇視訊文件')
      return false
    }
  }
}
const sendRequest = (action: 'checked' | 'unchecked') => {
  // 模拟发送请求到后台服务器，实际项目中请使用 Axios 或 Fetch API 发送请求
  console.log(`发送${action}请求到后台服务器`)
}

onMounted(async () => {
  const key = route.query.hash || ''
  if (key) {
    console.log('key', key)
    const res = await viewUserInfo({hash: key})
    if (res.data.code === 0) {
      tableData.value = res.data.json.user_info_list
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
      }
    }
    console.log('res', res.data.json.user_info_list)
  } else {
    getUserInfo()
  }
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
