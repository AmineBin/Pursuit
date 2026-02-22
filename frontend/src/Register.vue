<template>
  <form @submit.prevent="onSubmit">
    <label for="name">Enter a username&nbsp;:</label><br>
    <input type="text" id="name" name="name" required minlength="3" maxlength="20" size="30" v-model="name" /><br>
    <label for="email">Enter your email&nbsp;:</label><br>
    <input type="email" id="email" name="email" required size="30" v-model="email" /><br>
    <label for="password">Enter your password&nbsp;:</label><br>
    <input type="password" id="password" name="password" required size="30" v-model="password" /><br>
    <label for="confirm-password">Confirm your password&nbsp;:</label><br>
    <input type="password" id="confirm-password" name="confirm-password" required size="30" v-model="confirmPassword" /><br><br>
    <p>Already have an account? <a href="/login">Login</a></p>

    <button type="submit">
      Register
    </button>
  </form>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailExists: false,
    }
  },

  methods: {

    async checkUserEmailExists() {
      const res = await fetch(`http://localhost:3000/api/users/check-email?email=${this.email}`);
      const data = await res.json();
      return data.emailExists;
    },
    async checkUserNameExists() {
      const res = await fetch(`http://localhost:3000/api/users/check-name?name=${this.name}`);
      const data = await res.json();
      return data.nameExists;
    },

    addNewUser() {
      if (!this.name || !this.email) return;

      fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({google_id: this.google_id, name: this.name, email: this.email, password: this.password })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('User registered successfully! Redirecting to login page.');
            this.google_id = '';
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          } else {
            alert('Failed to register user. Please try again.');
          }
        })
        .catch(err => console.error(err));
    },

    async onSubmit() {
      if (this.password !== this.confirmPassword){
        alert('Password and confirm password does not match');
        return;
      }

      const emailExists = await this.checkUserEmailExists();
      const nameExists = await this.checkUserNameExists();

      if (emailExists) {
        alert('Email already exists. Please choose another one.');
        return;
      }
      if (nameExists) {
        alert('Username already exists. Please choose another one.');
        return;
      }
      this.addNewUser();
      this.$router.push('/login')
    }
  },
};
</script>