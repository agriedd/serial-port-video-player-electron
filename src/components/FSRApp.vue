<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue';

const props = withDefaults(defineProps<{
  duration_default: number,
  min_fsr: number,
}>(), {
  duration_default: 30.0,
  min_fsr: 250,
})

const pathToVideoFirst = "/resources/video-1.mp4"
const pathToVideoSecond = "/resources/video-2.mp4"

const secondVideoDurationDefault = computed(() => {
  return props.duration_default
})
const secondVideoDuration = shallowRef(secondVideoDurationDefault.value)
const alreadyOnSecondVideo = shallowRef(false)

const onVideoPause = (e: Event) => {
  // (e.target as HTMLVideoElement).play()
}

let onSecondVideo: NodeJS.Timeout | null = null

const onVideoLoad = (e: Event) => {
  const el = (e.target as HTMLVideoElement)

  let duration = el.duration ?? secondVideoDurationDefault.value
  if (duration != secondVideoDurationDefault.value) {
    console.log("set duration");
    secondVideoDuration.value = duration
  }

  if (!alreadyOnSecondVideo.value) {
    alreadyOnSecondVideo.value = true
    if (onSecondVideo) {
      clearTimeout(onSecondVideo)
    }
    onSecondVideo = setTimeout(() => {
      console.log("clear video 2");
      
      hideSecondVideo()

      alreadyOnSecondVideo.value = false

    }, secondVideoDuration.value * 1000);
  }

}

const startApp = () => {
  window.videoApi.startApp();
};

const message = shallowRef("")
const minFSRValue = computed(() => props.min_fsr)
const FSRValue = shallowRef(0)
const connected = shallowRef(false)
const debug = shallowRef(true)

const toggleVideo = () => {

  const value = 245 + (Math.random() * 10)

  if (value >= minFSRValue.value) {
    console.log("person sit");

    if (alreadyOnSecondVideo.value) {
      console.log("already on video 2");
    } else {
      console.log("show video 2");
      FSRValue.value = value
    }
  } else {

    if (alreadyOnSecondVideo) {

    } else {
      FSRValue.value = value
    }

  }
  // if (FSRValue.value != 300) {
  //   FSRValue.value = 300
  // } else {
  //   FSRValue.value = 0
  // }
}

const hideSecondVideo = () => {
  FSRValue.value = 0
}

const showSecondVideo = computed(() => {
  return FSRValue.value >= minFSRValue.value
})
const showHightlight = shallowRef(true)

onMounted(() => {
  window.videoApi.onMessageReceived((_event, data) => {
    try {

      message.value = data.replaceAll(/[^0-9]/g, "")
      let value = parseInt(data.replaceAll(/[^0-9]/g, ""))

      if (value >= minFSRValue.value) {
        console.log("person sit");

        if (alreadyOnSecondVideo.value) {
          console.log("already on video 2");
        } else {
          console.log("show video 2");
          FSRValue.value = value
        }
      } else {

        if (alreadyOnSecondVideo) {

        } else {
          FSRValue.value = value
        }

      }

    } catch (error) {
      console.log("error");
    }
  })
  window.videoApi.onConnected(() => {
    console.log("Connected");

    connected.value = true
  })
  window.videoApi.onDisconnect(() => {
    console.log("disconect");
    connected.value = false
  })
  startApp()
  setTimeout(() => {
    showHightlight.value = false
  }, 5000)
})

</script>

<template>
  <div class="container" style="background-color: black;">
    <div style="position: fixed; bottom: 0px; left: 0px; z-index: 3; padding: 1rem;">

      <div style="height: .25rem; width: .25rem; background-color: turquoise; border-radius: .5rem;" v-if="connected">
      </div>
      <div v-else style="height: .25rem; width: .25rem; background-color: red; border-radius: .5rem;"></div>
      <div v-if="showHightlight">
        App 0
      </div>
      <template v-if="debug">
        <button @click="toggleVideo">
          Toggle
        </button>
        <div style="font-size: .75rem;">
          {{ message }}
        </div>
      </template>
    </div>
    <Transition :mode="'in-out'" name="fade">
      <div
        style="background-color: black; z-index: 1; height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center;"
        v-if="showSecondVideo">
        <video :src="pathToVideoSecond" class="video-2 video-view" style="margin: auto;" autoplay @pause="onVideoPause"
          @stop="onVideoPause" loop @load="onVideoLoad" @canplay="onVideoLoad"></video>
      </div>
      <div v-else style="background-color: black; z-index: 2; height: 100%; width: 100%; position: absolute;">
        <video :src="pathToVideoFirst" class="video-1 video-view" autoplay @pause="onVideoPause" style="margin: auto;"
          @stop="onVideoPause" loop></video>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
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
