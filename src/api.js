import { Message } from 'element-ui'
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.baseURL
axios.defaults.timeout = 10000

const toType = (obj) => { return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase(); }

const filterNull = (o) => { if (toType(o) !== 'object' || o.nofilter) return o; for (var key in o) { if (o[key] === null) { delete o[key] }; if (toType(o[key]) === 'string') { o[key] = o[key].trim(); if (o[key].length === 0) { delete o[key] } }; }; return o; }

let http = {}

http.base = (type, path, params, headers, callback) => {
    let token = localStorage.getItem('token') || '';
    let config = { headers: Object.assign({}, headers, { "Token": token }), url: path, method: type, };
    if(type != 'get') {
      config['data'] = params
    }else{
      params = filterNull(params) || {}
      config['params'] = params;
    }
    return axios(config)
        .then(({ data }) => {
            callback && callback(data) 
            return new Promise((resolve, reject) => {
                data.success  ? resolve(data.data) : (Message.error(data.msg || '服务异常，请稍后再试'), reject(data || { code: -1, msg: '网络服务异常，请稍后重试' }))
            })
        })
    // .catch(() => {console.log('时间:' + new Date() + ',接口异常: 错误代码,接口地址:' + path); Message.error('服务异常，请稍后再试')  })
}

http.install = (Vue) => { ['get', 'post','put','delete'].forEach(h => Vue.prototype['$' + h] = (url, params, headers, callback) => http.base(h, url, params, headers, callback)) };
export default http;
