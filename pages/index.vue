<template>
    <Background>
        <Main>
            <div class="row">
                <div class="col-md-4 bg-danger p-2">
                    ceva
                </div>
                <div class="col-md-8 p-2">
                    altceva
                </div>
            </div>
        </Main>
    </Background>
</template>

<script>
import { mapGetters } from 'vuex'
import Main from '/layouts/Main.vue'
import Background from '/layouts/Background.vue'
export default {
    components: {
        Background,
        Main
    },
    data: function() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            token: 'token'
        })
    },
    mounted: function() {
        // if (this.token === null) {
        //     this.$router.push('/login')
        // }
    }
}
</script>
