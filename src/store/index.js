import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 是否登录
    isLogin: false,
    // 音乐播放状态
    isPlay: false,
    // 音乐id
    musicId: '',
    // 音乐播放url
    musicUrl: ''
}

const store = new Vuex.Store({
    state,
    mutations: {
        //更新登录状态
        updataLoginState(state) {
            state.isLogin = !state.isLogin;
        },
        // 更新音乐id
        updateMusicId(state, id) {
            state.musicId = id
        }
    }
})

// 挂载实例
export default store