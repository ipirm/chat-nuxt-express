const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
routerBase = {
    router: {
        base: '/'
    }
},
    module.exports = {
        mode: 'universal',

        /*
         ** Headers of the page
         */
        head: {
            title: pkg.name,
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {hid: 'description', name: 'description', content: pkg.description}
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {
                    rel: 'stylesheet',
                    href:
                        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
                }
            ]
        },

        /*
         ** Customize the progress-bar color
         */
        loading: {color: '#fff'},

        /*
         ** Global CSS
         */
        css: ['~/assets/style/app.styl'],

        /*
         ** Plugins to load before mounting the App
         */
        plugins: [
            '@/plugins/vuetify',
            {src: '@/plugins/socket', ssr: false},
            {src: '~plugins/mixins/user', ssr: true},
        ],

        /*
         ** Nuxt.js modules
         */
        modules: ['@nuxtjs/pwa', '@nuxtjs/axios', '@nuxtjs/auth','@nuxtjs/toast'],

        /*
         ** Build configuration
         */
        axios: {
            // baseURL: 'http://chat-gov.com/api/'
            baseURL: 'http://puny2.continent.az/api/'
        },
        auth: {
            redirect: false,
            strategies: {
                local: {
                    endpoints: {
                        login: {url: 'login', method: 'post', propertyName: 'access_token'},
                        user: {url: 'user', method: 'get', propertyName: ''},
                        logout: {url: 'logout', method: 'post'}
                    }
                }
            },
        },
        build: {
            transpile: ['vuetify/lib'],
            plugins: [new VuetifyLoaderPlugin()],
            loaders: {
                stylus: {
                    import: ['~assets/style/variables.styl']
                }
            },
            /*
             ** You can extend webpack config here
             */
            extend(config, ctx) {
            }
        }
    }
