<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-2">
        <div class="container-fluid p-0">
            <a class="navbar-brand" href="#">Navbar</a>
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NuxtLink class="nav-link" to="/"><font-awesome-icon icon="home"/></NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link" to="/project"><font-awesome-icon icon="calendar-plus"/></NuxtLink>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" v-on:click="logoutHandler"><font-awesome-icon icon="door-closed"/></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions({
            logout: 'logout'
        }),
        logoutHandler: function()
        {
            this.logout()
        }
    }
}
</script>
