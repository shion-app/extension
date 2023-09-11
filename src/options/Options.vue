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
  <main px-8 py-4>
    <img src="/assets/icon.png" alt="logo" width="96" height="96" mb-4>
    <a-form
      autocomplete="off"
      :colon="false"
    >
      <a-form-item name="port" label="port">
        <a-input-number v-model:value="port" />
      </a-form-item>
    </a-form>
  </main>
</template>
