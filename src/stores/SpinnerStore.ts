import { defineStore } from "pinia"
import type { StoreDefinition } from "pinia"

interface SpinnerState {
  isLoading: boolean;
  message: string;
}

interface SpinnerActions {
  ToggleSpinner(value: boolean, message?: string): void
}

export const useSpinnerStore: StoreDefinition<
  'spinner',
  SpinnerState,
  {},
  SpinnerActions
> = defineStore('spinner', {
  state: (): SpinnerState => ({
    isLoading: false,
    message: "",
  }),
  actions: {
    ToggleSpinner(value: boolean, message?: string) {
      this.isLoading = value;
      if(value === false) {
        this.message = "";
      }
      if(value === true && message) {
        this.message = message;
      }
    },
  },
})
