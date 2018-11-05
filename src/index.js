import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import configureStore from 'store'
import Routes from 'routes'
import 'styles/global-styles'
import 'antd/dist/antd.css';
import registerServiceWorker from 'utils/registerServiceWorker'

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://test-api.techsee.me/api/'
// axios.defaults.headers = {
//   Origin: 'https://test-api.techsee.me'
// }

render(
  <Provider store={configureStore()}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
