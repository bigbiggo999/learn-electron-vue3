<template>
  <section>
    <h2>欢迎来到首页</h2>
    <p>这是一个基于 Electron + Vue 3 的演示项目。</p>
    <div class="form-container">
      <h3>用户信息表单</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">用户名</label>
          <input id="username" v-model="formData.username" type="text" placeholder="请输入用户名" />
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input id="email" v-model="formData.email" type="email" placeholder="请输入邮箱地址" />
        </div>
        <button type="submit">提交</button>
      </form>
      <div v-if="submitted" class="success-message">
        <p>表单已提交！用户名: <strong>{{ formData.username }}</strong>, 邮箱: <strong>{{ formData.email }}</strong></p>
      </div>
    </div>

    <button @click="showAppPath">获取应用数据目录</button>
    <p v-if="appPath"><strong>App Path:</strong> {{ appPath }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const appPath = ref('')
const submitted = ref(false)
const formData = ref({
  username: '',
  email: ''
})

function submitForm() {
  submitted.value = true
}

function showAppPath() {
  if (window.electronAPI) {
    window.electronAPI.getAppPath().then(path => {
      appPath.value = path
    })
  } else {
    appPath.value = 'Electron API 未就绪'
  }
}
</script>

<style scoped>
section {
  max-width: 760px;
}
button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #1d4ed8;
}
.form-container {
  margin: 20px 0;
  padding: 16px;
  background: #f0f4f8;
  border-radius: 8px;
}
.form-container h3 {
  margin-top: 0;
  color: #1f2937;
}
.form-group {
  margin-bottom: 12px;
}
.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #374151;
}
.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}
.form-group input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.success-message {
  margin-top: 12px;
  padding: 12px;
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  border-radius: 4px;
  color: #065f46;
}
</style>
