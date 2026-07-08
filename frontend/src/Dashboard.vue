<template>
  <div id="form">
    <Header />
    <router-view />
    <h1>Daily goals</h1>
    <div class="grid-container">
      <div v-for="goal in goals" :key="goal.goal_id" class="form">
        <h2>{{ goal.name }}</h2>
        <p>{{ goal.description }}</p>
        <div class="line-container">
          <p>{{ getTypeName(goal) }}</p>
          <input type="number" min="0" step="1" />
          <p>{{ getTypeUnity(goal) }}</p>
        </div>

        <div class="buttons">
          <button type="button" class="primary-button">Done</button>
          <button type="button" class="primary-button">Edit</button>
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
      types: [],
    }
  },

  mounted() {

    fetch(`http://localhost:3000/api/goals/frequency?frequency_id=1`)
      .then(res => res.json())
      .then(data => {
        this.goals = data;
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:3000/api/types`)
      .then(res => res.json())
      .then(data => {
        this.types = data;
      })
      .catch(err => console.error(err));
  },

  methods: {
    getTypeName(goal) {
      const typeId = goal.type_id ?? goal.type;
      const type = this.types.find(item => item.id === typeId);

      return type ? type.name : '';
    },
    getTypeUnity(goal) {
      const typeId = goal.type_id ?? goal.type;
      const type = this.types.find(item => item.id === typeId);

      return type ? type.unity : '';
    }
  },
};
</script>