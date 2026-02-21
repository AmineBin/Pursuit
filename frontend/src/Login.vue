<template>
  <label for="email">Enter your email&nbsp;:</label><br>
  <input type="email" id="email" name="email" required size="30" /><br>
  <label for="password">Enter a password&nbsp;:</label><br>
  <input type="password" id="password" name="password" required size="30"/><br><br>
  <p>No Pursuit account yet? <a href="/register">Register</a></p>

  <button type="submit">
    Connect
  </button>
  
  <button @click="login">
    Connect with Google
  </button>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

// Accéder au store d'authentification et au router
const auth = useAuthStore()
const router = useRouter()

// Fonction de connexion avec Google
async function login() {
  try {
    await auth.loginWithGoogle()

    // Rediriger vers la page d'accueil après une connexion réussie
    if (auth.user) {
      router.push('/')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
};
</script>