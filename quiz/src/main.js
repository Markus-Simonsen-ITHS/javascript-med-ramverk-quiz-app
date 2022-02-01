import { createApp } from "vue"

import { createRouter, createWebHistory } from "vue-router"

import App from "./App.vue"
import store from "./store"

import { registerSW } from "virtual:pwa-register"
registerSW()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("./views/LandingPage.vue")
    },
    {
      path: "/quiz",
      name: "quiz",
      component: () => import("./views/Quiz.vue")
    },
    {
      path: "/hint/:index",
      name: "hint",
      component: () => import("./views/HintPage.vue")
    }
  ]
})

createApp(App).use(router).use(store).mount("#app")
