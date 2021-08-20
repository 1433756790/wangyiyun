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
    musicUrl: '',
    // 播放总时长
    allPlayTime: 0
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
        },
        // 更新音乐播放状态
        updatePlayState(state) {
            state.isPlay = !state.isPlay
        },
        updateAllPlayTime(state, dt) {
            state.allPlayTime = dt
        }
    }
})

// 挂载实例
export default store