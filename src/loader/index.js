import CONSTANTS from '../CONSTANTS'

class Loader {
	get key() {
		return this._key
	}
	get version() {
		return this._version
	}
	get uiVersion() {
		return this._uiVersion
	}
	get plugins() {
		return this._plugins
	}
	get sdkUrl() {
		return `${CONSTANTS.SDK_URL}?v=${this.version}&key=${
			this.key
		}&callback=${this.callbackName}&plugin=${this.plugins.join(',')}`
	}
	get uiSdkUrl() {
		return `https://webapi.amap.com/ui/${this.uiVersion}/main-async.js`
	}
	get callbackName() {
		return this._callbackName
	}
	get isSdkLoaded() {
		return this._isSdkLoaded
	}
	get isSdkLoading() {
		return this._isSdkLoading
	}
	get callbacks() {
		return this._callbacks
	}
	constructor() {
		this._loadCallback = null
		this._callbackName = `${CONSTANTS.CALLBACK_NAME}_${Date.now()}`
		this._isSdkLoaded = false
		this._isSdkLoading = false
		this._callbacks = []
	}
	_loadScript(url, callback) {
		let el_script = document.createElement('script')
		el_script.charset = 'utf-8'
		el_script.src = url

		if (el_script.addEventListener) {
			el_script.addEventListener('load', () => {
				callback && callback()
			})
		} else if (el_script.attachEvent) {
			el_script.attachEvent('onreadystatechange', () => {
				let target = window.event.srcElement
				if (target.readyState == 'loaded') {
					callback && callback()
				}
			})
		}
		document.head.appendChild(el_script)
	}
	config({ key = '', version = '', uiVersion = '', plugins } = {}) {
		this._key = key
		this._version = version
		this._uiVersion = uiVersion
		this._plugins = plugins
	}
	async load() {
		if (this.isSdkLoaded) return window.AMap

		if (this.isSdkLoading)
			return new Promise(resolve => {
				this.callbacks.push(() => {
					resolve(window.AMap)
				})
			})

		return new Promise(resolve => {
			this._isSdkLoading = true

			window[this.callbackName] = () => {
				this._isSdkLoaded = true
				this._isSdkLoading = false

				if (this.uiVersion) {
					window.initAMapUI()
				}

				delete window[this.callbackName]
				resolve(window.AMap)

				this.callbacks.forEach(callback => {
					callback && callback()
				})

				this._callbacks = []
			}
			if (this.uiVersion) {
				this._loadScript(this.uiSdkUrl, () => {
					this._loadScript(this.sdkUrl)
				})
			} else {
				this._loadScript(this.sdkUrl)
			}
		})
	}
}

export default new Loader()
