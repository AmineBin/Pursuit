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
        <div class="up-left-btn">
          <button type="button" class="icon-btn primary-button">
            <svg fill="#C4F5E1" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 494.936 494.936" xml:space="preserve"
              stroke="#C4F5E1">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path
                      d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z">
                    </path>
                    <path
                      d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z">
                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <button type="button" @click="deleteGoal(goal.goal_id)" class="icon-btn primary-button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                  stroke="#C4F5E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M14 11V17" stroke="#C4F5E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M10 11V17" stroke="#C4F5E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                </path>
              </g>
            </svg>
          </button>
        </div>
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