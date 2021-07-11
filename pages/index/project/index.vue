<template>
    <div class="row pb-3">
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="title">
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="description"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Color</label>
                <input type="color" class="form-control form-control-color clickable" title="Choose your color" v-model="color">
            </div>
            <div class="mb-3">
                <label class="form-label">Icon</label>
                <input type="text" class="form-control" v-model="icon">
            </div>
            <button class="btn btn-primary" v-on:click="submitHandler">Save</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: function() {
        return {
            title: '',
            description: '',
            color: '#563d7c',
            icon: ''
        }
    },
    methods: {
        ...mapActions({
            createNewProject: 'createNewProject'
        }),
        submitHandler: async function()
        {
            await this.createNewProject({
                title: this.title,
                description: this.description,
                color: this.color,
                icon: this.icon
            })
        }
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}

.form-control-color {
    width: 40px;
}
</style>
