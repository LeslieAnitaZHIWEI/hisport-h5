const getDefaultState = () => {
  return {
    orderId: ""
  };
};

const state = getDefaultState();

const mutations = {
  SET_OrderId: (state, orderId) => {
    console.log(orderId, "orderid");
    localStorage.setItem("hiOrderId", orderId);
    state.orderId = orderId;
  },
  get_OrderId: state => {
    if(localStorage.getItem("hiOrderId")){
      state.orderId = localStorage.getItem("hiOrderId");

    }
  }
};

const actions = {
  // user login
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
