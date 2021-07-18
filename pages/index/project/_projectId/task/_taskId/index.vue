<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>
                <font-awesome-icon 
                    icon="angle-left" 
                    class="clickable" 
                    v-on:click="$router.push('/project/' + projectId)" 
                />
                {{ task.title }} task
            </h2>
            <div class="clickable" v-on:click="handleEditToggle">Edit</div>
        </div>

        <div v-if="edit === false">
            <p>{{ task.note }}</p>
            <p>Priority {{ task.priority }}</p>
        </div>
        <div v-if="edit === true">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title">
            </div>
            <div class="mb-3">
                <label class="form-label">Note</label>
                <textarea 
                    class="form-control" 
                    rows="3" 
                    v-model="note"
                ></textarea>
            </div>
            <button class="btn btn-primary" v-on:click="submitHandler">Update</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    async asyncData({ params }) {
        const projectId = parseInt(params.projectId)
        const taskId = parseInt(params.taskId)
        return { projectId, taskId }
    },
    data: function ()
    {
        return {
            edit: false,
            title: '',
            note: ''
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
    },
    methods: {
        ...mapActions({
            updateTask: 'updateTask'
        }),
        handleEditToggle: function ()
        {
            this.edit = !this.edit

            this.title = this.task.title
            this.note = this.task.note
        },
        submitHandler: async function ()
        {
            await this.updateTask({ 
                taskId: this.taskId ,
                title: this.title,
                note: this.note
            })

            this.handleEditToggle()
        }
    }
}
</script>