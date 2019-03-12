import DateFormat from 'dateformat'

const dateFormat = (value, format = 'yyyy-mm-dd HH:MM:ss') => {
  return DateFormat(+value, format)
}
const toFixed = (value) => {
  return Number(value).toFixed(2)
}
export default { dateFormat, toFixed }
