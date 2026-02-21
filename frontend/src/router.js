import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Form from './Form.vue'
import Create from './Create.vue'
import List from './List.vue'
import Login from './Login.vue'
import Register from './Register.vue'

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
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

// créer le router
const router = createRouter({
    history: createWebHistory(),
    routes
})

// exporter pour pouvoir l'utiliser ailleurs
export default router
