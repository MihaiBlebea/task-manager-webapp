<template>
    <div class="card p-0">
        <div class="card-body p-2">
            <div 
                class="d-flex justify-content-between align-items-center" 
                v-show="state === 0"
            >
                <div 
                    class="clickable" 
                    v-show="state === 0" 
                    v-on:click="handleClick"
                >
                    {{ title }}
                </div>
                <font-awesome-icon 
                    icon="backspace" 
                    class="clickable" 
                    v-show="state === 0" 
                    v-on:click="removeTaskHandler" 
                />
            </div>
            <div v-show="state === 1">
                <input 
                    type="text" 
                    class="form-control" 
                    v-model="title" 
                    v-on:blur="handleBlur"
                    ref="input"
                >
            </div>
        </div>
    </div>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'
export default {
    name: 'task',
    props: {
        data: {
            type: Object,
            required: false,
            default: null
        },
        initState: {
            type: Number,
            required: false,
            default: 0
        }
    },
    data: function()
    {
        return {
            state: 0,
            clicks: 0,
            title: this.data ? this.data.title : ''
        }
    },
    watch: {
        state: function(newState, oldState) 
        {
            if (newState === 1) {
                this.$nextTick(() => {
                    this.focusInput()
                })
            }
        },
    },
    computed: {
        ...mapGetters({
            project: 'selectedProject'
        }),
        isUpdate: function ()
        {
            return this.data !== null
        }
    },
    methods: {
        ...mapActions({
            createNewTask: 'createNewTask',
            removeTask: 'removeTask'
        }),
        handleClick: function()
        {
            this.clicks++

            if (this.clicks === 2) {
                this.state = 1
            } 

            setTimeout(() => {
                if (this.clicks === 1) {
                    this.navigateToTask()
                }
                this.clicks = 0
            }, 1000)
        },
        handleBlur: async function()
        {
            this.state = 0
            if (this.title !== '') {
                await this.updateTaskHandler()
            }

            this.$emit('cancel')
        },
        focusInput: function()
        {
            this.$refs['input'].focus()
        },
        updateTaskHandler: async function ()
        {
            // This is not an update, but a creation of a task
            if (this.isUpdate === false) {
                return await this.createTaskHandler()
            }
        },
        createTaskHandler: async function ()
        {
            let payload = {
                title: this.title
            }

            if (this.data !== null) {
                payload.parentTaskId = this.data.subtask_id
            }

            await this.createNewTask(payload)
        },
        removeTaskHandler: async function ()
        {
            await this.removeTask(this.data.id)
        },
        navigateToTask: function ()
        {
            if (this.data === null) {
                return
            }

            this.$router.push('/project/' + this.data.project_id + '/task/' + this.data.id)
        }
    },
    mounted: function()
    {
        if (this.initState !== 0) {
            this.state = this.initState
        }
    }
}
</script>
