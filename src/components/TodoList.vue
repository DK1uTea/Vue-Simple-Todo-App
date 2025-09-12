<script setup lang="ts">
import type { Todo } from "@/App.vue";
import TodoItem from "./TodoItem.vue";

interface TodoListProps {
  data: Todo[];
  removeTodo: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

const props = defineProps<TodoListProps>();
</script>

<template>
  <div
    class="w-full flex flex-col gap-3 items-center justify-center"
    v-for="todo in props.data"
  >
    <TodoItem
      :data="todo"
      :removeTodo="props.removeTodo"
      :toggleCompleted="props.toggleCompleted"
    />
  </div>
</template>
