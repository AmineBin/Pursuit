import { createRouter, createWebHistory } from 'vue-router'
import Home from './home.vue'

// définir les routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
]

// créer le router
const router = createRouter({
    history: createWebHistory(),
    routes
})

// exporter pour pouvoir l'utiliser ailleurs
export default router
