import { createApp } from 'vue'
import { fpjsPlugin } from '@fingerprintjs/fingerprintjs-pro-vue-v3';
import './index.css'
import hljs from 'highlight.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import App from './App.vue'
const app = createApp(App)
const apiKey = 'public-x-key-XgaNUcZMqs2HBy7fqE2qERCc'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
app.use(fpjsPlugin, {
  loadOptions: {
    apiKey
  },
})
app.use(router)
app.use(ElementPlus)
app.mount('#app')
