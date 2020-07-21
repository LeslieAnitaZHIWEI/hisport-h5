
const getDefaultState = () => {
  return {
    radio:'课程'
  }
}

const state = getDefaultState()

const mutations = {
    SET_Radio: (state, radio) => {
        state.radio = radio
      },
}

const actions = {
  // user login
  
  
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

