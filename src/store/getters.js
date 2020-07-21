const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId:state => state.user.userId,
  radio:state => state.common.radio,
  orderId:state => state.order.orderId,
  role:state => state.user.role,
  phone:state => state.user.phone,
  isEligibility:state => state.user.isEligibility,
  
}
export default getters
