<template>
    <div>
        <h2>
            <font-awesome-icon 
                icon="angle-left" 
                class="clickable" 
                v-on:click="$router.push('/')" 
            />
            {{ project.title }}
        </h2>
        <p>{{ project.description }}</p>

        <div class="mb-2" v-for="(task, index) in project.tasks" :key="index">
            <task :data="task" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Task from '~/components/Task.vue'
export default {
    async asyncData({ params }) {
        const id = params.projectId
        return { id: parseInt(id) }
    },
    components: {
        Task
    },
    computed: {
        ...mapGetters({
            projects: 'projects',
            projectFinder: 'project'
        }),
        project: function ()
        {
            return this.projectFinder(this.id)
        }
    },
    methods: {

    }
}
</script>
