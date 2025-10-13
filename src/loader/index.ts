import CONSTANTS from '../CONSTANTS'

class Loader implements IAMapLoader {
	#key = ''
	#version = ''
	#uiVersion = ''
	#plugins: Array<string> = []
	#callbackName = ''
	#isSdkLoaded = false
	#isSdkLoading = false
	#callbacks: Array<() => void> = []
	get key() {
		return this.#key
	}
	get version() {
		return this.#version
	}
	get uiVersion() {
		return this.#uiVersion
	}
	get plugins() {
		return this.#plugins
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
		return this.#callbackName
	}
	get isSdkLoaded() {
		return this.#isSdkLoaded
	}
	get isSdkLoading() {
		return this.#isSdkLoading
	}
	get callbacks() {
		return this.#callbacks
	}
	constructor() {
		this.#callbackName = `${CONSTANTS.CALLBACK_NAME}_${Date.now()}`
		this.#isSdkLoaded = false
		this.#isSdkLoading = false
	}
	config(
		{
			key = '',
			version = '',
			uiVersion = '',
			plugins = []
		} = {} as AMapLoaderConfigOptions
	) {
		this.#key = key
		this.#version = version
		this.#uiVersion = uiVersion
		this.#plugins = plugins
	}
	async load() {
		if (this.isSdkLoaded) return (window as any).AMap

		if (this.isSdkLoading)
			return new Promise(resolve => {
				this.callbacks.push(() => {
					resolve((window as any).AMap)
				})
			})

		return new Promise(resolve => {
			this.#isSdkLoading = true
			;(window as any)[this.callbackName] = () => {
				this.#isSdkLoaded = true
				this.#isSdkLoading = false

				if (this.uiVersion) {
					;(window as any).initAMapUI()
				}

				delete (window as any)[this.callbackName]
				resolve((window as any).AMap)

				this.#callbacks.forEach(callback => {
					callback && callback()
				})

				this.#callbacks = []
			}
			if (this.uiVersion) {
				this.loadScript(this.uiSdkUrl, () => {
					this.loadScript(this.sdkUrl)
				})
			} else {
				this.loadScript(this.sdkUrl)
			}
		})
	}
	private loadScript(url: string, callback?: () => void) {
		const el_script = document.createElement(
			'script'
		) as HTMLScriptElement & {
			attachEvent?: (event: string, handler: () => void) => void
		}
		el_script.charset = 'utf-8'
		el_script.src = url

		if (el_script.addEventListener) {
			el_script.addEventListener('load', () => {
				callback && callback()
			})
		} else if (el_script.attachEvent) {
			el_script.attachEvent('onreadystatechange', () => {
				const target = window.event!.srcElement as any
				if (target.readyState == 'loaded') {
					callback && callback()
				}
			})
		}
		document.head.appendChild(el_script)
	}
}

export const loader = new Loader()
