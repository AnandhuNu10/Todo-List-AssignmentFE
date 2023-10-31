import axios from 'axios'
import store from '../store'
// const apiEndpoint= process.env.API_HOST
const apiEndpoint = 'http://localhost:3003/'
// 52.0.94.187 - Old

const API = (
  method: string,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any = {}
) => {
  const state = store.getState()
  const token = state.loginDetailsReducer.token

  headers = headers.length
    ? headers
    : {
        Authorization: 'Bearer ' + token?.authToken,
      }
  if (url.indexOf('users/resetPassword') > -1) {
    headers = {}
  }
  return axios({
    method,
    url: apiEndpoint + url,
    data,
    headers,
  })
}

export default API
