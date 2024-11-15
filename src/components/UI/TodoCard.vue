<script setup>
import { ref } from 'vue'
import ButtonComponent from './ButtonComponent.vue'
import TickIcon from '../icons/TickIcon.vue'
import CrossIcon from '../icons/CrossIcon.vue'

const props = defineProps({
  todo: Object,
})
const { id, text, updatedAt, state, backgroundColor } = props.todo
const emit = defineEmits(['edit', 'delete'])
const editedTodo = ref({ prev: text, new: text })
const isEditing = ref(false)

const editTodo = () => {
  emit('edit', id, editedTodo.value.new)
  setIsEditing()
}

const removeTodo = () => {
  emit('delete', id)
}

const cancelEdit = () => {
  setIsEditing()
  editedTodo.value.new = editedTodo.value.prev
}
const setIsEditing = () => {
  isEditing.value = !isEditing.value
}
</script>

<template>
  <div
    class="p-4 rounded w-full flex flex-col justify-between h-full custom-shadow"
    :style="{ backgroundColor }"
  >
    <p class="flex justify-end">{{ state }}</p>
    <p class="text-ellipsis" v-if="!isEditing" @click="setIsEditing">
      {{ text }}
    </p>
    <form class="flex flex-col relative">
      <div
        class="grid text-sm after:px-3.5 after:py-2.5 [&>textarea]:text-inherit after:text-inherit [&>textarea]:resize-none [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2] after:[grid-area:1/1/2/2] after:whitespace-pre-wrap after:invisible after:content-[attr(data-cloned-val)_'_'] after:border"
        :data-cloned-val="editedTodo.new"
        v-if="isEditing"
      >
        <textarea
          type="string"
          v-model="editedTodo.new"
          class="p-2 rounded border-2 border-gray-200 outline-none text-ellipsis overflow-hidden resize-y px-3.5 py-2.5"
        ></textarea>
      </div>

      <div v-if="isEditing" class="flex justify-end">
        <button @click="cancelEdit" class="p-2 text-gray-700">
          <CrossIcon />
        </button>
        <button @click="editTodo" type="submit" class="p-2 text-gray-700">
          <TickIcon />
        </button>
      </div>
    </form>

    <div class="flex justify-between items-center">
      <p class="text-xs">{{ updatedAt?.date }} {{ updatedAt?.time }}</p>
      <ButtonComponent text="Delete" @Btn-click="removeTodo" />
    </div>
  </div>
</template>
