export default function ({ $axios }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, */*'
            }
        }
    })

    // Set baseURL to something different
    api.setBaseURL(process.env.BASE_API_URL)

    // Inject to context as $api
    inject('api', api)
}