import Cookies from "js-cookie";
import { refreshToken } from "@/api/user";
const TokenKey = "Hi_Token";
const TokenKeyR = "Hi_Token_Refrsh";
import store from "@/store";

export function getToken() {
  return Cookies.get(TokenKey) || "";
}

export async function getAsyncToken() {
  return new Promise(function(resolve, reject) {
    if (Cookies.get(TokenKey)) {
      resolve(Cookies.get(TokenKey) || "");
    } else {
      if (Cookies.get(TokenKeyR)) {
        refreshToken(Cookies.get(TokenKeyR))
          .then(res => {
            console.log(res);
            var inFifteenMinutes = 1
            Cookies.set(TokenKeyR, res.refresh_token);
            Cookies.set(TokenKey, res.access_token, {
              expires: inFifteenMinutes
            });
            store.commit("user/SET_TOKEN", res.access_token);
            resolve(res.access_token);
          })
          .catch(res => {
            resolve(Cookies.get(TokenKey) || "");
          });
      } else {
        console.log(store.getters.token,'store.getters.token')
        resolve(store.getters.token);
      }

      // return (Cookies.get(TokenKeyR))
    }
  });
}

export function setToken(token, refreshT, inFifteenMinutes) {
  Cookies.set(TokenKeyR, refreshT);
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes });
}

export function removeToken() {
   Cookies.remove(TokenKeyR);
  return Cookies.remove(TokenKey);
}
