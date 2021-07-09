<template>
    <background>
        <main-pannel>
            <div class="row">
                <div class="col-md-4 bg-danger p-2">
                    <div class="clickable" 
                        v-for="(project, index) in projects" 
                        :key="index" 
                        v-on:click="selectProject(index)"
                    >
                        {{ project.title }}
                    </div>
                </div>
                <div class="col-md-8 p-2">
                    <div v-for="(task, index) in tasks" :key="index">
                        {{ task.title }}
                    </div>
                </div>
            </div>
        </main-pannel>
    </background>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Main from '/layouts/Main.vue'
import Background from '/layouts/Background.vue'
export default {
    components: {
        'background': Background,
        'main-pannel': Main
    },
    data: function() {
        return {

        }
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
            selectProject: 'selectProject'
        }),
    },
    mounted: async function() {
        await this.getProjects()
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
