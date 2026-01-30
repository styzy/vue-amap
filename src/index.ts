import loader from './loader'
import Components from './Components'
import { version } from './config'

let _globalMapOptions = {}

export default class AMapManager {
	static get AMapLoader() {
		return loader
	}
	static get globalMapOptions() {
		return _globalMapOptions
	}
	static get version() {
		return version
	}
	static install(Vue: any) {
		Components.forEach(Component => {
			Vue.component(Component.name, Component)
		})
	}
	static async initAMap({ globalMapOptions = {}, ...args }) {
		_globalMapOptions = Object.assign({}, globalMapOptions)

		loader.config({ ...args } as AMapLoaderConfigOptions)

		return await loader.load()
	}
	constructor() {}
}
