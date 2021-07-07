export default function ({ $axios, $config }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, */*'
            }
        }
    })

    // Set baseURL to something different
    api.setBaseURL($config.baseApiUrl)

    // Inject to context as $api
    inject('api', api)
}