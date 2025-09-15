<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import TodoList from "./components/TodoList.vue";
import { cn } from "./utils/helper";

import NoDataNoti from "./components/NoDataNoti.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { useTodosStore, type Todo } from "./stores/TodosStore";
import { useSpinnerStore } from "./stores/SpinnerStore";
import { storeToRefs } from "pinia";
import IconPlus from "./assets/icon/IconPlus.vue";



const newTodoName = ref<string>("");
const todosStore = useTodosStore();
const spinnerStore = useSpinnerStore();
const {todoList} = storeToRefs(todosStore);
const {addTodo, removeTodo, toggleCompleted} = todosStore;
const {isLoading} = storeToRefs(spinnerStore);
const {ToggleSpinner} = spinnerStore;

onMounted(async () => {
  const savedTodoList = localStorage.getItem("todoList");
  if (savedTodoList) {
    try {
      ToggleSpinner(true, "Loading existing data...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      todoList.value = JSON.parse(savedTodoList) as Todo[] || [];
    } catch (error) {
      console.error("Error parsing saved todo list: ", error);
    } finally {
      ToggleSpinner(false);
    }
  }
});

onUnmounted(() => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
});

watch(
  todoList,
  (newValue) => {
    console.log(">>>check todo list: ", JSON.parse(JSON.stringify(newValue)));
    localStorage.setItem("todoList", JSON.stringify(newValue));
  },
  { deep: true }
);
</script>

<template>
  <div :class="cn('p-4 min-h-[100vh] bg-[#fceaf6] flex items-center justify-center')">
    <div
      :class="
        cn(
          'flex flex-col items-center min-h-[45rem] w-full md:w-[95%] lg:w-[80%] xl:w-[60%] gap-8'
        )
      "
    >
      <div
        class="w-full flex items-center justify-between border-2 border-[#fccee8] rounded-2xl px-4 py-3 gap-3"
      >
        <input
          class="flex-grow rounded-full shadow-md px-3 py-2 outline-none placeholder:text-[#a1a1a1] focus:ring-[#a1a1a1] focus:ring-2"
          type="text"
          placeholder="What magical thing will you do today?"
          v-model="newTodoName"
          @keyup.enter="newTodoName.trim() && addTodo(newTodoName.trim())"
        />
        <button
          class="w-[15%] text-white text-center bg-[#cd22a0] border rounded-full p-2.5 disabled:cursor-not-allowed disabled:bg-[#a1a1a1] flex items-center justify-center"
          :disabled="newTodoName.trim() === ''"
          @click="addTodo(newTodoName.trim())"
        >
          <span class="hidden md:inline">Add</span>
          <IconPlus class="inline md:hidden" />
        </button>
      </div>
      <TodoList v-if="todoList.length > 0" />
      <NoDataNoti v-if="isLoading === false && todoList.length === 0" />
    </div>
  </div>
  <LoadingSpinner v-if="isLoading" />
</template>
