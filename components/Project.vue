<template>
    <div class="card p-0">
        <div class="card-body p-2">

            <h4 class="text-center" v-on:click="selectProjectHandler">{{ data.title }}</h4>

            <div class="d-flex align-items-center">
                <font-awesome-icon icon="adjust" class="clickable mr-3" v-on:click="editProjectHandler"/>
                <font-awesome-icon icon="calendar-times" class="clickable" v-on:click="removeProjectHandler"/>
            </div>
        </div>
    </div>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            projects: 'projects'
        })
    },
    methods: {
        ...mapActions({
            selectProject: 'selectProject',
            removeProject: 'removeProject'
        }),
        selectProjectHandler: function ()
        {
            this.$router.push('/project/' + this.data.id)
        },
        removeProjectHandler: async function ()
        {
            await this.removeProject({ id: this.data.id })
        },
        editProjectHandler: function ()
        {
            this.$router.push('/project/editor/' + this.data.id)
        }
    }
}
</script>

<style scoped>

</style>