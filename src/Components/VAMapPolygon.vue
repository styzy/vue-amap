<script>
import { AMapLoader } from '@/index'
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
	inject: ['getMap'],
	data() {
		return {
			marker: null
		}
	},
	async created() {
		await this._createMarker()
		this._addMarker()
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
		},
		_addMarker() {
			this.getMap()?.add(this.marker)

			this.$emit('init', this.marker)
		},
		_removeMarker() {
			if (!this.marker) return

			this.getMap()?.remove(this.marker)
		}
	},
	render() {
		return null
	}
}
</script>
