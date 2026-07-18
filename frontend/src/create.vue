<template>
  <Header />
  <div class="form-container">
    <form ref="addGoalForm" @submit.prevent="addGoal" class="form">
      <h1>New goal</h1>
    <label for="name">Title&nbsp;:</label><br>

    <input v-model="name" type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br>

    <label for="description">Description&nbsp;:</label><br>

    <textarea v-model="description" id="description" name="description" required minlength="1" maxlength="100" size="30"
      rows="4" cols="50"></textarea><br>

    <label for="type">Type&nbsp;:</label><br>
    <div>
      <select v-model.number="selectedTypeId" name="type_id" id="type_id">
        <option value="" disabled>--Please choose an option--</option>
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
      </select><br>
      <button type="button" v-on:click="openPopup" class="primary-button">New type</button>
    </div>
    <div v-if="showPopup" class="modal-overlay" @click.self="closePopup">
      <PopUpAddNewType @closePopup="closePopup" />
    </div>
    <!-- <label>{{ label }}</label><br> -->

    <!-- <input :type="inputType" v-model="goalValue" id="goalValue" name="value" min="0" :disabled="status === 'disabled'" required /><br> -->

    <label for="frequency">Frequency&nbsp;:</label><br>

    <fieldset style="display: flex; gap: 8px; border: none; padding: 0;">
      <div v-for="frequency in frequencies" :key="frequency.frequency_id">
        <input v-model.number="selectedFrequencyId" type="radio" :id="frequency.frequency_id" name="frequency"
          :value="frequency.frequency_id" class="sr-only" />
        <label :for="frequency.frequency_id" class="radio-button">{{ frequency.name }}</label>
      </div>
    </fieldset><br>
      <button type="submit" class="primary-button">Create goal</button>
    </form>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import PopUpAddNewType from './components/PopUpAddNewType.vue';
export default {
  name: "Create",
  components: {
    Header,
    PopUpAddNewType,
  },

  data() {
    return {
      types: [],
      frequencies: [],
      name: '',
      description: '',
      selectedTypeId: '',
      selectedFrequencyId: '',
      showPopup: false,
    }
  },

  mounted() {
    fetch('http://localhost:3000/api/types')
      .then(res => res.json())
      .then(data => {
        this.types = data
      })
      .catch(err => console.error(err));

    fetch('http://localhost:3000/api/frequencies')
      .then(res => res.json())
      .then(data => {
        this.frequencies = data
      })
      .catch(err => console.error(err));
  },
  methods: {
    openPopup: function () {
      this.showPopup = true;
    },
    closePopup: function () {
      this.showPopup = false;
    },

    async addGoal() {
      const goal = {
        name: this.name,
        description: this.description,
        type_id: this.selectedTypeId,
        frequency_id: this.selectedFrequencyId
      }

      const response = await fetch('http://localhost:3000/api/goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
      });
      if (!response.ok) {
        throw new Error('Error : ' + response.status)
      }
      this.$refs.addGoalForm.reset();
      this.name = '';
      this.description = '';
      this.selectedTypeId = '';
      this.selectedFrequencyId = '';
    },
  },
};
</script>