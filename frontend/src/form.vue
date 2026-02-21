<template>
  <div id="form">
    <Header />
    <router-view />
    <h1>Today's goals</h1>
      <h2>Séance de sport</h2>
      <button @click="isActive = !isActive">
        {{ isActive ? 'ON' : 'OFF' }}
      </button> <br><br>
      <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br><br>

      <button type="button">Delete</button>
      <button type="button">Edit</button>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: "Form",
  components: {
    Header,
  },

  data() {
    return {
      isActive: false
    }
  }
};
</script>