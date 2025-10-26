import React from 'react'
import ReactDOM from 'react-dom/client'
import Taro from '@tarojs/taro'
import App from './app'

Taro.initPxTransform({
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
)

root.render(<App>{/* pages */}</App>)
