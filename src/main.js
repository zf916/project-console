import Vue from 'vue'
import qs from 'qs'
import babelPolyfill from 'babel-polyfill'
// import qs from 'qs'
import store from './store'
import { router } from './route'
import { global } from './mixin'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from 'views/App.vue'
import http from './api'

import '@/styles/reset.scss'
import '@/styles/main.scss'
import '@/styles/base.styl'

Vue.mixin(babelPolyfill)
// Vue.use(qs)
Vue.use(store)
Vue.use(http)
Vue.use(ElementUI)
Vue.mixin(global)

new Vue({
    router,
    ...App,
    store,
    qs,
    // qs,
    mounted(){
        function checkIE(){
          return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
        }
        if (checkIE()) {
          window.addEventListener('hashchange', () => {
            var currentPath = window.location.hash.slice(1);
            if (this.$route.path !== currentPath) {
            this.$router.push(currentPath)
          }
        }, false)
        }
    }
}).$mount('#app')