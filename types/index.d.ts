type AMap = any

type AMapLoaderConfigOptions = {
	/**
	 * 高德地图 API 密钥
	 */
	key: string
	/**
	 * SDK 版本
	 */
	version: string
	/**
	 * UI库 版本
	 */
	uiVersion: string
	/**
	 * 插件列表
	 */
	plugins: Array<string>
}

/**
 * 高德地图 SDK 加载器
 */
interface IAMapLoader {
	/**
	 * 高德地图 API 密钥
	 */
	key: string
	/**
	 * SDK 版本
	 */
	version: string
	/**
	 * UI库 版本
	 */
	uiVersion: string
	/**
	 * 插件列表
	 */
	plugins: Array<string>
	/**
	 * 回调函数名称
	 */
	callbackName: string
	/**
	 * 是否已加载 SDK
	 */
	isSdkLoaded: boolean
	/**
	 * 是否正在加载 SDK
	 */
	isSdkLoading: boolean
	/**
	 * 加载完成后的回调函数列表
	 */
	callbacks: Array<() => void>
	/**
	 * 配置高德地图 SDK 加载器
	 * @param options 高德地图 SDK 加载器配置项
	 * @returns
	 */
	config: (options: AMapLoaderConfigOptions) => void
	/**
	 * 加载高德地图 SDK
	 * - 使用 await 等待加载完成
	 * - 加载完成后，返回 AMap 类
	 */
	load: () => Promise<AMap>
}

type InitOptions = AMapLoaderConfigOptions & {
	/**
	 * 全局地图选项
	 */
	globalMapOptions: GlobalMapOptions
}

type GlobalMapOptions = Record<string, any>

declare module '@styzy/vue-amap' {
	import { PluginFunction } from 'vue'

	/**
	 * 高德地图管理器
	 */
	export default class AMapManager {
		/**
		 * 高德地图管理器版本号
		 */
		static version: string
		/**
		 * 安装高德地图组件，提供给 Vue 安装，注册组件
		 */
		static install: PluginFunction<void>
		/**
		 * 初始化高德地图 SDK，加载地图脚本
		 * @param options 高德地图 SDK 加载器配置项
		 */
		static initAMap(options: InitOptions): Promise<AMap>
	}
}
