import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            token: null,
            userId: null
        },
        mutations: {
            register(state, { token, id }) 
            {
                state.token = token
                state.id = id
            },
            login(state, { token, id }) 
            {
                state.token = token
                state.id = id
            }
        },
        actions: {
            register: async function ({ commit }, { username: username, email: email, password: password }) 
            {
                try {
                    let result = await this.$api.post('/user/register', {
                        username: username, 
                        email: email, 
                        password: password
                    })

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    commit('register', { 
                        token: result.data.token, 
                        id: result.data.id 
                    })
                    
                    this.$router.push('/')
                } catch(e) {
                    console.error(e)
                    commit('register', { 
                        token: null, 
                        id: null
                    })
                }
            },
            login: async function ({ commit }, { email: email, password: password }) 
            {
                try {
                    let result = await this.$api.post('/user/login', {
                        email: email, 
                        password: password
                    })

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    commit('login', { 
                        token: result.data.token, 
                        id: result.data.id 
                    })
                    
                    this.$router.push('/')
                } catch(e) {
                    console.error(e)
                    commit('login', { 
                        token: null, 
                        id: null
                    })
                }
            }
        },
        getters: {
            token: function(state)
            {
                return state.token
            }
        }
    })
}

export default createStore