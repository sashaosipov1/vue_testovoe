export default {

    actions: {
        async fetchUsers(state, obj) {
            if (!obj.searchParam || obj.page < 1) {
                return
            }
            
            let users = '';
            
            const req = await fetch('https://api.github.com/search/users?q=' + obj.searchParam + '&per_page=21&sort=' +
                obj.sort + '&order=' + obj.order + '&page=' + obj.page, {
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            });
            
            users = await req.json();
            
            state.commit('updateUsers', users.items);
        },
        
        async fetchUserById(state, obj) {
            if (!obj) {
                return
            }
            
            let user = '';
            
            const req = await fetch('https://api.github.com/users/' + obj.login, {
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            });
            
            user = await req.json();
            
            state.commit('updateUserById', user);
        },

        saveSearchInput(state, obj) {
            state.commit('updateSearchInput', obj.searchParam)
        },

        saveSort(state, obj) {
            state.commit('updateSort', obj.sort)
        },

        saveOrder(state, obj) {
            state.commit('updateOrder', obj.order)
        }
    },

    mutations: {
        updateUsers(state, users) {
            state.users = users;
        },
        
        updateUserById(state, user) {
            state.user = user;
        },

        updateSearchInput(state, search) {
            state.search = search;
        },

        updateSort(state, sort) {
            state.sort = sort;
        },

        updateOrder(state, order) {
            state.order = order;
        }
    },

    state: {
        users: [],
        user: {},
        search: "",
        sort: "followers",
        order: "desc"
    },

    getters: {
        getAllUsers(state) {
            return state.users;
        },
        
        getUserById(state) {
            return state.user;
        },

        getSearchInput(state) {
            return state.search;
        },

        getSort(state) {
            return state.sort;
        },

        getOrder(state) {
            return state.order;
        }
    },
}