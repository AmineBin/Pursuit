<template>
    <popup class="popup">
        <h1>Enter your new goal</h1>
        <label for="name">Enter goal's name&nbsp;:</label><br>

        <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" /><br>

        <label for="type-select">Choose a type&nbsp;:</label><br>

        <select v-model.number="selectedTypeId" name="type" id="type-select">
            <option value="" disabled>--Please choose an option--</option>
            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select><br>

        <label> {{ label }}</label><br>
        <input :type="inputType" v-model="goalValue" id="value" name="value" min="0" :disabled="status === 'disabled'"
            required /><br><br>

        <button type="submit">Create Goal</button>
        <button type="button" onclick="window.history.back();">Back</button>
    </popup>
</template>

<script>
export default {
    name: "PopUpCreateGoal",
};
</script>