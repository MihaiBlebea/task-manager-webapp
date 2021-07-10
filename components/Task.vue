<template>
    <div class="card p-0">
        <div class="card-body p-2">
            <div 
                class="d-flex justify-content-between align-items-center" 
                v-show="state === 0" 
                v-on:click="handleClick"
            >
                {{ taskTitle }}
                <font-awesome-icon 
                    icon="angle-down" 
                    v-on:click="handleExpand" 
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

            <div v-if="expanded">

                <div v-on:click="createTaskHandler">
                    <font-awesome-icon icon="calendar-plus"/> Add task...
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {  mapActions } from 'vuex'
export default {
    props: {
        taskId: {
            type: Number,
            required: false
        },
        parentTaskId: {
            type: Number,
            required: false,
            default: null
        },
        taskTitle: {
            type: String,
            required: false,
            default: ''
        },
        subtasks: {
            type: Array,
            required: false,
            default: () => []
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
            title: this.taskTitle,
            expanded: false
        }
    },
    watch: {
        state: function(newState, oldState) {
            console.log(newState, this.state)
            if (newState === 1) {
                this.$nextTick(() => {
                    this.focusInput()
                })
            }
        }
    },
    methods: {
        ...mapActions({
            createNewTask: 'createNewTask'
        }),
        handleClick: function()
        {
            this.clicks++

            if (this.clicks == 2) {
                this.state = 1
            }

            setTimeout(() => {
                this.clicks = 0
            }, 1200)
        },
        handleBlur: async function()
        {
            this.state = 0
            if (this.title === '') {
                this.$emit('cancel')
            } else {
                await this.createTaskHandler()
                this.$emit('cancel')
            }
        },
        focusInput: function()
        {
            this.$refs['input'].focus()
        },
        createTaskHandler: async function()
        {
            let payload = {
                title: this.title
            }

            if (this.parentTaskId !== null) {
                payload.parentTaskId = this.parentTaskId
            }

            await this.createNewTask(payload)
        },
        handleExpand: function ()
        {
            this.expanded = !this.expanded
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
