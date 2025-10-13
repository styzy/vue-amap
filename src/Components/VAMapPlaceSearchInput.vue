<template lang="pug">
.v-amap-place-search-input
	input(
		:class="{ 'is-disabled': disabled }"
		:disabled="disabled"
		:placeholder="placeholder"
		:value="value"
		@blur="handleBlur()"
		@focus="handleFocus()"
		@input="handleInput($event)"
	)
	.option-ctn(v-if="placeList.length")
		.option(
			:title="place.name + place.cityname"
			@click="handlePlaceSelect(place)"
			v-for="place in placeList"
		)
			span.name {{ place.name }}
			span.city {{ place.cityname }}
</template>

<script>
import { AMapLoader } from '@/index'
import { isParentNode } from '@/utils'

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
		disabled: {
			type: Boolean,
			default: false
		},
		customEnable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			AMap: null,
			placeSearch: null,
			placeList: [],
			place: null
		}
	},
	watch: {
		place() {
			this.$emit('change', this.place ? this.place.name : '')
			this.$emit(
				'locationChange',
				this.place
					? [this.place.location.lng, this.place.location.lat]
					: null
			)
			this.$emit('placeChange', this.place)
		}
	},
	mounted() {
		window.addEventListener('click', this.optionsHideListener, true)
		window.addEventListener('contextmenu', this.optionsHideListener, true)
	},
	beforeDestroy() {
		window.removeEventListener('click', this.optionsHideListener, true)
		window.removeEventListener(
			'contextmenu',
			this.optionsHideListener,
			true
		)
	},
	methods: {
		async createPlaceSearch() {
			this.AMap = await AMapLoader.load()
			this.placeSearch = new this.AMap.PlaceSearch({
				extensions: 'all'
			})
		},
		async getPlaceList() {
			if (!this.placeSearch) {
				await this.createPlaceSearch()
			}
			this.placeSearch.search(this.value, (status, result) => {
				if (status === 'complete') {
					this.placeList = result?.poiList?.pois || []
				} else {
					this.placeList = []
				}
			})
		},
		async handleInput(event) {
			this.$emit('change', event.target.value)
			await this.$nextTick()
			this.getPlaceList()
		},
		handlePlaceSelect(place = null) {
			this.place = place
			this.placeList = []
		},
		handleFocus() {
			if (this.value?.trim()) {
				this.getPlaceList()
			}
		},
		handleBlur() {
			if (this.customEnable) return
			if (this.value !== this.place?.name) {
				this.clear()
			}
		},
		optionsHideListener(event) {
			if (isParentNode(this.$el, event.target)) return
			this.placeList = []
		},
		clear() {
			this.place = null
			this.$emit('change', '')
		}
	}
}
</script>

<style lang="stylus" scoped>
baseScroll($color = #AAAAAA) // 默认滚动条
	&::-webkit-scrollbar
		width 10px
	&::-webkit-scrollbar-track-piece
		background-color transparent
	&::-webkit-scrollbar-thumb
		border-radius 10px
		background-color transparent
	&:hover
		&::-webkit-scrollbar-track-piece
			background-color rgba($color, 0.2)
		&::-webkit-scrollbar-thumb
			background-color $color
			&:hover
				background-color: $color - #222222
.v-amap-place-search-input
	position relative
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
		&::-webkit-input-placeholder
			color #C0C4CC
		&.is-disabled
			border-color #E4E7ED
			background-color #F5F7FA
			color #C0C4CC
			cursor not-allowed
	.option-ctn
		baseScroll()

		position absolute
		top 100%
		right 0
		left 0
		z-index 1
		overflow-y auto
		box-sizing border-box
		max-height 402px
		border 1px solid #DCDFE6
		background-color #FFFFFF
		.option
			overflow hidden
			padding-right 5px
			padding-left 15px
			height 40px
			text-overflow ellipsis
			white-space nowrap
			font-size 12px
			line-height @height
			cursor pointer
			&:hover
				background-color #F4F5F6
			.name
				color #424242
			.city
				margin-left 5px
				color #C1C1C1
</style>
