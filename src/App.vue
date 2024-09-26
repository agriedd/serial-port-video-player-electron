<script setup lang="ts">
import { shallowRef } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

const showSecondVideo = shallowRef(false)

const pathToVideoFirst = "/6536354-hd_1920_1080_25fps.mp4"
const pathToVideoSecond = "/file_example_MP4_1920_18MG.mp4"

const toggleVideo = ()=>{
  showSecondVideo.value = !showSecondVideo.value
}
const onVideoPause = (e: Event)=>{
  (e.target as HTMLVideoElement).play()
}
</script>

<template>
  <div class="container">
    <div style="position: fixed; top: 0px; left: 0px; z-index: 3; padding: 1rem;">
      <button @click="toggleVideo">
        Toggle
      </button>
    </div>
    <div style="background-color: black; z-index: 1; height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center;">
      <video :src="pathToVideoSecond" class="video-2 video-view" style="margin: auto;" autoplay @pause="onVideoPause" loop></video>
    </div>
    <div v-if="!showSecondVideo" style="background-color: black; z-index: 2; height: 100%; width: 100%; position: absolute;">
      <video :src="pathToVideoFirst" class="video-1 video-view" autoplay @pause="onVideoPause" loop></video>
    </div>
  </div>
</template>

<style scoped>
body{
  margin: 0;
}
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-items: center;
  align-content: center;
  align-items: center;
}
.video-view {
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
