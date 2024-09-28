<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import FSRApp from './components/FSRApp.vue';
import ServoApp from './components/ServoApp.vue';

const configLoaded = shallowRef(false)
const typeApp = shallowRef(0)
const config = shallowRef<AppConfig>({
  duration_default: 30.0,
  max_servo: 250,
  min_fsr: 5,
  type: 0
})

onMounted(() => {
  window.videoApi.onConfigLoad((_event, data) => {
    typeApp.value = data.type
    config.value = data
    configLoaded.value = true
  })
  window.videoApi.loadConfig()
})

</script>

<template>
  <template v-if="configLoaded">
    <FSRApp v-if="typeApp === 0" :min_fsr="config.min_fsr" :duration_default="config.duration_default"></FSRApp>
    <ServoApp v-else :max_servo="config.max_servo"></ServoApp>
  </template>
  <template v-else>
    Memuat config
  </template>
</template>

<style scoped>

</style>
