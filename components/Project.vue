<template>
    <div class="card p-0" v-on:click="selectProjectHandler">
        <div class="card-body p-2">

            <font-awesome-icon :icon="data.icon" />

            <h4>{{ data.title }}</h4>


            <div class="d-flex align-items-center">
                <NuxtLink class="nav-link" :to="'/project/' + data.id + '/update'">
                    <font-awesome-icon icon="adjust" />
                </NuxtLink>
                <font-awesome-icon icon="calendar-times" v-on:click="removeProjectHandler"/>
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
        }
    }
}
</script>
