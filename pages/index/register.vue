<template>
    <div>
        <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" class="form-control" v-model="username">
        </div>
        <div class="mb-3">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email">
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password">
        </div>
        <div class="mb-3">
            <label class="form-label">Confirm password</label>
            <input type="password" class="form-control" v-model="passwordConfirm">
        </div>
        <div class="px-3 row justify-content-between align-items-center">
            <button class="btn btn-primary" v-on:click="registerHandler">Register</button>
            <div class="clickable" v-on:click="loginNavHandler">Login</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CenterCard from '/layouts/CenterCard.vue'
import Background from '/layouts/Background.vue'
export default {
    components: {
        Background,
        CenterCard
    },
    data: function() {
        return {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    },
    computed: {
        ...mapGetters({
            token: 'token'
        })
    },
    methods: {
        ...mapActions({
            register: 'register'
        }),
        registerHandler: async function() 
        {
            await this.register({ 
                username: this.username, 
                email: this.email, 
                password: this.password
            })
        },
        loginNavHandler: function()
        {
            this.$router.push('/login')
        }
    }
}
</script>

