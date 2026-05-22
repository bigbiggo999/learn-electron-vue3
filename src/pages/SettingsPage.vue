<template>
  <section>
    <h2>设置</h2>
    <p>你可以在这里扩展应用设置，比如主题、语言或本地配置。</p>
    <div class="setting-card">
      <label>
        <input type="checkbox" v-model="darkMode" /> 启用深色模式
      </label>
    </div>
    <p>当前状态：<strong>{{ darkMode ? '已启用' : '未启用' }}</strong></p>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const darkMode = ref(false)

watchEffect(() => {
  document.body.style.backgroundColor = darkMode.value ? '#0f172a' : '#f8fafc'
  document.body.style.color = darkMode.value ? '#e2e8f0' : '#0f172a'
})
</script>

<style scoped>
section {
  max-width: 760px;
}
.setting-card {
  margin: 16px 0;
  padding: 16px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.08);
}
label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
input[type='checkbox'] {
  width: 18px;
  height: 18px;
}
</style>
