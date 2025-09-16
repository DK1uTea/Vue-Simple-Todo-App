<script lang="ts" setup>
import { useTodosStore, type Todo } from "@/stores/TodosStore";
import { cn } from "@/utils/helper";

interface TodoItemProps {
  data: Todo;
}

const props = defineProps<TodoItemProps>();

const todosStore = useTodosStore();
const {removeTodo, toggleCompleted} = todosStore;
</script>

<template>
  <div
    :class="
      cn(
        'border-2 border-[#c1ddff] rounded-xl px-4 py-3 flex items-center gap-3 w-full',
        props.data.isCompleted
          ? 'bg-[#effdf5] border-[#baf8d0]'
          : 'bg-[#eff4ff] border-[#c1ddff]'
      )
    "
  >
    <input
      class="h-7 w-7"
      type="checkbox"
      :checked="props.data.isCompleted"
      @change="toggleCompleted(String(props.data.id))"
    />
    <div class="flex flex-col gap-1 flex-grow justify-center items-start">
      <span
        :class="cn('text-[14px] font-bold', props.data.isCompleted ? 'line-through' : '')"
        >{{ props.data.name }}</span
      >
      <span v-if="!props.data.isCompleted" class="text-[#325ea8] text-[12px]"
        >Started Date: {{ props.data.startedDate }}</span
      >
      <span
        v-if="props.data.isCompleted && props.data.completedAt"
        class="text-[#32a852] text-[12px]"
        >Completed Date: {{ props.data.completedAt }}</span
      >
    </div>
    <button
      class="bg-red-400 text-white text-center px-3 py-2 rounded-full"
      @click="removeTodo(String(props.data.id))"
    >
      Remove
    </button>
  </div>
</template>
