import Api from './Api'

export default {
  /**
   * 默认30条数据，可以自定义
   * @param limit
   * @returns {*}
   */
  getTopMv (limit = 30, offset = 0) {
    // return Api().get(`/mv/first?limit=${limit}`)
    return Api().get(`/top/mv?limit=${limit}&offset=${offset}`)
  },
  getMvId (id) {
    return Api().get(`/mv?mvid=${id}`)
  }
}
