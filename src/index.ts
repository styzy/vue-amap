import { loader } from './loader'
import Components from './Components'
import { version } from './config'

let _globalMapOptions = {}

export const AMapLoader = loader

export default class AMapManager {
	static get version() {
		return version
	}
	static get globalMapOptions() {
		return _globalMapOptions
	}
	static install(Vue: any) {
		Components.forEach(Component => {
			Vue.component(Component.name, Component)
		})
	}
	static async initAMap({ globalMapOptions = {}, ...args }) {
		_globalMapOptions = Object.assign({}, globalMapOptions)

		AMapLoader.config({ ...args } as AMapLoaderConfigOptions)

		return await AMapLoader.load()
	}
	constructor() {}
}
