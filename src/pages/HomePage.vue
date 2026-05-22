<template>
  <section>
    <h2>欢迎来到首页</h2>
    <p>这是一个基于 Electron + Vue 3 的演示项目。</p>
    <button @click="showAppPath">获取应用数据目录</button>
    <p v-if="appPath"><strong>App Path:</strong> {{ appPath }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const appPath = ref('')

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
</style>
