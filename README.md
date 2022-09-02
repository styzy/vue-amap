# vue-amap

> 一款支持 Vue.js 2.x 版本的高德地图插件

`vue-amap` 是一款适用于 `vue2` 的高德地图插件。

`vue-amap` 封装了大部分的高德地图原生组件，方便在 `Vue` 项目内使用。同时为了方便满足定制化开发的需求，内置了高德地图的加载器，可以手动加载高德地图。

## 安装

### npm

```
npm install -S @styzy/vue-amap
```

### yarn

```bash
yarn add @styzy/vue-amap
```

## 使用

### 引入

在 vue 实例化 `main.js` 中使用它

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from '@styzy/vue-amap'

Vue.config.productionTip = false

// 安装
Vue.use(VueAMap)

// 加载高德地图
VueAMap.initAMap({
    // 高德地图秘钥
    key: 'key',
    // SDK 版本
    version: '1.4.13',
    // UI库 版本
    uiVersion: '1.0',
    // 自定义引入的高德地图插件
    plugins: [
        'AMap.Geocoder',
        'AMap.DistrictSearch',
        'AMap.PlaceSearch',
        'AMap.Autocomplete',
        'AMap.PolyEditor'
    ],
    globalMapOptions: {
        // 全局高德地图参数
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```
