import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)

    async function loginWithGoogle() {
        try {
            user.value = { name: 'Amine', email: 'amine@test.com' }
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    function logout() {
        user.value = null
    }

    return { user, loginWithGoogle, logout }

})