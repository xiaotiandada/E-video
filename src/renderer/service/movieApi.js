import Api from './Api'

export default {
  getTopMv (params) {
    return Api().get('/top/mv', {
      params
    })
  },
  getMvId (id) {
    return Api().get(`/mv?mvid=${id}`)
  },
  getMvComments (id) {
    return Api().get(`/comment/mv?id=${id}`)
  }
}
