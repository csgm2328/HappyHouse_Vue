import Vue from 'vue';
import Vuex from 'vuex';
import userHttp from '@/util/http-common'
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
  },
  getters : {
    isLogin(state){
        return state.isLogin;
    }
  },
  mutations: {
    setLogin(state, payload) {
      state.userInfo = payload;
      if (state.userinfo)
        state.isLogin = true;
      else
        state.isLogin = false;
      console.log(payload);
    }
  },
  actions : {
    doLogin(context) {
      console.log(context)
        userHttp
          .post('/login', {
              
            })
          .then(({ data }) => {
            context.commit('setLogin', data)
            console.log(data)
            })
        .catch((error) => {
          console.dir(error)
            })
    }
  },
//   plugins: [createPersistedState()],
});
