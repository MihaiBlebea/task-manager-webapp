<template>
    <div class="w-100 h-full container">
        <div class="row h-full justify-content-center align-items-center flex-3">
            <div class="card col-md-6">
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.h-full {
    height: 100vh;
}
</style>