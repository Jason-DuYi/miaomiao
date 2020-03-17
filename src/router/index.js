import Vue from 'vue'
import VueRouter from 'vue-router'
import Mine from '@/views/mine'
import Movies from '@/views/movies'
import Cinema from '@/views/cinema.vue'

import NowPlaying from '../components/NowPlaying'
import City from '../components/City'
import CommingSoon from '../components/ComingSoon'
import Search from '../components/Search'

Vue.use(VueRouter)

const routes = [{
        path: '/mine',
        name: 'mine',
        component: Mine
    },
    {
        path: '/cinema',
        name: 'cinema',
        component: Cinema
    },
    {
        path: '/movies',
        name: 'movies',
        component: Movies,
        children: [{
                path: 'nowplaying',
                component: NowPlaying
            },
            {
                path: 'city',
                component: City
            },
            {
                path: 'commingsoon',
                component: CommingSoon
            },
            {
                path: 'search',
                component: Search
            }, {
                path: '/*',
                redirect: "/movies/nowplaying"
            }
        ]
    },

    {
        path: '/*',
        redirect: '/movies'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router