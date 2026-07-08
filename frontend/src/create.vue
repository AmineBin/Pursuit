<template>
  <Header />
    <router-view />
  <popup class="popup">
    <h1>Enter your new goal</h1>
    <label for="name">Title&nbsp;:</label><br>

    <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br>

    <label for="description">Description&nbsp;:</label><br>

    <input type="text" id="description" name="description" required minlength="1" maxlength="100" size="30" /><br>

    <label for="type-select">Choose a type&nbsp;:</label><br>

    <select v-model.number="selectedTypeId" name="type" id="type-select">
      <option value="" disabled>--Please choose an option--</option>
      <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
    </select><br>

    <label for="type-select">Choose a period&nbsp;:</label><br>

    <select v-model.number="selectedPeriodId" name="type" id="type-select">
      <option value="" disabled>--Please choose an option--</option>
      <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.name }}</option>
    </select><br>

    <label> {{ label }}</label><br>
    <input :type="inputType" v-model="goalValue" id="value" name="value" min="0" :disabled="status === 'disabled'"
      required /><br><br>

    <button type="submit" class="primary-button">Create Goal</button>
    <button type="button" onclick="window.history.back();" class="primary-button">Back</button>
  </popup>
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
      types: [],
      selectedTypeId: '',
      goalValue: '',
    }
  },

  computed: {
    selectedType() {
      return this.types.find(type => type.id === this.selectedTypeId);
    },

    // Déterminer le type d'input à afficher en fonction du type de l'objectif sélectionné
    inputType() {
      if (!this.selectedType) return 'text'

      if (this.selectedType.name === 'Time') return 'time'
      if (this.selectedType.name === 'Distance') return 'number'
    },

    // Déterminer si l'input doit être activé ou désactivé en fonction du type de l'objectif sélectionné
    status() {
      if (!this.selectedType) return 'disabled'

      if (this.selectedType.name === 'Time') return 'enabled'
      if (this.selectedType.name === 'Distance') return 'enabled'
    },

    // Déterminer le label à afficher en fonction du type de l'objectif sélectionné
    label() {
      if (!this.selectedType) return 'Choose a type to enter a value'

      if (this.selectedType.name === 'Time') return 'Duration'
      if (this.selectedType.name === 'Distance') return 'Distance (km)'
    },

  },

  watch: {
    // Réinitialiser la valeur de l'objectif lorsque le type sélectionné change
    selectedTypeId() {
      this.goalValue = '';
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