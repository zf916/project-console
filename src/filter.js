import config from './config'
import DateFormat from 'dateformat'

export const dateFormat = (value, format = 'yyyy-mm-dd HH:MM:ss') => {
    return DateFormat(value, format)
}

export const dc = (key, DCObjectOrName) => {
    return _.get(_.isObject(DCObjectOrName) ? DCObjectOrName : config.DC[DCObjectOrName], key, key)
}

export const df = (timestamp) => {
    return timestamp ? timestamp.replace(/[A-Z]|\..+/g, ' ').trim() : ''
}

export const currency = (value) => {
    return '￥' + value / 100
}
