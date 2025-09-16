<script setup lang="ts">

import { useTodosStore, type Todo } from "@/stores/TodosStore";
import TodoItem from "./TodoItem.vue";
import { storeToRefs } from "pinia";
import CompletedList from "./CompletedList.vue";
import InProgressList from "./InProgressList.vue";

interface TodoListProps {
  inProgressData: Todo[];
  completedData: Todo[];
}

const props = defineProps<TodoListProps>();

const todosStore = useTodosStore();
const {todoList} = storeToRefs(todosStore);
</script>

<template>
  <div class="w-full flex flex-col gap-5 items-center justify-center">
    <InProgressList v-if="props.inProgressData.length > 0" :data="props.inProgressData" />
    <CompletedList v-if="props.completedData.length > 0" :data="props.completedData" />
  </div>
</template>
