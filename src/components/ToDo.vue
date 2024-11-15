<script setup>
import { createTodo, deleteTodo, getTodos, updateTodos } from '@/api/services'
import { ref, onBeforeMount } from 'vue'
import TodoCard from './UI/TodoCard.vue'
import TodoInput from './TodoInput.vue'
import ErrorComponent from './UI/ErrorComponent.vue'
import { formatDateTime } from './utils/dateUtil.vue'

const todoList = ref([])
const errorMessage = ref('')

onBeforeMount(async () => {
  try {
    todoList.value = await getTodos()
  } catch (error) {
    if (error.message.includes('Could not connect to server')) {
      errorMessage.value = error.message
    }
  }
})

const addTodo = newTodo => {
  try {
    todoList.value.push(newTodo)
    createTodo(newTodo)
  } catch (error) {
    console.log(error)
  }
}

const removeTodo = id => {
  try {
    todoList.value = todoList.value.filter(todo => todo.id !== id)
    deleteTodo(id)
  } catch (error) {
    console.log(error)
  }
}
const editTodo = async (id, editedTodo) => {
  try {
    const updatedAt = formatDateTime()
    await updateTodos({ id, updatedTodo: editedTodo, updatedAt: updatedAt })

    todoList.value = [
      ...todoList.value.map(todo =>
        todo.id === id
          ? { ...todo, text: editedTodo, updatedAt: updatedAt }
          : todo,
      ),
    ]
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="m-10">
    <TodoInput @submit="addTodo" />
    <ErrorComponent v-if="errorMessage" :errorText="errorMessage" />
    <div
      class="grid grid-rows-auto grid-cols-1 gap-6 grid-template-columns sm:grid-cols-2 md:grid-cols-4 mt-10"
    >
      <li
        v-for="todo in todoList"
        :key="todo.id"
        class="list-none"
        @inputChange="inputChange"
      >
        <TodoCard :todo="todo" @edit="editTodo" @delete="removeTodo" />
      </li>
    </div>
  </div>
</template>
