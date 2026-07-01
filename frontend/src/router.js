import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import MyGoals from './MyGoals.vue'
import Create from './Create.vue'
import GoalsCreated from './GoalsCreated.vue'
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
        path: '/mygoals',
        name: 'MyGoals',
        component: MyGoals
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/list',
        name: 'GoalsCreated',
        component: GoalsCreated
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
