<template>
  <div class="list">
    <Header />
    <router-view />
    <h1>Goals</h1>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: "List",
  components: {
    Header
  },
};
</script>