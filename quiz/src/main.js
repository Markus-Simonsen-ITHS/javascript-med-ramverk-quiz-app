import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import { registerSW } from 'virtual:pwa-register'
registerSW()    

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('./views/Landing.vue')
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: () => import('./views/Quiz.vue')
        },
    ]
})

createApp(App).use(router).mount('#app')
