import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Discover from '../components/discover/Discover'
import Recommend from '../components/discover/discoverChildren/Recommend'
import Singer from '../components/discover/discoverChildren/Singer'
import Ranking from '../components/discover/discoverChildren/Ranking'
import MusicList from '../components/discover/discoverChildren/MusicList'
import MusicDetails from '../components/discover/MusicDetails'
import SingerDetails from '../components/singerDetails/SingerDetails'
const Video = () => import('../components/video/Video.vue')
const VideoList = () => import('../components/video/VideoList.vue')
const MVList = () => import('../components/video/MVList.vue')
const VideoDetails = () => import('../components/video/VideoDetails.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        name: 'Discover',
        component: Discover,
        redirect: '/discover/recommend',
        children: [
          { path: '/discover/recommend', component: Recommend },
          { path: '/discover/singer', component: Singer },
          { path: '/discover/musciclist/:offest(.?)', component: MusicList, name: 'MusicList' },
          { path: '/discover/ranking', component: Ranking },
        ]
      },
      { path: '/musicDetails/:id', component: MusicDetails, name: 'musicDetails' },
      { path: '/singerDetails/:id', component: SingerDetails, name: 'SingerDetails' },
      {
        path: '/video',
        component: Video,
        name: 'Video',
        redirect: '/video/videoList',
        children: [
          { path: '/video/videoList', component: VideoList },
          { path: '/video/mvList', component: MVList },

        ]
      },
      { path: '/videoDetails/:id/:type', component: VideoDetails, name: 'VideoDetails' },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
