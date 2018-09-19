import Api from './Api'

export default {
  /**
   * 默认30条数据，可以自定义
   * @param limit
   * @returns {*}
   */
  getReleased (limit = 30) {
    return Api().get(`/mv/first?limit=${limit}`)
  }
}
