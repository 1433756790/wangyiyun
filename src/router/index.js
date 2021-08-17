import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Discover from '../components/discover/Discover'
import Recommend from '../components/discover/discoverChildren/Recommend'
import Singer from '../components/discover/discoverChildren/Singer'
import Ranking from '../components/discover/discoverChildren/Ranking'
import MusicList from '../components/discover/discoverChildren/MusicList'


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
          { path: '/discover/musciclist', component: MusicList },
          { path: '/discover/ranking', component: Ranking },

        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
