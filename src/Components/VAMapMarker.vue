<template lang="pug">
.v-amap-marker
	slot
</template>
<script>
import { AMapLoader } from '@'
import { listenerProxy, watchProps } from '@/utils'

const watchedProps = [
	'position',
	'anchor',
	'offset',
	'icon',
	'draggable',
	'cursor',
	[
		'visible',
		function (marker, value) {
			marker[value ? 'show' : 'hide']()
			value && this._updateMarkerContent()
		}
	],
	[
		'zIndex',
		function (marker, value) {
			marker.setzIndex(value)
		}
	],
	'angle',
	'animation',
	'shadow',
	'title',
	'clickable',
	'shape',
	'extData',
	'label'
]

export default {
	name: 'VAMapMarker',
	data() {
		return {
			marker: null,
			isFixedMarkerSize: false
		}
	},
	mounted() {
		this._createMarker()
	},
	async updated() {
		if (!this.marker) return
		if (this.isFixedMarkerSize) return

		this.isFixedMarkerSize = true

		await this.$nextTick()

		this._updateMarkerContent()
	},
	destroyed() {
		this._removeMarker()
	},
	methods: {
		async _createMarker() {
			const AMap = await AMapLoader.load(),
				options = Object.assign({}, this.$attrs, {
					content: this.$scopedSlots.default ? this.$el : null
				})

			this.marker = new AMap.Marker(options)

			listenerProxy(this.marker, this)
			watchProps(this.marker, this, watchedProps)

			this._addMarker()
		},
		_updateMarkerContent() {
			this.marker.setContent(this.$el)
		},
		_addMarker() {
			if (!this.$parent.addMarker) return

			this.$parent.addMarker(this.marker)

			this.$emit('init', this.marker)
		},
		_removeMarker() {
			if (!this.marker) return
			if (!this.$parent.removeMarker) return

			this.$parent.removeMarker(this.marker)
		}
	}
}
</script>

<style lang="stylus" scoped></style>
