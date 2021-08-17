import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 是否登录
    isLogin: false,
}

const store = new Vuex.Store({
    state,
    mutations: {
        //更新登录状态
        updataLoginState(state) {
            state.isLogin = !state.isLogin;
        },
       
    }
})

// 挂载实例
export default store