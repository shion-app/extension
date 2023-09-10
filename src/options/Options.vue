<script setup lang="ts">
import { sendMessage } from 'webext-bridge/options'
import { port } from '~/logic/storage'

watch(port, () => {
  sendMessage('change-port', {
    port: port.value,
  }, 'background')
}, {
  immediate: true,
})
</script>

<template>
  <main px-4 py-10 text-4>
    <span>port</span>
    <input v-model="port" type="number">
  </main>
</template>
