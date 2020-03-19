import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios
    //1.创建全局过滤器
Vue.filter('setWH', function(url, arg) {
        return url.replace(/w\.h/, arg)
    })
    //2.引入全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')