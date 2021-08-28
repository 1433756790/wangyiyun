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
      { path: 'singerDetails/:id', component: SingerDetails, name: 'SingerDetails' }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
