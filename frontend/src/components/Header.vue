<template>
    <header class="header">
        <nav>
            <router-link to="/">Accueil</router-link>
            <router-link to="/Form">Goals</router-link>
            <router-link to="/List">List</router-link>
            <router-link to="/Create">Create</router-link>
            <router-link to="/Login">Login</router-link>
            <router-link to="/Register">Register</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
};
</script>