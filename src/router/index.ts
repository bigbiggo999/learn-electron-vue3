import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/about', name: 'About', component: AboutPage },
    { path: '/settings', name: 'Settings', component: SettingsPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
