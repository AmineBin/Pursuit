<template>
    <header class="header">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/goals">Goals</router-link>
            <router-link to="/create">Create</router-link>
            <router-link to="/completed">Completed</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
};
</script>