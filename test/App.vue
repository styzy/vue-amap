<template lang="pug">
.app
	button(@click="handleFitView()") setFitView
	button(@click="abc = false") test
	VAMap(@init="handleMapInit")
		template(#default="{ AMap, aMap }")
			VAMapMarker(
				:offset="new AMap.Pixel(0, 0)"
				:position="[118.369659, 31.312356]"
				@init="marker => aMap.setFitView(marker)"
				anchor="center"
				v-if="abc"
			)
				Test
			VAMapPolygon(
				:borderWidth="2"
				:fillOpacity="0.2"
				:path="path"
				:strokeOpacity="0.5"
				:strokeWeight="2"
				@init="polygon => aMap.setFitView(polygon)"
				fillColor="#e98989"
				strokeColor="#ec0000"
				strokeStyle="dashed"
			)
			VAMapMassMarks(
				:data="massLocationList"
				:styleObject="{ anchor: new AMap.Pixel(5, 5), size: new AMap.Size(10, 10), url: massIconUrl }"
			)
</template>

<script>
export default {
	name: 'App',
	components: {
		Test: () => import('./Test.vue')
	},
	data() {
		return {
			abc: true,
			aMap: null,
			AMap: null,
			path: [
				[118.955969, 32.301212],
				[118.652472, 32.191452],
				[118.788428, 32.050723],
				[119.053473, 32.169368]
			],
			massIconUrl:
				'https://a.amap.com/jsapi_demos/static/images/mass2.png',
			massLocationList: []
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
		}
	}
}
</script>

<style lang="stylus">
body
	margin 0
	padding 0
.app
	height 100vh
</style>
