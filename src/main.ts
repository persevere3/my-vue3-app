import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './store'
import 'uno.css' // UnoCSS 样式入口
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus).use(pinia).use(router).mount('#app')