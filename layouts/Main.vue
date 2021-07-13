<template>
    <div class="container pt-md-5">
        <div class="row justify-content-center">
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
    name: 'main-center',
    computed: {
        screenSize: function ()
        {
            let  win = window
            let doc = document
            let docElem = doc.documentElement
            let body = doc.getElementsByTagName('body')[0]
            let x = win.innerWidth || docElem.clientWidth || body.clientWidth
            let y = win.innerHeight|| docElem.clientHeight|| body.clientHeight

            return { x, y }
        },
        isMobile: function ()
        {
            return this.screenSize.x < 575
        }
    },
    methods: {
        // screenSize: function ()
        // {
        //     let  win = window
        //     let doc = document
        //     let docElem = doc.documentElement
        //     let body = doc.getElementsByTagName('body')[0]
        //     let x = win.innerWidth || docElem.clientWidth || body.clientWidth
        //     let y = win.innerHeight|| docElem.clientHeight|| body.clientHeight

        //     return { x, y }
        // }
    }
}
</script>
