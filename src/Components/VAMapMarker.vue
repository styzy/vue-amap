<template lang="pug">
.v-amap-marker
	.v-amap-marker-content(ref="content")
		slot
</template>
<script>
import { AMapLoader } from '@/index'
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
	inject: ['getMap'],
	data() {
		return {
			marker: null,
			isFixedMarkerSize: false
		}
	},
	computed: {
		hasSlot() {
			return !!this.$scopedSlots.default
		}
	},
	async mounted() {
		await this._createMarker()
		this._addMarker()
	},
	async updated() {
		if (!this.marker) return
		if (this.isFixedMarkerSize) return

		this.isFixedMarkerSize = true

		await this.$nextTick()

		this._updateMarkerContent()
	},
	beforeDestroy() {
		this._resetMarkerContent()
	},
	destroyed() {
		this._removeMarker()
	},
	methods: {
		async _createMarker() {
			const AMap = await AMapLoader.load(),
				options = Object.assign({}, this.$attrs, {
					content: this._getMarkerContent()
				})

			this.marker = new AMap.Marker(options)

			listenerProxy(this.marker, this)
			watchProps(this.marker, this, watchedProps)
		},
		_getMarkerContent() {
			return this.hasSlot ? this.$refs.content : null
		},
		_updateMarkerContent() {
			if (!this.hasSlot) return

			this.marker.setContent(this._getMarkerContent())
		},
		_resetMarkerContent() {
			if (!this.hasSlot) return

			this.$el.appendChild(this.$refs.content)
		},
		_addMarker() {
			this.getMap()?.add(this.marker)

			this.$emit('init', this.marker)
		},
		_removeMarker() {
			if (!this.marker) return

			this.getMap()?.remove(this.marker)
		}
	}
}
</script>

<style lang="stylus" scoped></style>
