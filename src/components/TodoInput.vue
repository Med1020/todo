<script setup>
import { ref } from 'vue'
import { formatDateTime } from './utils/dateUtil.vue'
import ErrorComponent from './UI/ErrorComponent.vue'

const inputTodo = ref('')
const error = ref('')
const emit = defineEmits(['submit'])

const generateBackgroundColor = () => {
  const colors = [
    '#f7fe8e',
    '#aca0f8',
    '#68C7C1',
    '#F57F5B',
    '#b3adf0',
    '#fadac1',
    '#fbd266',
  ]
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  return backgroundColor
}

const handleSubmit = e => {
  e.preventDefault()
  if (inputTodo.value.trim()) {
    const newTodo = {
      id: String(Date.now()),
      text: inputTodo.value,
      createdAt: formatDateTime(),
      updatedAt: formatDateTime(),
      state: 'new',
      backgroundColor: generateBackgroundColor(),
    }
    emit('submit', newTodo)
    inputTodo.value = ''
  } else {
    error.value = 'Please enter an input'
  }
}
</script>

<template>
  <form @submit="handleSubmit" class="w-1/2">
    <h1 class="text-3xl font-bold">To DoDo</h1>
    <p class="text-xs text-gray-500">Because chores/work usually suck boo</p>
    <div class="my-2 mt-4 w-full flex">
      <input
        type="string"
        v-model="inputTodo"
        placeholder="Enter text here..."
        class="p-2 rounded-md bg-[#ffc567] h-full placeholder:text-black flex-1 custom-shadow outline-none focus:bg-[#ffd896] focus:placeholder:text-gray-500"
        @change="() => (error = '')"
      />

      <button
        type="submit"
        class="py-2 px-6 ml-6 bg-[#00995e] mx-2 text-white rounded text-lg custom-shadow active:shadow-none transform active:translate-y-1"
      >
        Enter
      </button>
    </div>
  </form>
  <ErrorComponent v-if="error" :errorText="error" />
</template>
