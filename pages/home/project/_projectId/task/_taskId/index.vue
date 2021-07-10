<template>
    <h2>For updating a task {{ projectId }} / {{ taskId }}</h2>
</template>

<script>
export default {
    async asyncData({ params }) {
        const projectId = parseInt(params.projectId)
        const taskId = parseInt(params.taskId)
        return { projectId, taskId }
    }
}
</script>