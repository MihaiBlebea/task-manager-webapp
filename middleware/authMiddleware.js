
export default function({ route, store, app, redirect }) {
    console.log('token', store.getters.token)

    if (route.path === '/login' || route.path === '/register') {
        return 
    }
    if (store.getters.token === null) {
        redirect(301, '/login')
    }
}