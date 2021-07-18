<template>
    <div>
        <h2>
            <font-awesome-icon 
                icon="angle-left" 
                class="clickable" 
                v-on:click="$router.push('/')" 
            />
            {{ project.title }} project
        </h2>

        <p>{{ project.description }}</p>
        <p>Tasks:</p>

        <div class="mb-2" v-for="(task, index) in incompleteTasks" :key="task.id + '_' + index">
            <task :project-id="id" :data="task" />
        </div>

        <task 
            :init-state="1" 
            :project-id="id" 
            v-if="pendingTask" 
            v-on:cancel="pendingTaskHandler" 
        />

        <div class="d-flex align-items-center" v-on:click="pendingTaskHandler" v-if="!pendingTask">
            <font-awesome-icon class="mr-2" icon="calendar-plus"/>
            Task
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from '~/components/Task.vue'
export default {
    async asyncData({ params }) {
        const id = params.projectId
        return { id: parseInt(id) }
    },
    data: function ()
    {
        return {
            pendingTask: false
        }
    },
    components: {
        Task
    },
    computed: {
        ...mapGetters({
            projects: 'projects',
            projectFinder: 'project',
            tasks: 'tasks'
        }),
        project: function ()
        {
            return this.projectFinder(this.id)
        },
        completedTasks: function ()
        {
            return this.tasks(this.id).filter((task) => {
                return task.completed == true
            })
        },
        incompleteTasks: function ()
        {
            return this.tasks(this.id).filter((task) => {
                return task.completed == false
            })
        }
    },
    methods: {
        pendingTaskHandler: function ()
        {
            this.pendingTask = !this.pendingTask
        }
    }
}
</script>
