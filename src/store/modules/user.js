import { login,loginWx, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { getIsEligibility } from "@/api/FormalLessonOrderController";
import { getIsInfoFinish, getRegister,getOpenId } from "@/api/user";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    userId: "",
    sex: 0,
    weight: 45,
    height: 160,
    role: "",
    phone: "",
    isEligibility: "",
    isInfoFinish: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_SEX: (state, sex) => {
    state.sex = sex;
  },
  SET_WEIGHT: (state, weight) => {
    state.weight = weight;
  },
  SET_HEIGHT: (state, height) => {
    state.height = height;
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },
  SET_IsEligibility: (state, isEligibility) => {
    state.isEligibility = isEligibility;
  },
  SET_IsInfoFinish: (state, isInfoFinish) => {
    state.isInfoFinish = isInfoFinish;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, code } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        mobile: "SMS@" + mobile.trim(),
        code: code,
        grant_type: "mobile"
      })
        .then(response => {
          if (response.user_info.authorities[0].authority != "ROLE_4") {
            reject({ data: { msg: "登录失败" } });
          } else {
            commit("SET_TOKEN", response.access_token || "");
            var inFifteenMinutes = 0.5
            console.log(inFifteenMinutes,'inFifteenMinutes')
            setToken(
              response.access_token,
              response.refresh_token,
              inFifteenMinutes
            );
            resolve();
          }
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  loginWx({ commit }, openid) {
    return new Promise((resolve, reject) => {
      loginWx({
        openid,
        grant_type: "wxmp_openid"
      })
        .then(response => {
          if (response.user_info.authorities[0].authority != "ROLE_4") {
            reject({ data: { msg: "登录失败" } });
          } else {
            commit("SET_TOKEN", response.access_token || "");
            var inFifteenMinutes = 0.5
            console.log(inFifteenMinutes,'inFifteenMinutes')
            setToken(
              response.access_token,
              response.refresh_token,
              inFifteenMinutes
            );
            resolve();
          }
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { username, avatar, id, authorities, phone } = data;

          commit("SET_NAME", username);
          commit("SET_AVATAR", avatar);
          commit("SET_USERID", id);
          commit("SET_PHONE", phone);
          commit("SET_ROLE", authorities[0].authority);

          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //get Eligibility
  getEligibility({ commit, state }) {
    return new Promise((resolve, reject) => {
      getIsEligibility().then(res => {
        const { code, data } = res;

        if (code === 0) {
          commit("SET_IsEligibility", data === 1);
        }
        resolve(data);
      });
    });
  },
  /** 信息是否完善 */
  checkisFinished({ commit, state }, products = {}) {
    return new Promise((resolve, reject) => {
      const { isInfoFinish } = state;

      const { force = false } = products;
      console.log('cccccc')

      // 如果没有值
      if (force || isInfoFinish === "") {
        getIsInfoFinish()
          .then(res => {
            const { code, data } = res;

            //1是已完善信息了
            if (code === 0) {
              commit("SET_IsInfoFinish", data === 1);
              resolve(data === 1);
            } else {
              reject(res);
            }
          })
          .catch(error => {
            console.log(error,'error')
            reject(error);
          });
      } else {
        resolve(isInfoFinish);
      }
    });
  },
  /** 是否注册 */
  checkisRegister({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      console.log(info,'iiiiiiiiiii')
      const {code,state}=info
      console.log(code,'codecode')
      getRegister({
        code,
        state
      }).then(res => {
        const { code, data } = res;
        if(code==0){
          resolve(data);

        }else{
          reject('error')
        }
      }).catch(error=>{
        reject(error)
      })
    });
  },
  /** 获取info_openId */
  getOpenId({ commit, state }, code) {
    return new Promise((resolve, reject) => {
      getOpenId({
        code
      }).then(res => {
        const { code, data } = res;

        resolve(data);
      });
    });
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
