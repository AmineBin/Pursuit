import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Create from './Create.vue'
import Dashboard from './Dashboard.vue'
import Goals from './Goals.vue'
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
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/goals',
        name: 'Goals',
        component: Goals
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
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
