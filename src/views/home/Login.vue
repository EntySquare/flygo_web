<!-- src/components/Login.vue -->
<template>
  <div class="login-container">
    <h2 class="login-title">登录</h2>
    <el-form
      :model="loginForm"
      ref="loginFormRef"
      :rules="rules"
      class="demo-loginForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="manager_name ">
        <el-input
          v-model.trim="loginForm.manager_name"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="loginForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="SaveCommit" type="primary" @click="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { Login } from '@/api/login'
import CryptoJS from 'crypto-js'
import useHomeStore from '@/store/modules/home'

interface LoginForm {
  manager_name: string
  password: string
}

const loginForm = ref<LoginForm>({
  manager_name: '',
  password: ''
})

const rules = ref({
  manager_name: [
    { required: true, message: '请输入用户名', trigger: 'change' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
})

const loginFormRef = ref()

const handleLogin = () => {
  const key = CryptoJS.enc.Utf8.parse('jamescnm12345678')
  const s1 = CryptoJS.enc.Utf8.parse(loginForm.value.password)
  const s1Data = CryptoJS.AES.encrypt(s1, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  })
  loginForm.value.password = CryptoJS.enc.Base64.stringify(s1Data.ciphertext)
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 在此处处理登录逻辑，例如发送请求到服务器进行验证
      const res = await Login(loginForm.value)
      console.log('res', res.data.json.token)

      if (res.data.code === 0) {
        ElMessage.success('登录成功')
        const storedToken = localStorage.getItem('token')
        console.log('storedToken', storedToken)
        useHomeStore().setToken(res.data.json.token)
        if (storedToken == null) {
          localStorage.setItem('token', res.data.json.token)
        }
        router.push({ path: '/', query: { key: storedToken } })
      } else {
        ElMessage.error(res.statusText)
      }
    } else {
      ElMessage.error('请填写正确的表单信息')
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #d7e2f5;
}

.login-title {
  font-size: 50px;
  text-align: center;
  color: #000;
  font-weight: 400;
}

:deep(.el-form-item__label::before) {
  content: '' !important;
  margin-right: 0px !important;
  margin: 0 !important;
  padding: 0 !important;
}

.demo-loginForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.el-form-item__label) {
  color: #404b7c;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
:deep(.el-form-item__label::before) {
  content: '' !important;
  margin-right: 0px !important;
  margin: 0 !important;
  padding: 0 !important;
}
:deep(.el-input__wrapper) {
  display: flex;
  width: 504px;
  padding: 12px 11px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #f6f6f6;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
}
:deep(.el-input__inner) {
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.SaveCommit {
  border-radius: 4px;
  background: #005efe;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 54px;
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;
}
@media (max-width: 600px) {
  :deep(.el-input__wrapper) {
    display: flex;
    width: 90vw !important;
    padding: 12px 11px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #f6f6f6;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  }
}
</style>
