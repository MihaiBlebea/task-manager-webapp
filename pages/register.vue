<template>
    <Background>
        <CenterCard>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Confirm password</label>
                <input type="password" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </CenterCard>
    </Background>
</template>

<script>
import CenterCard from '/layouts/CenterCard.vue'
import Background from '/layouts/Background.vue'
export default {
    components: {
        Background,
        CenterCard
    },
    data: function() {
        return {

        }
    },
    mounted: async function() {
        let result = await this.$api.get('/health-check')
        console.log(result)
    }
}
</script>
