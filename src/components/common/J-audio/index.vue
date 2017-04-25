<template>
  <div class="jAudio">
    <audio id="audioPlay"
	    :src="src"
	    :autoplay="isAutoplay"
	    @timeupdate="updateTime($event)"
	    @error="loadError"
	    @ended="onEnded"
    ></audio>
    <div class="btn_play xaiconfont" @click="play">&#xe633;</div>
    <vueSlider
			ref="slider"
			v-model="currentTime"
			:min="0"
			:max="duration"
			:realTime="true"
			:lazy="true"
			:dot-size="16"
			:height="1"
	    tooltip="hover"
	    @callback="changeRange"
		>
		</vueSlider>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import {Browser} from '@/utils/assist'
const browser = new Browser()
console.log(browser)

var Utils = {
	s2m (s) {
		// alert('s2m:'+s);
		// if (s == 0) return '0:00';
		if (s.toString() === 'NaN') return '0:00'
		return Math.floor(s / 60) + ':' + (s % 60 / 100).toFixed(2).slice(-2)
	}
}

export default {
  name: 'j-audio',
  props: {
    src: String,
    duration: {
    	type: Number,
    	default: 100
    }
  },
  created () {
  },
  mounted () {
  	this.audio = document.getElementById('audioPlay')
  },
  data () {
  	return {
  		audio: null,
  		playing: false,
			currentTime: 0,
			isIOS: browser.os === 'iOS'
  	}
  },
  computed: {
  	isAutoplay () {
  		return false
  		// return !this.isIOS
  	},
		formatter () {
			return Utils.s2m(this.currentTime)
		}
  },
  methods: {
  	play () {
			if (this.playing) {
				this.audio.pause()
				this.playing = false
			} else {
				this.audio.play()
				this.playing = true
			}
	  	console.log(this.audio.duration)
  	},
		updateTime (e) {
			this.currentTime = e.target.currentTime;
		},
		loadError () {
			console.log('loadError')
		},
		onEnded () {
			this.audio.currentTime = 0
			this.playing = false
		},
		changeRange (val) {
			this.audio.currentTime = val
		}
  },
  components: {
  	vueSlider
  }
}
</script>

<style lang="scss">
@import "../../../assets/css/style";

.jAudio{
	position: relative;
	.btn_play{
		cursor: pointer;
		
	}
}
</style>
