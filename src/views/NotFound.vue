<template>
  <div class="not-found">
    <h1 class="error-code">404</h1>
    <p class="error-message">抱歉，您訪問的頁面不存在！</p>
    <router-link to="/" class="home-button">返回首頁</router-link>
  </div>
</template>
  
  <script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>
  
  <style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
  color: #333;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  color: #409eff;
}

.error-message {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.home-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #66b1ff;
}
</style>
  