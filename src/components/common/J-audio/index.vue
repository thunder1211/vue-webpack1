<template>
  <div class="jAudio" :class="{Mobile : isMobile}">
    <audio id="audioPlay"
	    :src="src"
	    @timeupdate="updateTime($event)"
	    @playing="onPlaying"
	    @pause="onPause"
	    @error="loadError"
	    @ended="onEnded"
    ></audio>
    <div class="btn_play" @click="play">
	    <span class="xaiconfont" v-if="playing">&#xe682;</span>
	    <span class="xaiconfont" v-else>&#xe633;</span>
    </div>
    <div class="vueSliderSec">
	    <vueSlider
				ref="slider"
				v-model="currentTime"
				:min="0"
				:max="duration"
				:formatter="formatCurrentTime"
				:realTime="true"
				:lazy="true"
				:dot-size="16"
				:height="1"
		    tooltip="false"
		    @callback="changeRange"
			>
			</vueSlider>
		</div>
		<span class="audioTimeShow">{{formatCurrentTime}} / {{formatDuration}}</span>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import {Browser, timeFormater} from '@/utils/assist'
const browser = new Browser()

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
  	this.init()
  },
  data () {
  	return {
  		audio: null,
  		playing: false,
			currentTime: 0,
			isMobile: browser.device === 'Mobile',
			isIOS: browser.os === 'iOS'
  	}
  },
  computed: {
		formatCurrentTime () {
			return timeFormater(this.currentTime)
		},
		formatDuration () {
			return timeFormater(this.duration)
		}
  },
  methods: {
  	init () {
			if (!this.isMobile) {
  			this.toPlay()
			}
  	},
  	play () {
			if (this.playing) {
				this.toPause()
			} else {
				this.toPlay()
			}
  	},
  	toPlay () {
			this.audio.play()
			this.playing = true
  	},
  	toPause () {
			this.audio.pause()
			this.playing = false
		},
		// 在手机屏幕关闭时进行暂停播放操作，需要监听onpause和onplaying事件
		onPause () {
			this.toPause()
		},
		onPlaying () {
			this.toPlay()
		},
		updateTime (e) {
			this.currentTime = Math.floor(e.target.currentTime);
		},
		loadError () {
			console.error('Audio load error!')
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
	height: 40px;
	.btn_play{
		float: left;
		margin-left: 12px;
		line-height: 40px;
		cursor: pointer;
		.xaiconfont{
			font-size: 36px;
			color: #555;
		}
	}
	.vueSliderSec{
		margin-left: 60px;
		padding: 10px 100px 0 0;
	}
	.audioTimeShow{
		position: absolute;
		right: 15px;
		top: 50%;
		margin-top: -8px;
		float: right;
	}
	&.Mobile{
		.vueSliderSec{
		}
	}
}
</style>
