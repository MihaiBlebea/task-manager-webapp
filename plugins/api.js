export default function ({ $axios }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, */*'
            }
        }
    })

    // Set baseURL to something different
    api.setBaseURL('http://localhost:8087/api/v1')

    // Inject to context as $api
    inject('api', api)
}