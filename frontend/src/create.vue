<template>
  <div id="create">
    <Header />
    <router-view />
    <h1>Enter your new goal</h1>
    <label for="name">Enter goal's name&nbsp;:</label><br>

    <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br>

    <label for="type-select">Choose a type&nbsp;:</label><br>

    <select name="type" id="type-select">
      <option value="">--Please choose an option--</option>
      <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
    </select><br>

    <label for="type-select">Quantity&nbsp;:</label><br>
    <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br><br>

    <button type="submit">Create Goal</button>
    <button type="button" onclick="window.history.back();">Back</button>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: "Create",

  components: {
    Header,
  },

  data() {
    return {
      types: []
    }
  },

  mounted() {
    fetch('http://localhost:3000/api/types')
      .then(res => res.json())
      .then(data => {
        this.types = data
      })
      .catch(err => console.error(err));
  }
}
</script>