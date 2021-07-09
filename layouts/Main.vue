<template>
    <div class="w-100 h-full container">
        <div class="row h-full justify-content-center align-items-center flex-3">
            <div class="card col-md-8 p-0">
                <navigation />
                <div class="card-body p-0 px-3">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '/components/Navigation'
export default {
    components: {
        'navigation': Navigation
    },
    name: 'main-center'
}
</script>

<style scoped>
.h-full {
    height: 100vh;
}
</style>