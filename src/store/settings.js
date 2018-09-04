const settings = {
  namespaced: true,
  state: {
    access_token: undefined
  },
  getters: {
    isAuthenticated: state => state.access_token
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.access_token = accessToken
    }
  }
}

export default settings
