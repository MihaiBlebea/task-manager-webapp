<template>
    <div class="bg-primary h-full">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'background'
}
</script>

<style scoped>
.h-full {
    height: 100vh;
}
</style>
