import { createApp } from 'vue'
import './style.css'
import router from './router.js'
import Home from './home.vue'

const app = createApp(Home)
app.use(router)
app.mount('#app')
