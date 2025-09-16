<script setup lang="ts">
import type { Todo } from "@/stores/TodosStore";
import TodoItem from "./TodoItem.vue";

interface InProgressListProps {
  data: Todo[];
}

const props = defineProps<InProgressListProps>();
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2">
    <span class="font-bold text-start w-full">In Progress</span>
    <div class="w-full flex flex-col items-center gap-3 max-h-[17rem] overflow-y-auto">
      <TodoItem v-for="todo in props.data" :key="String(todo.id)" :data="todo" />
    </div>
  </div>
</template>
