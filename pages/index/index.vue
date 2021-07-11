<template>
    <div class="row p-3">
        <div class="col-md-6 mb-3 clickable" 
            v-for="(project, index) in projects" 
            :key="index"
        >
            <project :data="project" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Project from '~/components/Project.vue'
export default {
    data: function() {
        return {
            pendingTask: false
        }
    },
    components: {
        'project': Project
    },
    computed: {
        ...mapGetters({
            token: 'token',
            projects: 'projects',
            // tasks: 'tasks'
        })
    },
    methods: {
        ...mapActions({
            getProjects: 'getProjects',
            removeProject: 'removeProject'
        }),
        shouldDisplayDivider: function(index)
        {
            return index < this.projects.length - 1
        },
        removeProjectHandler: async function (projectId)
        {
            await this.removeProject({ id: projectId })
        },
        createTaskHandler: function()
        {
            this.pendingTask = true
        },
        cancelTaskHandler: function()
        {
            this.pendingTask = false
        }
    }
}
</script>

