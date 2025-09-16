import { defineStore } from "pinia";
import type { StoreDefinition } from "pinia"
import { v4 as uuidv4 } from "uuid"
import dayjs from "dayjs"
import { useSpinnerStore } from "./SpinnerStore";

export type Todo = {
  id: number | string | null;
  name: string;
  startedDate: string;
  isCompleted: boolean;
  completedAt?: string;
};

interface TodosState {
  todoList: Todo[]
}

interface TodosActions {
  addTodo(newTodoName: string): Promise<void>,
  removeTodo(id: string): Promise<void>,
  toggleCompleted(id: string): Promise<void>,
}

export const useTodosStore: StoreDefinition<
  'todos',
  TodosState,
  {},
  TodosActions
> = defineStore('todos', {
  state: (): TodosState => ({
    todoList: [],
  }),
  getters: {

  },
  actions: {
    async addTodo(newTodoName: string) {
      const spinnerStore = useSpinnerStore();
      try {
        spinnerStore.ToggleSpinner(true, "Adding todo...")
        await new Promise(resolve => setTimeout(resolve, 1500))
        const newTodo = {
          id: uuidv4(),
          name: newTodoName,
          startedDate: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          isCompleted: false,
        }
        this.todoList = [...this.todoList, newTodo]
      } catch (error) {
        console.error("Error adding todo: ", error);
      } finally {
        spinnerStore.ToggleSpinner(false)
      }
    },
    async removeTodo(id: string) {
      const spinnerStore = useSpinnerStore();
      try {
        spinnerStore.ToggleSpinner(true, "Removing todo...")
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.todoList = this.todoList.filter(todo => todo.id !== id)
      } catch (error) {
        console.error("Error removing todo: ", error);
      } finally {
        spinnerStore.ToggleSpinner(false)
      }
    },
    async toggleCompleted(id: string) {
      const spinnerStore = useSpinnerStore();
      try {
        spinnerStore.ToggleSpinner(true, "Toggling completed...")
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.todoList = this.todoList.map(todo => {
          if (todo.id === id) {
            todo.isCompleted = !todo.isCompleted
            todo.completedAt ? todo.completedAt = "" : todo.completedAt = dayjs().format("DD/MM/YYYY HH:mm:ss")
          }
          return todo
        })
      } catch (error) {
        console.error("Error toggling completed: ", error);
      } finally {
        spinnerStore.ToggleSpinner(false)
      }
    },
  }
})