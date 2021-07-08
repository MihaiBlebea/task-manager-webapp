export default function ({ $axios, $config, store }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, */*',
                Authorization: 'Bearer ' + store.getters.token
            }
        }
    })

    // Set baseURL to something different
    api.setBaseURL($config.baseApiUrl)

    // Inject to context as $api
    inject('api', api)
}