<template>
    <div class="row">
        <div class="col-md-4 bg-danger p-2">
            <div class="clickable" 
                v-for="(project, index) in projects" 
                :key="index"
            >
                <!-- <div class="d-flex justify-content-between align-items-center">
                    {{ project.title }}
                    <div class="d-flex align-items-center">
                        <NuxtLink class="nav-link" :to="'/home/project/' + project.id"><font-awesome-icon icon="adjust"/></NuxtLink>
                        <font-awesome-icon icon="calendar-times" v-on:click="removeProjectHandler(project.id)"/>
                    </div>
                </div> -->
                <project 
                    :project-id="project.id" 
                    :project-title="project.title"
                />
                <hr class="p-0 m-0" v-if="shouldDisplayDivider(index)" />
            </div>
        </div>
        <div class="col-md-8 p-2">
            <div 
                class="mb-2" 
                v-for="(task, index) in tasks" 
                :key="index"
            >
                <task :task-id="task.id" :task-title="task.title" />
            </div>

            <div v-if="pendingTask">
                <task  :init-state="1" v-on:cancel="cancelTaskHandler" />
            </div>

            
            <div v-on:click="createTaskHandler">
                <font-awesome-icon icon="calendar-plus"/> Add task...
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Task from '~/components/Task.vue'
import Project from '~/components/Project.vue'
export default {
    data: function() {
        return {
            pendingTask: false
        }
    },
    components: {
        'task': Task,
        'project': Project
    },
    computed: {
        ...mapGetters({
            token: 'token',
            projects: 'projects',
            tasks: 'tasks'
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

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
