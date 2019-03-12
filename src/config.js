export const isDev = true && /^(192|0|127|localhost)/.test(location.hostname)
// export const baseURL = 'https://yytjapi.hdysystems.com/'
export const baseURL = "http://10.2.141.115:8099/cliapi"  //zc
// export const baseURL = 'http://10.2.98.42:8099/cliapi' // zy

export const DC = {
    BOOL: {
        '0': '否',
        '1': '是'
    }
}

export default {
    isDev,
    baseURL,
    DC
}
