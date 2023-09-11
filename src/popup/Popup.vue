<script setup lang="ts">
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main p-2 class="min-w-[180px]" text-4>
    <div>shion-extension</div>
    <a-divider class="my-2!" />
    <div flex>
      <div flex-1 />
      <div cursor-pointer i-mdi:cog title="setting" @click="openOptionsPage" />
    </div>
  </main>
</template>
