<template>
    <div>
        <h2>
            <font-awesome-icon 
                icon="angle-left" 
                class="clickable" 
                v-on:click="$router.push('/project/' + projectId)" 
            />
            {{ task.title }}
        </h2>

        <p>{{ task.note }}</p>
        <p>Priority {{ task.priority }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    async asyncData({ params }) {
        const projectId = parseInt(params.projectId)
        const taskId = parseInt(params.taskId)
        return { projectId, taskId }
    },
    data: function ()
    {
        return {

        }
    },
    computed: {
        ...mapGetters({
            taskFinder: 'task'
        }),
        task: function()
        {
            return this.taskFinder(this.projectId, this.taskId)
        }
    }
}
</script>