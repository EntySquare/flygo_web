<template>
  <div v-if="tableitem" class="w_phone" style="padding: 10px">
    <div class="phone">
      <div class="phone_father">
        <div class="phone_id_title">hash :</div>
        <div class="phone_id">{{ tableitem?.hash }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_name_title">姓名 :</div>
        <div class="phone_name">{{ tableitem?.name }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_id_card_title">身份證號 :</div>
        <div class="phone_id_card">{{ tableitem?.id_card }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">手機號 :</div>
        <div class="phone_Mobile">{{ tableitem?.phone }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">通訊地址 :</div>
        <div class="phone_Mobile">{{ tableitem?.mail_address }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">金額 :</div>
        <div class="phone_Mobile">{{ tableitem?.amount }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">買/賣 :</div>
        <div class="phone_Mobile">
          {{ tableitem?.buy_or_sell == 1 ? '買' : '賣' }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">資金來源 :</div>
        <div class="phone_Mobile">
          {{ SourceOfFundsValuefun(tableitem.funding_source) }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">委托买费用途 :</div>
        <div class="phone_Mobile">
          {{ UseOfExpensesOptionsfun(tableitem.use_for) }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">接收方錢包地址 :</div>
        <div class="phone_Mobile">
          {{ tableitem?.wallet_address ? tableitem?.wallet_address : '暫無' }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">
          是否有五級等以內爲重要政治性職務人士 :
        </div>
        <div class="phone_Mobile">
          {{ tableitem.political == 1 ? '是' : '否' }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">是否KYC :</div>
        <!-- <div class="phone_Mobile">{{ tableitem?.flag }}</div> -->
        <el-checkbox
            v-model="tableitem.flagBool"
            size="large"
            @change="handleChange(Number(tableitem.flagBool), tableitem.hash)"
        />
      </div>
      <a :href="tableitem.contractUrl" target="_blank">
        <div class="phone_father">
          <div class="phone_Mobile_title">查看合同 :</div>
          <div class="phone_Mobile">點擊查看</div>
        </div>
      </a>
      <a v-if="tableitem.videoUrl" :href="tableitem.videoUrl" target="_blank">
        <div class="phone_father">
          <div class="phone_Mobile_title">查看視頻 :</div>
          <div class="phone_Mobile">點擊查看</div>
        </div>
      </a>
      <div class="phone_father" @click="openFileDialog">
        <div class="phone_Mobile_title">上傳視頻 :</div>
        <div class="phone_Mobile">點擊上傳</div>
        <!-- 隐藏的文件选择器 -->
        <input
            type="file"
            ref="videoInput"
            accept="video/*"
            style="display: none"
            @change="handleFileChange($event, tableitem.hash)"
        />
      </div>
      <div
          class="phone_father"
          @click="viewClick(tableitem.idCardFUrl, 'idcardF')"
      >
        <div class="phone_Mobile_title">查看身份證正面 :</div>
        <div class="phone_Mobile">點擊查看</div>
      </div>
      <div
          class="phone_father"
          @click="viewClick(tableitem.idCardBUrl, 'idcardB')"
      >
        <div class="phone_Mobile_title">查看身份證背面 :</div>
        <div class="phone_Mobile">點擊查看</div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog
        v-model="dialogVisible"
        :title="dialogTitle"
        :close-on-click-modal="true"
        :close-on-press-escape="true"
        :show-close="true"
        width="90%"
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
import {checkUserInfo, downloadFile, uploadFile, viewUserInfo} from '@/api/login'
import ffmpegFunctions from '@/utils/ffmpeg'
import {ElMessage, ElMessageBox} from 'element-plus'
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'

// if()
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

const dialogVisible = ref(false)
const dialogUrl = ref('')
const dialogTitle = ref('')

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
      const res = await checkUserInfo({hash: hash, flag: newValue.toString()})
      if (res.data.code !== 0) {
        throw new Error('操作失敗')
      } else {
        // 刷新页面
        viewUserInfo({hash: key})
      }
    } else {
      tableitem.value!.flagBool = tableitem.value!.flag === '1'
      throw new Error('用戶取消了操作')
    }
  } catch (error) {
    tableitem.value!.flagBool = tableitem.value!.flag === '1'
    throw new Error('用戶取消了操作')
  }
}

const viewClick = async (link: string, type: 'idcardF' | 'idcardB') => {
  try {
    const response = await downloadFile({"url": link})
    if (response.data.code === 0) {
      const byteArray = stringToUint8Array(response.data.json.img);
      const splitLink = link.split('.')
      const fileType = splitLink[splitLink.length - 1]
      const blob = new Blob([byteArray], {type: `image/${fileType}`});
      dialogUrl.value = URL.createObjectURL(blob);
    } else {
      console.error('圖片下載失敗:', response.data.json.message);
      return
    }
  } catch (error) {
    console.error('圖片下載失敗:', error);
    return
  }
  // dialogUrl.value = link
  if (type === 'idcardF') {
    dialogTitle.value = '身份證正面預覽'
  } else if (type === 'idcardB') {
    dialogTitle.value = '身份證背面預覽'
  }
  dialogVisible.value = true
}

const stringToUint8Array = (byteString: string) => {
  const byteCharacters = atob(byteString); // Decode base64 string
  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }
  return byteArray;
}

const SourceOfFundsValuefun = (form: number) => {
  if (form == 1) {
    return '活期存款'
  } else if (form == 2) {
    return '儲蓄存款'
  } else if (form == 3) {
    return '借貸款'
  } else if (form == 4) {
    return '股票'
  } else if (form == 5) {
    return '債券'
  } else if (form == 6) {
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
const route = useRoute()
const tableitem = ref<RuleFormRequest>()
const key = route.query.hash || ''
onMounted(async () => {
  if (key) {
    console.log('key', key)
    const res = await viewUserInfo({hash: key})
    if (res.data.code === 0) {
      tableitem.value = res.data.json.user_info_list[0]
      tableitem.value!.flagBool = tableitem.value!.flag === '1'
      for (const i of tableitem.value!.upload_info_list) {
        if (i.url.includes('_video.')) {
          tableitem.value!.videoUrl = i.url
        }
        if (i.url.includes('_pdf.')) {
          tableitem.value!.contractUrl = i.url
        }
        if (i.url.includes('_idcardb.')) {
          tableitem.value!.idCardBUrl = i.url
        }
        if (i.url.includes('_idcardf.')) {
          tableitem.value!.idCardFUrl = i.url
        }
      }
    }
    console.log('res', res.data.json.user_info_list)
  } else {
  }
})

const videoInput = ref<HTMLInputElement | null>(null)
const videoMsg = ref('')

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
          //刷新页面
          viewUserInfo({hash: key})
          return true
        } else {
          ElMessage.error('影片上傳失敗')

          return false
        }
      } catch (error) {
        ElMessage.error('影片上傳失敗')
        console.error('Upload error:', error) // 更详细的错误信息

        return false
      }
    } else {
      ElMessage.error('請選擇視訊文件')
      return false
    }
  }
}
</script>

<style scoped lang="less">
.w_phone {
  width: 100%;
  background: #dbdaee;
}

.phone_Mobile_title {
  color: #404b7c;
}

.phone {
  padding: 20px 5px;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #404b7c;

  :deep(.el-input__wrapper) {
    display: flex;
    width: 374px;
    padding: 10px 11px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #f6f6f6;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  }

  :deep(.el-input__inner) {
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .phone_father {
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    background: #f6f6f6;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    height: 50px;

    .phone_id,
    .phone_name,
    .phone_id_card,
    .phone_Mobile {
      color: #000;
    }
  }

  .details {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-radius: 4px;
    color: #fff;
    background: #005efe;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  }
}

@media (max-width: 768px) {
}
</style>
