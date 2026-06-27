<template>
  <div id="form">
    <Header />
    <router-view />
    <h1>Today's goals</h1>
    <div class="grid-container">
      <div v-for="goal in goals" :key="goal.goal_id" class="form">
        <h2>{{ goal.name }}</h2>
        
        <p>{{ goal.description }}</p>
        <div class="buttons">
          <button type="button">Done</button>
          <button type="button">Edit</button>
        </div>
      </div>
    </div>

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
      goals: [],
    }
  },

  mounted() {

    fetch(`http://localhost:3000/api/goals`)
      .then(res => res.json())
      .then(data => {
        this.goals = data;
      })
      .catch(err => console.error(err));
  },
};
</script>