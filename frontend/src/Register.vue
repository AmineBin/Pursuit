<template>
  <label for="name">Enter a username&nbsp;:</label><br>
  <input type="text" id="name" name="name" required minlength="3" maxlength="20" size="30" /><br>
  <label for="email">Enter your email&nbsp;:</label><br>
  <input type="email" id="email" name="email" required size="30" /><br>
  <label for="password">Enter your password&nbsp;:</label><br>
  <input type="password" id="password" name="password" required size="30" /><br>
  <label for="confirm-password">Confirm your password&nbsp;:</label><br>
  <input type="password" id="confirm-password" name="confirm-password" required size="30" /><br><br>
  <p>Already have an account? <a href="/login">Login</a></p>

  <button type="submit">
    Register
  </button>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      name: '',
      email: '',
      emailExists: false,
    }
  },

  checkUserExists() {
    if (!this.email || this.name) return;
    
    // --- TODO Continuer ça ---
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        console.log(data.exists)
      })
      .catch(err => console.error(err));
  }
};
</script>