<template>
  <div id="form">
    <Header />
    <router-view />
    <h1>Today's goals</h1>

    <form>
      <h2>Séance de sport</h2>
      <button type="button"></button>
      <select name="type" id="type-select">
        <option value="">--Please choose an option--</option>
      </select> <br>

      <button type="button">Delete</button>
      <button type="button">Edit</button>
    </form>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: "Form",
  components: {
    Header,
  }
};
</script>