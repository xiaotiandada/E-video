import axios from 'axios'

const cancelToken = () => axios.CancelToken.source()

export default cancelToken
