<template>
  <div class="w_phone" style="padding: 10px">
    <div class="phone">
      <div class="phone_father">
        <div class="phone_id_title">id :</div>
        <div class="phone_id">v21v8fd2hg1dhvv2qf</div>
      </div>
      <div class="phone_father">
        <div class="phone_name_title">姓名 :</div>
        <div class="phone_name">段嘉衍</div>
      </div>
      <div class="phone_father">
        <div class="phone_id_card_title">身份证号 :</div>
        <div class="phone_id_card">3578575621</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">手机号 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">通讯地址 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">金额 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">买/卖 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">资金来源 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">委托买费用途 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">接收方钱包地址 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">
          是否有五级等以内为重要政治性职务人士 :
        </div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">是否KYC :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看合同 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看视频 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看身份证正面 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
      <div class="phone_father">
        <div class="phone_Mobile_title">查看身份证背面 :</div>
        <div class="phone_Mobile">1234576735786</div>
      </div>
    </div>
  </div>
</template>

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
