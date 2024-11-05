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
                >查詢
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="姓名 : ">
            <div class="Landscape">
              <el-input v-model.trim="formName" />
              <el-button size="small" plain @click="handleSubmit('name')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="身份證 : ">
            <div class="Landscape">
              <el-input v-model.trim="formIdCard" />
              <el-button size="small" plain @click="handleSubmit('id_card')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="手機號 : ">
            <div class="Landscape">
              <el-input v-model.trim="formPhone" />
              <el-button size="small" plain @click="handleSubmit('phone')"
                >查詢
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-if="width > 768" prop="hash" label="hash" />
        <el-table-column v-if="width > 768" prop="name" label="姓名" />
        <el-table-column v-if="width > 768" prop="id_card" label="身份證號碼" />
        <el-table-column v-if="width > 768" prop="phone" label="手機號" />
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
          label="身份證號碼"
        />
        <el-table-column
          width="70%"
          v-if="width < 768"
          prop="phone"
          label="手機號"
        />
        <el-table-column width="70%" v-if="width < 768" label="詳情">
          <template #default="{ row }">
            <el-button
              class="the_details"
              type="primary"
              plain
              @click="handleClick(row.hash)"
              >詳情
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          v-if="width > 768"
          prop="mail_address"
          label="通訊地址"
        />
        <el-table-column v-if="width > 768" prop="amount" label="金額" />
        <el-table-column v-if="width > 768" prop="buy_or_sell" label="買/賣">
          <template #default="{ row }">
            {{ row.buy_or_sell == 1 ? '買' : '賣' }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="width > 768"
          prop="funding_source"
          label="資金來源"
        >
          <template #default="{ row }">
            {{ SourceOfFundsValuefun(row.funding_source) }}
          </template>
        </el-table-column>
        <el-table-column v-if="width > 768" prop="use_for" label="委託買費用途">
          <template #default="{ row }">
            {{ UseOfExpensesOptionsfun(row.use_for) }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="width > 768"
          prop="wallet_address"
          label="接收方錢包地址"
        />
        <el-table-column
          v-if="width > 768"
          prop="political"
          label="是否有五級等以內爲重要政治性職務人士"
        >
          <template #default="{ row }">
            {{ row.political == 1 ? '是' : '否' }}
          </template>
        </el-table-column>
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
            <a :href="row.contractUrl" target="_blank">
              <el-button type="primary" size="small" plain>查看</el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column v-if="width > 768" prop="ViewVideo" label="查看視頻">
          <template #default="{ row }">
            <a v-if="row.videoUrl" :href="row.videoUrl" target="_blank">
              <el-button type="primary" size="small" plain>查看</el-button>
            </a>
            <!-- 上传视频按钮 -->
            <el-button
              v-loading.fullscreen.lock="loading"
              type="primary"
              size="small"
              plain
              @click="openFileDialog"
            >
              上傳
            </el-button>

            <!-- 隐藏的文件选择器 -->
            <input
              type="file"
              ref="videoInput"
              accept="video/*"
              style="display: none"
              @change="handleFileChange($event, row.hash)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="width > 768"
          prop="ViewIDCardFront"
          label="查看身份證正面"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="viewClick(row.idCardFUrl, 'idcardF')"
              plain
            >
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="width > 768"
          prop="ViewIDCardBack"
          label="查看身份證背面"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="viewClick(row.idCardBUrl, 'idcardB')"
              plain
            >
              查看
            </el-button>
          </template>
        </el-table-column>
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
        alt="查看身份證"
        style="width: 100%; height: auto"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  checkUserInfo,
  uploadFile,
  viewUserInfo,
  downloadFile
} from '@/api/login'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { useRoute } from 'vue-router'
import ffmpegFunctions from '@/utils/ffmpeg'

// 使用 window.innerWidth 和 window.innerHeight
const width = window.innerWidth
const height = window.innerHeight
const route = useRoute()

const dialogVisible = ref(false)
const dialogUrl = ref('')
const dialogTitle = ref('')
const videoType = ref(false)
const loading = ref(false)

const viewClick = async (link: string, type: 'idcardF' | 'idcardB') => {
  loading.value = true
  try {
    const response = await downloadFile({ url: link })
    if (response.data.code === 0) {
      const byteArray = stringToUint8Array(response.data.json.img)
      const splitLink = link.split('.')
      const fileType = splitLink[splitLink.length - 1]
      const blob = new Blob([byteArray], { type: `image/${fileType}` })
      dialogUrl.value = URL.createObjectURL(blob)
    } else {
      ElMessage.error('圖片下載失敗:', response.data.json.message)
      return
    }
  } catch (error) {
    ElMessage.error('圖片下載失敗:')
    return
  }
  // dialogUrl.value = link
  if (type === 'idcardF') {
    dialogTitle.value = '身份證正面預覽'
  } else if (type === 'idcardB') {
    dialogTitle.value = '身份證背面預覽'
  }
  dialogVisible.value = true
  loading.value = false
}

const stringToUint8Array = (byteString: string) => {
  const byteCharacters = atob(byteString) // Decode base64 string
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }
  return byteArray
}

// 或者使用 document.documentElement.clientWidth 和 document.documentElement.clientHeight
const clientWidth = document.documentElement.clientWidth
const clientHeight = document.documentElement.clientHeight

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
  id_card: string // 身份證號碼
  phone: string // 手機號
  mail_address: string // 通讯地址
  amount: number // 金额
  buy_or_sell: number // 买/卖 (1-买, 2-卖)
  funding_source: number // 资金来源 (1-活期存款, 2-储蓄存款, 3-借贷款, 4-股票, 5-债券, 6-其他)
  use_for: string // 委托买费用途 (按实际情况处理) 投资理财1/消费性产品2/旅游3/资金周转4/其他5
  wallet_address: string // 接收方钱包地址
  political: number // 是否有五级等以内为重要政治性职务人士 (1-是, 2-否)
  flag: string // 是否KYC
  flagBool: boolean
  contractUrl: string // 合同链接
  videoUrl: string // 视频链接
  idCardFUrl: string // 身份证正面链接
  idCardBUrl: string // 身份证背面链接
  upload_info_list: {
    file_name: string
    url: string
  }[]
  // ViewTheContract: string // 查看合同
  // ViewVideo: string // 查看视频
  // ViewIDCardFront: string // 查看身份证正面
  // ViewIDCardBack: string // 查看身份证背面
}

const storedToken = localStorage.getItem('token')
if (!storedToken) {
  ElMessage.error("請先登入");
  router.push('/login')
}
const tableData = ref<RuleFormRequest[]>([])
const getUserInfo = async () => {

    const res = await viewUserInfo({})
    if (res.data.code === 0) {
      tableData.value = res.data.json.user_info_list
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
        for (const i of item.upload_info_list) {
          if (i.url.includes('_video.')) {
            item.videoUrl = i.url
          }
          if (i.url.includes('_pdf.')) {
            item.contractUrl = i.url
          }
          if (i.url.includes('_idcardb.')) {
            item.idCardBUrl = i.url
          }
          if (i.url.includes('_idcardf.')) {
            item.idCardFUrl = i.url
          }
        }
      }
    }
    console.log('res', res.data.json.user_info_list)
  
}
const getKycInfo = async (flag: Number, hash: string) => {
  return await checkUserInfo({ hash: hash, flag: flag.toString() })
}

const handleChange = async (newValue: Number, hash: string) => {
  console.log('newValue', newValue)

  try {
    const confirmed = await ElMessageBox.confirm(
      `確定要${newValue ? '' : '取消'}勾選嗎?`,
      '提示',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: newValue ? 'info' : 'warning'
      }
    )
    if (confirmed) {
      const res = await getKycInfo(newValue, hash)
      if (res.data.code !== 0) {
        throw new Error('操作失敗')
      } else {
        // 刷新页面
        getUserInfo()
      }
    } else {
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
      }
      throw new Error('用戶取消了操作')
    }
  } catch (error) {
    for (const item of tableData.value) {
      item.flagBool = item.flag === '1'
    }
    throw new Error('用戶取消了操作')
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
      queryParam = { hash: formHash.value }
      break
    case 'name':
      queryParam = { name: formName.value }
      break
    case 'id_card':
      queryParam = { id_card: formIdCard.value }
      break
    case 'phone':
      queryParam = { phone: formPhone.value }
      break
    default:
      ElMessage.error('無效的查詢類型')
      return
  }

  try {
    // 发起查询请求
    const res = await viewUserInfo(queryParam)

    if (res.data.code === 0) {
      if (res.data.json.user_info_list.length === 0) {
        ElMessage.error('未查詢到該用戶信息')
        return
      }

      // 处理查询结果
      tableData.value = res.data.json.user_info_list
      ElMessage.success('查詢成功')

      // 更新 flagBool 属性
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
        for (const i of item.upload_info_list) {
          if (i.url.includes('_video.')) {
            item.videoUrl = i.url
          }
          if (i.url.includes('_pdf.')) {
            item.contractUrl = i.url
          }
          if (i.url.includes('_idcardb.')) {
            item.idCardBUrl = i.url
          }
          if (i.url.includes('_idcardf.')) {
            item.idCardFUrl = i.url
          }
        }
      }
    } else {
      ElMessage.error(`查詢失敗: ${res.data.message}`)
    }
  } catch (error) {
    ElMessage.error('查詢失敗，請重試')
  }
}
const videoInput = ref<HTMLInputElement | null>(null)

const openFileDialog = () => {
  videoInput.value?.click()
}
const handleFileChange = async (event: Event, hash: string) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    await compressAndUploadVideo(file, hash)
    console.log('file', file)
  }
}
const compressAndUploadVideo = async (file: File, hash: string) => {
  if (file) {
    if (file.type.startsWith('video/')) {
      loading.value = true
      if (file.size > 500 * 1024 * 1024) {
        ElMessage.error('影片需小於500mb')
        return false
      }
      const reader = new FileReader()

      reader.onload = () => {}
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
        formData.append(`${hash}_video.mp4`, videoBlob)
        const response = await uploadFile(formData, 'multipart/form-data')
        if (response.data.code === 0) {
          reader.readAsDataURL(file)
          ElMessage.success('影片上傳成功')
          //刷新页面
          getUserInfo()
          return true
        } else {
          ElMessage.error('影片上傳失敗')

          return false
        }
      } catch (error) {
        ElMessage.error('影片上傳失敗')
        console.error('Upload error:', error) // 更详细的错误信息

        return false
      } finally {
        loading.value = false
      }
    } else {
      ElMessage.error('請選擇視訊文件')
      return false
    }
  }
}

onMounted(async () => {
  const key = route.query.hash || ''
  if (key) {
    console.log('key', key)
    const res = await viewUserInfo({ hash: key })
    if (res.data.code === 0) {
      tableData.value = res.data.json.user_info_list
      for (const item of tableData.value) {
        item.flagBool = item.flag === '1'
        for (const i of item.upload_info_list) {
          if (i.url.includes('_video.')) {
            item.videoUrl = i.url
          }
          if (i.url.includes('_pdf.')) {
            item.contractUrl = i.url
          }
          if (i.url.includes('_idcardb.')) {
            item.idCardBUrl = i.url
          }
          if (i.url.includes('_idcardf.')) {
            item.idCardFUrl = i.url
          }
        }
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
  width: 100vw;
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
