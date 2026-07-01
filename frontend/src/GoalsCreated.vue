<template>
  <div id="form">
    <Header />
    <router-view />
    <h1>My goals</h1>
    <div class="buttons">
      <button type="button" v-on:click="openPopup">New goal</button>
    </div>
    <dialog v-if="showPopup" open>
      <PopUpCreateGoal :types="types" />
      <button @click="showPopup = false">Close</button>
    </dialog>
    <div class="grid-container">

      <div v-for="goal in goals" :key="goal.goal_id" class="form">
        <button>
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
    openPopup: function (){
      this.showPopup = true;
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
    }
  },
};
</script>