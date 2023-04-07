import { createApp } from 'vue'
import './index.css'
import { ClientJS } from "clientjs"
import hljs from 'highlight.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import App from './App.vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const client = new ClientJS();
const fingerprint = client.getFingerprint();
localStorage.setItem('C-USER_FINGER', fingerprint)

app.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
