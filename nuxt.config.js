export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'task-manager-webapp',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/static/global.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        'plugins/axios',
        'plugins/api'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/fontawesome',
        '@nuxtjs/svg'
    ],
    
    fontawesome: {
        icons: {
            solid: [
                'faCog', 
                'faHome', 
                'faCalendarPlus', 
                'faAdjust', 
                'faCalendarTimes', 
                'faDoorClosed', 
                'faAngleLeft', 
                'faAngleDown', 
                'faBackspace',
                'faCheckCircle'
            ]
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://www.npmjs.com/package/nuxt-client-init-module
        'nuxt-client-init-module'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    publicRuntimeConfig: {
        baseApiUrl: process.env.BASE_API_URL || 'https://task-manager-api.cap-rover.purpletreetech.com/api/v1'
    },

    router: {
        middleware: ['authMiddleware'],
        extendRoutes (routes, resolve) {
            routes.push(
                {
                    name: 'project-new',
                    path: '/project/editor',
                    component: '~/pages/index/project/editor/_projectId.vue'
                }
            )
        }
    }
}
