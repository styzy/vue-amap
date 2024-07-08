<template lang="pug">
.v-amap-place-search-input
	input(
		:placeholder="placeholder"
		@blur="handleBlur()"
		ref="input"
		v-model="inputValue"
	)
</template>

<script>
import { AMapLoader } from '@'

export default {
	name: 'VAMapPlaceSearchInput',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: String,
			default: ''
		},
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
			inputValue: '',
			placeName: '',
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
					this.placeName = event.poi.name
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

					if (!position && !this.customEnable) {
						this.clear()
					} else {
						this.$emit('change', this.placeName)
						this.$emit('locationChange', position)
					}
				}
			)
		},
		removeListener() {
			this.AMap.event.removeListener(this.autocompleteListener)
			this.AMap.event.removeListener(this.placeSearchListener)
		},
		clear() {
			this.inputValue = ''
			this.placeName = ''
			this.$emit('change', this.placeName)
			this.$emit('locationChange', null)
		},
		handleBlur() {
			if (this.inputValue !== this.placeName) {
				if (this.customEnable) {
					this.$emit('change', this.inputValue)
				} else {
					this.clear()
				}
			}
		},
		handleInput(event) {
			this.inputValue = event.target.value
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
