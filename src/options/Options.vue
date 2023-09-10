<script setup lang="ts">
import { sendMessage } from 'webext-bridge/options'
const port = ref(4040)

watch(port, () => {
  sendMessage('change-port', {
    port: port.value,
  }, 'background')
})
</script>

<template>
  <main px-4 py-10 text-4>
    <span>port</span>
    <input v-model="port" type="number">
  </main>
</template>
