<template>
    <Background>
        <CenterCard>
            <h1>Title</h1>
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
