<script setup>
const props = defineProps({
  text: String,
  class: String,
})
const emit = defineEmits(['Btn-click'])
</script>
<template>
  <button
    class="p-2 px-6 text-sm bg-[#00995e] mx-2 text-white rounded custom-shadow active:shadow-none transform active:translate-y-1 md:text-lg md:my-3 "
    @click="() => emit('Btn-click')"
  >
    {{ props.text }}
  </button>
</template>
