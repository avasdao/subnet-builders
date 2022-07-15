import Vue from 'vue'

// import Vuex, { createStore } from 'vuex'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        profile: null,
    },
    getters: {
        isAdmin(_state) {
            if (
                _state.email === 'support@modenero.com'
                || _state.email === 'info@avasdao.org'
            ) {
                return true
            }

            return false
        },

    },
    actions: {
        // async logout({ commit }) {
        //     /* Clear email. */
        //     commit('saveEmail', null)
        //
        //     /* Reload profile. */
        //     await router.go(0) // NOTE: Assumed to be on profile screen.
        // },
    },
    mutations: {
        saveAddress(_state, _address) {
            _state.address = _address
        },

        saveEmail(_state, _email) {
            _state.email = _email
        },
        saveProfile(_state, _profile) {
            _state.profile = _profile
        },
    },
    modules: {
        //
    },
    plugins: [
        createPersistedState(),
    ],
})
