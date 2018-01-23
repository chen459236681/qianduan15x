// 第三方包
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 无关vue第三方
import 'normalize.css'
import axios from 'axios'

// 路由实例
import router from './router'

// 根组件
import App from './App'

// 接口配置
import api from './js/api-config.js'
// 统一use启动vue插件 
Vue.use(Vuex)
Vue.use(ElementUI)

// 统一添加配置 
// axios.defaults.baseURL = 'http://localhost:8899'
axios.defaults.baseURL = 'http://157.122.54.189:9095'
    // 一配置, 以后所有的请求就会自动使用这个域名
axios.defaults.withCredentials = true

// 统一扩展Vue原型
Vue.prototype.$http = axios
    // 加到原型, 方便组件使用
Vue.prototype.$api = api

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})