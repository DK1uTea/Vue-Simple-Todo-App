<script setup lang="ts">
import { cn } from "@/utils/helper";

interface LoadingSpinnerProps {
  message?: string;
}
const props = defineProps<LoadingSpinnerProps>();
</script>

<template>
  <div
    :class="
      cn(
        'absolute inset-0 top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center bg-black/40'
      )
    "
  >
    <div class="flex flex-col items-center gap-3">
      <span
        :class="
          cn(
            'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent'
          )
        "
      ></span>
      <span class="mr-4 text-3xl text-white">{{ props.message }}</span>
    </div>
  </div>
</template>
