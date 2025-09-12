<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import TodoList from "./components/TodoList.vue";
import { cn } from "./utils/helper";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import NoDataNoti from "./components/NoDataNoti.vue";

export type Todo = {
  id: number | string | null;
  name: string;
  startedDate: string;
  isCompleted: boolean;
};

const newTodoName = ref<string>("");
const todoList = ref<Todo[]>([]);

onMounted(() => {
  const savedTodoList = localStorage.getItem("todoList");
  if (savedTodoList) {
    try {
      todoList.value = JSON.parse(savedTodoList);
    } catch (error) {
      console.error("Error parsing saved todo list: ", error);
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

const handleAddTodo = () => {
  if (newTodoName.value.trim() === "") return;
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
};

const toggleCompleted = (id: string) => {
  todoList.value = todoList.value.map((todo) => {
    if (todo.id === id) {
      todo.isCompleted = !todo.isCompleted;
    }
    return todo;
  });
};

const handleRemoveTodo = (id: string) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
};
</script>

<template>
  <div :class="cn('p-4 min-h-[100vh] bg-[#fceaf6] flex items-center justify-center')">
    <div :class="cn('flex flex-col items-center min-h-[600px] min-w-[700px] gap-8')">
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
        v-show="todoList.length > 0"
        :data="todoList"
        :removeTodo="handleRemoveTodo"
        :toggleCompleted="toggleCompleted"
      />
      <NoDataNoti v-show="todoList.length === 0" />
    </div>
  </div>
</template>
