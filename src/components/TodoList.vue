<script setup lang="ts">

import { useTodosStore, type Todo } from "@/stores/TodosStore";
import TodoItem from "./TodoItem.vue";
import { storeToRefs } from "pinia";

const todosStore = useTodosStore();
const {todoList} = storeToRefs(todosStore);
</script>

<template>
  <div class="w-full flex flex-col gap-3 items-center justify-center">
    <TodoItem v-for="todo in todoList" :key="String(todo.id)" :data="todo" />
  </div>
</template>
