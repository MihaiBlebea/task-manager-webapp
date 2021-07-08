<template>
    <Background>
        <CenterCard>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="email">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password">
            </div>
            <div class="px-3 row justify-content-between align-items-center">
                <button class="btn btn-primary" v-on:click="loginHandler">Login</button>
                <div class="clickable" v-on:click="registerNavHandler">Register</div>
            </div>
        </CenterCard>
    </Background>
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
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters({
            token: 'token'
        })
    },
    methods: {
        ...mapActions({
            login: 'login'
        }),
        loginHandler: async function() 
        {
            await this.login({  
                email: this.email, 
                password: this.password
            })
        },
        registerNavHandler: function()
        {
            this.$router.push('/register')
        }
    },
    mounted: async function() {
        if (this.token !== null) {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
