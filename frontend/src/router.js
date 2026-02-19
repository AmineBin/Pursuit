import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Form from './Form.vue'
import Create from './Create.vue'
import List from './List.vue'

// définir les routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/form',
        name: 'Form',
        component: Form
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/list',
        name: 'List',
        component: List
    }
]

// créer le router
const router = createRouter({
    history: createWebHistory(),
    routes
})

// exporter pour pouvoir l'utiliser ailleurs
export default router
