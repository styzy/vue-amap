<script>
import { AMapLoader } from '@'
import { listenerProxy, watchProps } from '@/utils'

const watchedProps = [
	'path',
	// 新增属性
	[
		'visible',
		function (marker, value) {
			marker[value ? 'show' : 'hide']()
		}
	],
	[
		'zIndex',
		function (marker, value) {
			marker.setOptions({ zIndex: value })
		}
	],
	[
		'bubble',
		function (marker, value) {
			marker.setOptions({ bubble: value })
		}
	],
	[
		'cursor',
		function (marker, value) {
			marker.setOptions({ cursor: value })
		}
	],
	[
		'strokeColor',
		function (marker, value) {
			marker.setOptions({ strokeColor: value })
		}
	],
	[
		'strokeOpacity',
		function (marker, value) {
			marker.setOptions({ strokeOpacity: value })
		}
	],
	[
		'strokeWeight',
		function (marker, value) {
			marker.setOptions({ strokeWeight: value })
		}
	],
	[
		'strokeStyle',
		function (marker, value) {
			marker.setOptions({ strokeStyle: value })
		}
	],
	[
		'strokeDasharray',
		function (marker, value) {
			marker.setOptions({ strokeDasharray: value })
		}
	],
	[
		'fillColor',
		function (marker, value) {
			marker.setOptions({ fillColor: value })
		}
	],
	[
		'fillOpacity',
		function (marker, value) {
			marker.setOptions({ fillOpacity: value })
		}
	],
	[
		'draggable',
		function (marker, value) {
			marker.setOptions({ draggable: value })
		}
	]
]

export default {
	name: 'VAMapPolygon',
	data() {
		return {
			marker: null
		}
	},
	created() {
		this._createMarker()
	},
	destroyed() {
		this._removeMarker()
	},
	methods: {
		async _createMarker() {
			const AMap = await AMapLoader.load(),
				options = Object.assign({}, this.$attrs, {
					map: undefined
				})

			this.marker = new AMap.Polygon(options)

			listenerProxy(this.marker, this)
			watchProps(this.marker, this, watchedProps)

			this._addMarker()
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
	},
	render() {
		return null
	}
}
</script>
