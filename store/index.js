import Vuex from 'vuex'

const parseJwt = (token) => {
    if (token === null) {
        return null
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}

const getUserIdFromToken = (token) => {
    if (token === null) {
        return null
    }
    return parseJwt(localStorage.getItem('user-token'))['user_id']
}

const createStore = () => {
    return new Vuex.Store({
        state: {
            token: localStorage.getItem('user-token') || null,
            userId: getUserIdFromToken(localStorage.getItem('user-token')) || null,
            projects: [],
            selectedProject: 0,
            tasks: []
        },
        mutations: {
            register(state, { token, id }) 
            {
                state.token = token
                state.id = id
                if (token === null || token === '') {
                    localStorage.removeItem('user-token')
                } else {
                    localStorage.setItem('user-token', token)
                }
            },
            login(state, { token, id }) 
            {
                state.token = token
                state.id = id
                if (token === null || token === '') {
                    localStorage.removeItem('user-token')
                } else {
                    localStorage.setItem('user-token', token)
                }
            },
            storeProjects(state, projects) 
            {
                state.projects = projects
            },
            storeTasks(state, tasks) 
            {
                state.tasks = tasks
            },
            storeProjectIndex(state, index)
            {
                state.selectedProject = index
            }
        },
        actions: {
            nuxtClientInit: async function({ dispatch }) 
            {
                await dispatch('getProjects')
            },
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
            login: async function ({ commit, dispatch }, { email: email, password: password }) 
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
                    
                    await dispatch('getProjects')
                    this.$router.push('/')
                } catch(e) {
                    console.error(e)
                    commit('login', { 
                        token: null, 
                        id: null
                    })
                }
            },
            logout: function({ commit })
            {
                commit('login', { 
                    token: null, 
                    id: null
                })
                this.$router.push('/login')
            },
            getProjects: async function ({ commit, state }) 
            {
                try {
                    if (state.userId === null) {
                        throw Error('User is not logged in')
                    }

                    let result = await this.$api.get('/projects/user/' + state.userId)

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    commit('storeProjects', result.data.data)
                } catch(e) {
                    console.error(e)
                    commit('storeProjects', [])
                }
            },
            createNewProject: async function ({ dispatch }, { title, description, color, icon }) 
            {
                try {
                    let result = await this.$api.post('/project', { title, description, color, icon })

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    dispatch('getProjects')
                    this.$router.push('/home')
                } catch(e) {
                    console.error(e)
                }
            },
            updateProject: async function ({ commit }, { id, title, description, color, icon }) 
            {
                try {
                    let result = await this.$api.put('/project/' + id, { title, description, color, icon })

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    this.$router.push('/home')
                } catch(e) {
                    console.error(e)
                }
            },
            removeProject: async function ({ dispatch }, { id })
            {
                try {
                    let result = await this.$api.delete('/project/' + id)

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    dispatch('getProjects')
                } catch(e) {
                    console.error(e)
                }
            },
            getProjectTasks: async function ({ commit, getters }) 
            {
                try {
                    let project = getters.selectedProject
                    let result = await this.$api.get('/project/' + project.id)

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    commit('storeTasks', result.data.data.tasks)
                } catch(e) {
                    console.error(e)
                    commit('storeTasks', [])
                }
            },
            selectProject: function ({ commit, dispatch, state }, index)
            {
                commit('storeProjectIndex', index)
                dispatch('getProjectTasks')
            },
            createNewTask: async function({ dispatch, getters }, { parentTaskId, title })
            {
                try {
                    let project = getters.selectedProject
                    let result = await this.$api.post('/task', {
                        project_id: project.id,
                        subtask_id: parentTaskId,
                        title: title
                    })

                    if (result.status !== 200) {
                        throw Error(reuslt.data.message)
                    }

                    dispatch('getProjectTasks')
                } catch(e) {
                    console.error(e)
                }
            }
        },
        getters: {
            token: function(state)
            {
                return state.token
            },
            userId: function(state)
            {
                return state.userId
            },
            projects: function(state)
            {
                return state.projects
            },
            selectedProject: function(state)
            {
                return state.projects[state.selectedProject]
            },
            tasks: function(state)
            {
                return state.tasks
            }
        }
    })
}

export default createStore