<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import TodoList from "./components/TodoList.vue";
import { cn } from "./utils/helper";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import NoDataNoti from "./components/NoDataNoti.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

export type Todo = {
  id: number | string | null;
  name: string;
  startedDate: string;
  isCompleted: boolean;
};

const newTodoName = ref<string>("");
const todoList = ref<Todo[]>([]);
const loading = ref<boolean>(false);

onMounted(async () => {
  const savedTodoList = localStorage.getItem("todoList");
  if (savedTodoList) {
    try {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      todoList.value = JSON.parse(savedTodoList);
    } catch (error) {
      console.error("Error parsing saved todo list: ", error);
    } finally {
      loading.value = false;
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

const handleAddTodo = async () => {
  if (newTodoName.value.trim() === "") return;
  try {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    todoList.value = [
      ...todoList.value,
      {
        id: uuidv4(),
        name: newTodoName.value,
        startedDate: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        isCompleted: false,
      },
    ];
    newTodoName.value = "";
  } catch (error) {
    console.error("Error adding todo: ", error);
  } finally {
    loading.value = false;
  }
};

const toggleCompleted = async (id: string) => {
  try {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    todoList.value = todoList.value.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
  } catch (error) {
    console.error("Error toggling completed: ", error);
  } finally {
    loading.value = false;
  }
};

const handleRemoveTodo = async (id: string) => {
  try {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    todoList.value = todoList.value.filter((todo) => todo.id !== id);
  } catch (error) {
    console.error("Error removing todo: ", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div :class="cn('p-4 min-h-[100vh] bg-[#fceaf6] flex items-center justify-center')">
    <div :class="cn('flex flex-col items-center min-h-[45rem] min-w-[55rem] gap-8')">
      <div
        class="w-full flex items-center justify-between border-2 border-[#fccee8] rounded-2xl px-4 py-3 gap-3"
      >
        <input
          class="flex-grow rounded-full shadow-md px-3 py-2 outline-none placeholder:text-[#a1a1a1] focus:ring-[#a1a1a1] focus:ring-2"
          type="text"
          placeholder="What magical thing will you do today?"
          v-model="newTodoName"
          @keyup.enter="handleAddTodo"
        />
        <button
          class="w-[15%] text-white text-center bg-[#cd22a0] border rounded-full p-2.5"
          @click="handleAddTodo"
        >
          Add
        </button>
      </div>
      <TodoList
        v-if="todoList.length > 0"
        :data="todoList"
        :removeTodo="handleRemoveTodo"
        :toggleCompleted="toggleCompleted"
      />
      <NoDataNoti v-if="loading === false && todoList.length === 0" />
    </div>
  </div>
  <LoadingSpinner v-if="loading" message="Loading..." />
</template>
