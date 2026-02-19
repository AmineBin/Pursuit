<template>
  <div class="home">
    <Header />
    <router-view />
    <h1>PURSUIT</h1>
    <p>Stop dreaming about it, start doing it</p>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: "Home",
  components: {
    Header,
  },
};
</script>
