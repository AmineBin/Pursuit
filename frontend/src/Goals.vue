<template>
  <Header />
  <router-view />
  <div id="card">

    <h1>My goals</h1>
    <!-- <div class="buttons">
      <button type="button" v-on:click="openPopup" class="primary-button">New goal</button>
    </div> -->
    <dialog v-if="showPopup" open>
      <PopUpCreateGoal :types="types" @closePopup="showPopup = false" />
      <button type="button" @click="showPopup = false" class="primary-button">Close</button>
    </dialog>
    <div class="grid-container">

      <div v-for="goal in goals" :key="goal.goal_id" class="form">
        <button type="button" class="primary-button">
          <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 117.74 122.88"
            style="enable-background:new 0 0 117.74 122.88" xml:space="preserve">
            <g>
              <path class="st0"
                d="M94.62,2c-1.46-1.36-3.14-2.09-5.02-1.99c-1.88,0-3.56,0.73-4.92,2.2L73.59,13.72l31.07,30.03l11.19-11.72 c1.36-1.36,1.88-3.14,1.88-5.02s-0.73-3.66-2.09-4.92L94.62,2L94.62,2L94.62,2z M41.44,109.58c-4.08,1.36-8.26,2.62-12.35,3.98 c-4.08,1.36-8.16,2.72-12.35,4.08c-9.73,3.14-15.07,4.92-16.22,5.23c-1.15,0.31-0.42-4.18,1.99-13.6l7.74-29.61l0.64-0.66 l30.56,30.56L41.44,109.58L41.44,109.58L41.44,109.58z M22.2,67.25l42.99-44.82l31.07,29.92L52.75,97.8L22.2,67.25L22.2,67.25z"
                fill="#ffffff" />
            </g>
          </svg>
        </button>
        <button type="button" @click="deleteGoal(goal.goal_id)" class="close-btn primary-button">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#C4F5E1"></path>
            </g>
          </svg>
        </button>
        <h2>{{ goal.name }}</h2>
        <p>{{ goal.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import PopUpCreateGoal from './components/PopUpCreateGoal.vue';
export default {
  name: "List",
  components: {
    Header,
    PopUpCreateGoal,
  },

  data() {
    return {
      goals: [],
      types: [],
      showPopup: false
    }
  },

  mounted() {

    // récupérer tout les objectifs
    fetch(`http://localhost:3000/api/goals`)
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
    openGoal(goal) {
      this.$router.push({ path: '/form', query: { goal: goal.goal_id } });
    },
    openPopup: function () {
      this.showPopup = true;
    },
    closePopup: function () {
      this.showPopup = false;
    },
    getTypeName(goal) {
      const typeId = goal.type_id ?? goal.type;
      const type = this.types.find(item => item.id === typeId);

      return type ? type.name : '';
    },
    getTypeUnity(goal) {
      const typeId = goal.type_id ?? goal.type;
      const type = this.types.find(item => item.id === typeId);

      return type ? type.unity : '';
    },
    async deleteGoal(goal_id) {

      const response = await fetch('http://localhost:3000/api/goal', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ goal_id })
      });
      if (!response.ok) {
        throw new Error('Error : ' + response.status)
      }
      this.goals = this.goals.filter(goal => goal.goal_id !== goal_id);
    },
  },
};
</script>