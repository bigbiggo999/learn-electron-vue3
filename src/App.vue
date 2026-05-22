<template>
  <div class="app-shell">
    <aside class="sidebar">
      <h1>Electron Vue 3</h1>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/settings">设置</router-link>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style>
html, body, #app {
  margin: 0;
  min-height: 100%;
  font-family: Arial, sans-serif;
}
.app-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
}
.sidebar {
  background: #1f2937;
  color: white;
  padding: 24px;
}
.sidebar h1 {
  margin-top: 0;
  font-size: 1.4rem;
}
.sidebar nav {
  margin-top: 24px;
  display: grid;
  gap: 12px;
}
.sidebar a {
  color: #cbd5e1;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background .2s ease;
}
.sidebar a.router-link-active,
.sidebar a:hover {
  background: rgba(255,255,255,.12);
  color: white;
}
.content {
  padding: 32px;
  background: #f8fafc;
}
</style>
