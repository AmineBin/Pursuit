<template>
    <header class="header">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/mygoals">My goals</router-link>
            <router-link to="/list">Goals created</router-link>
            <router-link to="/create">Create</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
};
</script>