import AMapLoader from './loader'
import Components from './Components'
import { version } from './config'

let globalMapOptions = {}

class AMapManager {
	static get version() {
		return version
	}
	static get AMapLoader() {
		return AMapLoader
	}
	static get globalMapOptions() {
		return globalMapOptions
	}
	static install(Vue) {
		Components.forEach(Component => {
			Vue.component(Component.name, Component)
		})
	}
	static async initAMap({ globalMapOptions: options = {}, ...args }) {
		globalMapOptions = Object.assign({}, options)

		AMapLoader.config({ ...args })

		return await AMapLoader.load()
	}
	constructor() {}
}

export { AMapLoader }

export default AMapManager
