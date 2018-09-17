import Api from './Api'

export default {
  getReleased (city, start, count) {
    return Api().get(`in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${city}&start=${start}&count=${count}&client=&udid=`)
  }
}
