<script lang="ts" setup>
import type { Todo } from "@/App.vue";
import { cn } from "@/utils/helper";

interface TodoItemProps {
  data: Todo;
  removeTodo: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

const props = defineProps<TodoItemProps>();
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
      @change="props.toggleCompleted(String(props.data.id))"
    />
    <div class="flex flex-col gap-1 flex-grow justify-center items-start">
      <span
        :class="cn('text-[14px] font-bold', props.data.isCompleted ? 'line-through' : '')"
        >{{ props.data.name }}</span
      >
      <span class="text-[#a1a1a1] text-[12px]">{{ props.data.startedDate }}</span>
    </div>
    <button
      class="bg-red-400 text-white text-center px-3 py-2 rounded-full"
      @click="props.removeTodo(String(props.data.id))"
    >
      Remove
    </button>
  </div>
</template>
