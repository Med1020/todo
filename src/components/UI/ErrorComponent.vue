<script setup>
const props = defineProps({
  errorText: String,
  retry: Function,
})
</script>

<template>
  <div
    class="flex flex-row  text-red-500 bg-red-200 w-1/2 rounded p-2 mt-2"
  >
    <p class="flex-1">{{ props.errorText }} </p>
    <button @click="retry" class="px-4 underline">retry</button>
    <button class="pr-2">X</button>
  </div>
</template>
