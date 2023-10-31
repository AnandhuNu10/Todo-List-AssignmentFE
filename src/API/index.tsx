import axios from 'axios'
import store from '../store'
const apiEndpoint = 'http://localhost:3003/'

const API = (
  method: string,
  url: string,
  data: any = {},
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
