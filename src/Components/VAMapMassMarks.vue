<script>
import { AMapLoader } from '@'
import { listenerProxy, watchProps } from '@/utils'

const watchedProps = [
	// 新增属性
	[
		'data',
		function (marker, value) {
			marker.setData(value)
		}
	],
	[
		'styleObject',
		(marker, value) => {
			marker.setStyle(value)
		}
	],
	[
		'visible',
		(marker, value) => {
			marker[value ? 'show' : 'hide']()
		}
	]
]

export default {
	name: 'VAMapMassMarks',
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
					style: this.$attrs.styleObject || {}
				})

			this.marker = new AMap.MassMarks(this.$attrs.data || [], options)

			listenerProxy(this.marker, this)
			watchProps(this.marker, this, watchedProps)
		},
		_addMarker() {
			this.marker.setMap(this.getMap())

			this.$emit('init', this.marker)
		},
		_removeMarker() {
			if (!this.marker) return

			this.marker.clear()
			this.marker.setMap()
		}
	},
	render() {
		return null
	}
}
</script>
