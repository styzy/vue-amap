<template lang="pug">
.v-amap-ctn
	.v-amap(ref="aMap")
	template(v-if="AMap && aMap")
		slot(:AMap="AMap" :aMap="aMap")
</template>

<script>
import AMapManager, { AMapLoader } from '@'
import { listenerProxy, watchProps } from '@/utils'

const watchedProps = [
	'zoom',
	[
		'center',
		function (aMap, newValue, oldValue) {
			if (newValue === oldValue) return
			aMap.setCenter(newValue)
		}
	],
	'labelzIndex',
	'lang',
	'defaultCursor',
	'features',
	'mapStyle',
	'pitch'
]

export default {
	name: 'VAMap',
	provide() {
		return {
			getMap: this.getMap
		}
	},
	data() {
		return {
			AMap: null,
			aMap: null
		}
	},
	created() {
		this._createMap()
	},
	destroyed() {
		this._destroyMap()
	},
	methods: {
		async _createMap() {
			this.AMap = await AMapLoader.load()

			const options = Object.assign(
				{},
				AMapManager.globalMapOptions,
				this.$attrs
			)

			this.aMap = new this.AMap.Map(this.$refs.aMap, options)

			listenerProxy(this.aMap, this)
			watchProps(this.aMap, this, watchedProps)

			this.$emit('init', this.aMap, this.AMap)
		},
		_destroyMap() {
			this.aMap && this.aMap.destroy()
		},
		getMap() {
			return this.aMap
		}
		// addMarker(marker) {
		// 	this.aMap && this.aMap.add(marker)
		// },
		// removeMarker(marker) {
		// 	this.aMap && this.aMap.remove(marker)
		// }
	}
}
</script>

<style lang="stylus" scoped>
.v-amap-ctn
	// overflow hidden
	height 100%
	.v-amap
		height 100%
</style>
