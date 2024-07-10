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
        <div class="phone_id_card_title">身份证号 :</div>
        <div class="phone_id_card">{{ tableitem?.id_card }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">手机号 :</div>
        <div class="phone_Mobile">{{ tableitem?.phone }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">通讯地址 :</div>
        <div class="phone_Mobile">{{ tableitem?.mail_address }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">金额 :</div>
        <div class="phone_Mobile">{{ tableitem?.amount }}</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">买/卖 :</div>
        <div class="phone_Mobile">
          {{ tableitem?.buy_or_sell == 1 ? '买' : '卖' }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">资金来源 :</div>
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
        <div class="phone_Mobile_title">接收方钱包地址 :</div>
        <div class="phone_Mobile">
          {{ tableitem?.wallet_address ? tableitem?.wallet_address : '暂无' }}
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">
          是否有五级等以内为重要政治性职务人士 :
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
      <div class="phone_father">
        <div class="phone_Mobile_title">查看合同 :</div>
        <a :href="tableitem.upload_info_list[3].url" target="_blank">
          <div class="phone_Mobile">点击查看</div>
        </a>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看视频 :</div>
        <a :href="tableitem.upload_info_list[2].url" target="_blank">
          <div class="phone_Mobile">点击查看</div>
        </a>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看身份证正面 :</div>
        <div
          class="phone_Mobile"
          @click="viewClick(tableitem.upload_info_list[0].url, 'idcardF')"
        >
          点击查看
        </div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看身份证背面 :</div>
        <div
          class="phone_Mobile"
          @click="viewClick(tableitem.upload_info_list[1].url, 'idcardB')"
        >
          点击查看
        </div>
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
        alt="查看身份证正面"
        style="width: 100%; height: auto"
      />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { checkUserInfo, viewUserInfo } from '@/api/login'
import { ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface RuleFormRequest {
  upload_info_list: {
    url: string
  }[]
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
  flagBool: boolean // 是否KYC
  // ViewTheContract: string // 查看合同
  // ViewVideo: string // 查看视频
  // ViewIDCardFront: string // 查看身份证正面
  // ViewIDCardBack: string // 查看身份证背面
}

const dialogVisible = ref(false)
const dialogUrl = ref('')
const dialogTitle = ref('图片预览')

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
      const res = await checkUserInfo({ hash: hash, flag: newValue.toString() })
      if (res.data.code !== 0) {
        throw new Error('操作失败')
      } else {
        // 刷新页面
        viewUserInfo({ hash: key })
      }
    } else {
      tableitem.value!.flagBool = tableitem.value!.flag === '1'
      throw new Error('用户取消了操作')
    }
  } catch (error) {
    tableitem.value!.flagBool = tableitem.value!.flag === '1'
    throw new Error('用户取消了操作')
  }
}

const viewClick = (link: string, type: 'idcardF' | 'idcardB') => {
  dialogUrl.value = link
  if (type === 'idcardF') {
    dialogTitle.value = '身份证正面预览'
  } else if (type === 'idcardB') {
    dialogTitle.value = '身份证背面预览'
  }
  dialogVisible.value = true
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
    const res = await viewUserInfo({ hash: key })
    if (res.data.code === 0) {
      tableitem.value = res.data.json.user_info_list[0]
      tableitem.value!.flagBool = tableitem.value!.flag === '1'
    }
    console.log('res', res.data.json.user_info_list)
  } else {
  }
})
</script>

<style scoped lang="less">
.w_phone {
  width: 100%;
  background: #dbdaee;
}
.phone {
  padding: 20px 5px;
  color: #404b7c;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;

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
