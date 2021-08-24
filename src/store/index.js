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
    allPlayTime: 0,
    // 正在播放的歌单
    musicDetailsList: {},
    // 正在播放歌曲的信息
    playMusicMessage: {},
    // 播放音乐的索引
    playIndex: -1
}

const store = new Vuex.Store({
    state,
    mutations: {
        //更新登录状态
        updataLoginState(state) {
            state.isLogin = !state.isLogin;
        },
        // 更新音乐id和信息
        updateMusicId(state, row) {
            state.musicId = row.id
            state.playMusicMessage = row
            // console.log(row.id)
            // console.log(state.playMusicMessage)
        },
        // 更新音乐播放状态
        updatePlayState(state) {
            state.isPlay = !state.isPlay
        },
        // 更新音乐播放总长
        updateAllPlayTime(state, dt) {
            state.allPlayTime = dt
        },
        // 更新歌单
        updateMusicList(state, musicDetailsList) {
            state.musicDetailsList = musicDetailsList
            // console.log(state.musicDetailsList)
        },
        // 更新歌单索引
        updateMusicIndex(state, index) {
            state.playIndex = index
            // console.log(index)
        }
    }
})

// 挂载实例
export default store