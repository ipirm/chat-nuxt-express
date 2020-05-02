export const state = () => ({
    usersApi: []
})

export const mutations = {
    SET_USER(state, payload) {
        state.usersApi = payload
    },

}
export const actions = {
    async getUsers({commit}) {
        const data = await this.$axios.$get('users')
        commit('SET_USER', data.users);
    },
    async chacngeOnline({commit},body) {
        const data = await this.$axios.$post(`when?id=${body.id}&when=${body.text}`)
    }
}
