<template>
    <popup class="popup">
        <form ref="addGoalForm" @submit.prevent="addGoal">
            <h2>New goal</h2>
            <label for="name">Title&nbsp;:</label><br>

            <input v-model="name" type="text" id="name" name="name" required minlength="1" maxlength="30"
                size="30" /><br>

            <label for="description">Description&nbsp;:</label><br>

            <textarea v-model="description" id="description" name="description" required minlength="1"
                maxlength="100" size="30" rows="4" cols="50"></textarea><br>

            <label for="type">Type&nbsp;:</label><br>

            <select v-model.number="selectedTypeId" name="type_id" id="type_id">
                <option value="" disabled>--Please choose an option--</option>
                <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select><br>

            <!-- <label>{{ label }}</label><br> -->

            <!-- <input :type="inputType" v-model="goalValue" id="goalValue" name="value" min="0" :disabled="status === 'disabled'" required /><br> -->

            <label for="frequency">Frequency&nbsp;:</label><br>

            <fieldset style="display: flex; gap: 8px; border: none; padding: 0;">
                <div v-for="frequency in frequencies" :key="frequency.frequency_id">
                    <input v-model.number="selectedFrequencyId" type="radio" :id="frequency.frequency_id"
                        name="frequency" :value="frequency.frequency_id" class="sr-only" />
                    <label :for="frequency.frequency_id" class="radio-button">{{ frequency.name }}</label>
                </div>
            </fieldset><br>
            <!-- <button type="cancel" onclick="window.history.back();">Cancel</button> -->
            <button type="button" @click="$emit('closePopup')" class="close-btn primary-button">
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
            <button type="submit" class="primary-button">Create goal</button>
        </form>
    </popup>
</template>

<script>
export default {
    name: "PopUpCreateGoal",

    data() {
        return {
            types: [],
            frequencies: [],
            name: '',
            description: '',
            selectedTypeId: '',
            selectedFrequencyId: '',
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