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
                <label class="form-label">Icon2</label>
                <!-- <input type="text" class="form-control" v-model="icon"> -->
                <select class="form-select" aria-label="Default select example" v-model="icon">
                    <option selected>Open this select menu</option>
                    <option value="home"><font-awesome-icon icon="home" /></option>
                    <option value="cog"><font-awesome-icon icon="cog" /></option>
                    <option value="3">Three</option>
                </select>
            </div>
            <button class="btn btn-primary" v-on:click="submitHandler">Update</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    async asyncData({ params }) {
        const id = params.projectId
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
            projects: 'projects'
        })
    },
    methods: {
        ...mapActions({
            updateProject: 'updateProject'
        }),
        submitHandler: async function()
        {
            await this.updateProject({
                id: this.id,
                title: this.title,
                description: this.description,
                color: this.color,
                icon: this.icon
            })
        }
    },
    created: function ()
    {
        let found = this.projects.filter((project) => {
            return project.id === this.id
        })

        if (found.length === 0) {
            return this.$router.push('/home')
        }

        this.title = found[0].title
        this.description = found[0].description
        this.color = found[0].color
        this.icon = found[0].icon
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>