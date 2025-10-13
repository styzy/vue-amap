import Vue from 'vue'
import App from './App.vue'
import VueAMap from '@/index'
// import VueAMap, { AMapLoader } from '@styzy/vue-amap'

Vue.config.productionTip = false

Vue.use(VueAMap)

VueAMap.initAMap({
	key: '30556745e1796cbe4f69a621a8bc58bf',
	// SDK 版本
	version: '1.4.13',
	// UI库 版本
	uiVersion: '1.0',
	plugins: [
		'AMap.Geocoder',
		'AMap.DistrictSearch',
		'AMap.PlaceSearch',
		'AMap.Autocomplete',
		'AMap.PolyEditor'
	],
	globalMapOptions: {
		features: ['bg', 'point'],
		mapStyle: 'amap://styles/493ee83fb009f6613033e674f2136454'
	}
})

new Vue({
	render: h => h(App)
}).$mount('#app')
