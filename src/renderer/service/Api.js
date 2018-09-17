import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://api.douban.com/v2/movie',
    headers: {'Access-Control-Allow-Origin': '*'}
  })
}
