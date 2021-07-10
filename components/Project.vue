<template>
    <div class="d-flex justify-content-between align-items-center" v-on:click="selectProjectHandler(projectId)">
        {{ projectTitle }}
        <div class="d-flex align-items-center">
            <NuxtLink class="nav-link" :to="'/home/project/' + projectId"><font-awesome-icon icon="adjust"/></NuxtLink>
            <font-awesome-icon icon="calendar-times" v-on:click="removeProjectHandler(projectId)"/>
        </div>
    </div>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'
export default {
    props: {
        projectId: {
            type: Number,
            required: false
        },
        projectTitle: {
            type: String,
            required: false,
            default: ''
        },
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
        selectProjectHandler: async function (projectId)
        {
            let found = 0
            this.projects.forEach((project, index) => {
                if (project.id === projectId) {
                    found = index
                }
            })

            await this.selectProject(found)
        },
        removeProjectHandler: async function (projectId)
        {
            await this.removeProject({ id: projectId })
        }
    }
}
</script>
