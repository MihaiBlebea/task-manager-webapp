<template>
    <background>
        <main-pannel>
            <NuxtChild  />
        </main-pannel>
    </background>
</template>

<script>
import Main from '/layouts/Main.vue'
import Background from '/layouts/Background.vue'
export default {
    components: {
        'background': Background,
        'main-pannel': Main
    }
}
</script>

