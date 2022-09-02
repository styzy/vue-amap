<template lang="pug">
.v-amap-place-search-input
	input(:placeholder="placeholder" ref="input")
</template>

<script>
import { AMapLoader } from '@'

export default {
	name: 'VAMapPlaceSearchInput',
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		customEnable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			AMap: null,
			autocompleteListener: null,
			placeSearchListener: null
		}
	},
	async mounted() {
		this.AMap = await AMapLoader.load()
		this.addListener()
	},
	destroyed() {
		this.removeListener()
	},
	methods: {
		async addListener() {
			const autocomplete = new this.AMap.Autocomplete({
					input: this.$refs.input
				}),
				placeSearch = new this.AMap.PlaceSearch({})

			this.autocompleteListener = this.AMap.event.addListener(
				autocomplete,
				'select',
				event => {
					placeSearch.search(event.poi.name)
				}
			)

			this.placeSearchListener = this.AMap.event.addListener(
				placeSearch,
				'complete',
				event => {
					var position = null
					if (
						event &&
						event.poiList &&
						event.poiList.pois &&
						event.poiList.pois.length
					) {
						position = [
							event.poiList.pois[0].location.lng,
							event.poiList.pois[0].location.lat
						]
					}
					this.$emit('change', position)

					if (!position && !this.customEnable) {
						this.$refs.input.value = ''
					}
				}
			)
		},
		removeListener() {
			this.AMap.event.removeListener(this.autocompleteListener)
			this.AMap.event.removeListener(this.placeSearchListener)
		}
	}
}
</script>

<style lang="stylus" scoped>
.v-amap-place-search-input
	input
		display inline-block
		box-sizing border-box
		padding 0 15px
		width 100%
		height 40px
		outline 0
		border 1px solid #DCDFE6
		border-radius 4px
		background-color #FFF
		background-image none
		color #606266
		font-size inherit
		line-height 40px
		transition border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)
		-webkit-appearance none
</style>

<style lang="stylus">
.amap-sug-result
	display none
</style>
