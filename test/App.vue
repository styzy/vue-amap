<template lang="pug">
.app
	.version version {{ version }}
	.btn-ctn
		button(@click="handleFitView()") 自动适配视野
		button(@click="isRender = !isRender") 是否渲染 [{{ isRender }}]
		button(@click="isShow = !isShow") 显示隐藏切换 [{{ isShow }}]
	.map-ctn
		VAMap(@init="handleMapInit")
			template(#default="{ AMap, aMap }")
				VAMapMarker(
					:offset="new AMap.Pixel(0, 0)"
					:position="[118.369659, 31.312356]"
					:visible="isShow"
					@init="handleMarkerInit"
					anchor="center"
					v-if="isRender"
				)
				VAMapPolygon(
					:borderWidth="2"
					:fillOpacity="0.2"
					:path="path"
					:strokeOpacity="0.5"
					:strokeWeight="2"
					:visible="isShow"
					@init="handlePolygonInit"
					fillColor="#e98989"
					strokeColor="#ec0000"
					strokeStyle="dashed"
					v-if="isRender"
				)
				VAMapMassMarks(
					:data="massLocationList"
					:styleObject="{ anchor: new AMap.Pixel(5, 5), size: new AMap.Size(10, 10), url: massIconUrl }"
					:visible="isShow"
					@init="handleMassMarkInit"
					v-if="isRender"
				)
		.search-ctn
			VAMapPlaceSearchInput(
				:value="placeName1"
				@change="handlePlace1NameChange"
				@locationChange="handlePlace1LocationChange"
				@placeChange="handlePlace1Change"
				placeholder="允许自定义输入"
			)
			VAMapPlaceSearchInput(
				:customEnable="false"
				@locationChange="handlePlace2LocationChange"
				@placeChange="handlePlace2Change"
				placeholder="禁止自定义输入"
				v-model="placeName2"
			)
			VAMapPlaceSearchInput(
				:customEnable="false"
				@locationChange="handlePlace2LocationChange"
				@placeChange="handlePlace2Change"
				disabled
				placeholder="禁止自定义输入 禁用"
				v-model="placeName2"
			)
</template>

<script>
import AMapManager from '@'

export default {
	name: 'App',
	data() {
		return {
			version: AMapManager.version,
			aMap: null,
			AMap: null,
			isRender: true,
			isShow: true,
			path: [
				[118.955969, 32.301212],
				[118.652472, 32.191452],
				[118.788428, 32.050723],
				[119.053473, 32.169368]
			],
			massIconUrl:
				'https://a.amap.com/jsapi_demos/static/images/mass2.png',
			massLocationList: [],
			placeName1: '123',
			placeName2: ''
		}
	},
	mounted() {
		this.massLocationList = this.createLocationList(1000)
	},
	methods: {
		handleMapInit(aMap, AMap) {
			this.aMap = aMap
			this.AMap = AMap
		},
		handleFitView() {
			this.aMap && this.aMap.setFitView()
		},
		createLocationList(num) {
			var data = []
			for (var i = 0, len = num; i < len; i++) {
				data.push({
					lnglat: [
						118.384004 +
							(Math.random() > 0.5 ? 1 : -1) * Math.random(),
						31.318309 +
							(Math.random() > 0.5 ? 1 : -1) * Math.random()
					]
				})
			}
			return data
		},
		handleMarkerInit() {
			console.log('marker init')
		},
		handlePolygonInit() {
			console.log('polygon init')
		},
		handleMassMarkInit() {
			console.log('mass mark init')
		},
		handlePlace1Change(place) {
			console.log('place1 change: ', place)
		},
		handlePlace1NameChange(name) {
			this.placeName1 = name
			console.log('place1 name change: ', name)
		},
		handlePlace1LocationChange(location) {
			console.log('place1 location change: ', location)
		},
		handlePlace2Change(place) {
			console.log('place2 change: ', place)
		},
		handlePlace2LocationChange(location) {
			console.log('place2 location change: ', location)
		}
	}
}
</script>

<style lang="stylus">
body
	margin 0
	padding 0
.app
	position relative
	height 100vh
	.version
		position absolute
		top 0
		right 20px
		height 40px
		line-height @height
	.btn-ctn
		height 40px
		button
			padding 0 20px
			height @height
			outline none
			border 1px solid #CCCCCC
			background-color #EEEEEE
			color #424242
			line-height @height
			cursor pointer
			&:hover
				background-color #FFFFFF
		button+button
			border-left none
	.map-ctn
		position relative
		height calc(100% - 40px)
		.search-ctn
			position absolute
			top 20px
			left 20px
			z-index 1
			width 300px
</style>
