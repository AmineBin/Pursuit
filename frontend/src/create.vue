<template>
  <div id="create">
    <Header />
    <router-view />
    <h1>Enter your new goal</h1>
    <label for="name">Enter goal's name&nbsp;:</label><br>

    <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br>

    <label for="type-select">Choose a type&nbsp;:</label><br>

    <select v-model="selectedTypeId" name="type" id="type-select">
      <option value="">--Please choose an option--</option>
      <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
    </select><br>

    <label> {{  label }}</label><br>
    <input :type="inputType" v-model="goalValue" id="value" name="value" min="0" required /><br><br>

    <button type="submit">Create Goal</button>
    <button type="button" onclick="window.history.back();">Back</button>
  </div>
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

    inputType() {
      if (!this.selectedType) return 'text'

      if (this.selectedType.name === 'Time') return 'time'
      if (this.selectedType.name === 'Distance') return 'number'
    },

    label() {
      if (!this.selectedType) return 'Value'

      if (this.selectedType.name === 'Time') return 'Duration'
      if (this.selectedType.name === 'Distance') return 'Distance (km)'
    }
  },

  watch: {
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