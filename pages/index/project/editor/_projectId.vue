<template>
    <div class="row pb-3">
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title">
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea 
                    class="form-control" 
                    rows="3" 
                    v-model="description"
                ></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Color</label>
                <input 
                    type="color" 
                    class="form-control form-control-color clickable" 
                    title="Choose your color" 
                    v-model="color"
                >
            </div>
            <div class="mb-3">
                <label class="form-label">Icon</label>
                <!-- <input type="text" class="form-control" v-model="icon"> -->
                <select class="form-select" aria-label="Default select example" v-model="icon">
                    <option selected>Open this select menu</option>
                    <option value="home"><font-awesome-icon icon="home" /></option>
                    <option value="cog"><font-awesome-icon icon="cog" /></option>
                    <option value="3">Three</option>
                </select>
            </div>
            <button class="btn btn-primary" v-on:click="submitHandler">{{ submitButtonLabel }}</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    async asyncData({ params }) {
        const id = params.projectId
        if (id === undefined) {
            return { id: null }
        }
        
        return { id: parseInt(id) }
    },
    data: function() {
        return {
            title: '',
            description: '',
            color: '',
            icon: 'home'
        }
    },
    computed: {
        ...mapGetters({
            projects: 'projects',
            projectFinder: 'project'
        }),
        project: function ()
        {
            if (this.isUpdate === false) {
                return null
            }

            return this.projectFinder(this.id)
        },
        isUpdate: function ()
        {
            return this.id !== null
        },
        submitButtonLabel: function ()
        {
            return this.isUpdate ? 'Update' : 'Create'
        }
    },
    methods: {
        ...mapActions({
            updateProject: 'updateProject',
            createProject: 'createProject'
        }),
        submitHandler: async function()
        {
            if (this.isUpdate) {
                return await this.updateProject({
                    id: this.id,
                    title: this.title,
                    description: this.description,
                    color: this.color,
                    icon: this.icon
                })
            }

            return await this.createProject({
                title: this.title,
                description: this.description,
                color: this.color,
                icon: this.icon
            })
        }
    },
    created: function ()
    {
        if (this.project === null) {
            return
        }

        this.title = this.project.title
        this.description = this.project.description
        this.color = this.project.color
        this.icon = this.project.icon
    }
}
</script>