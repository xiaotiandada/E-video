import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://123.207.60.132:3000',
    timeout: 1000
  })
}
