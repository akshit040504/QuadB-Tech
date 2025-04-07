import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export type Priority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: number
  location?: string
}

interface TasksState {
  tasks: Task[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
}

// Async thunk for loading tasks from localStorage
export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const storedTasks = localStorage.getItem("tasks")
  return storedTasks ? JSON.parse(storedTasks) : []
})

// Async thunk for saving tasks to localStorage
export const saveTasks = createAsyncThunk("tasks/saveTasks", async (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
  return tasks
})

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: Priority }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id)
      if (task) {
        task.priority = action.payload.priority
      }
    },
    updateTaskLocation: (state, action: PayloadAction<{ id: string; location: string }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id)
      if (task) {
        task.location = action.payload.location
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to load tasks"
      })
      .addCase(saveTasks.fulfilled, (state, action) => {
        // No state changes needed as the tasks are already updated in the reducers
      })
  },
})

export const { addTask, removeTask, toggleTaskCompletion, updateTaskPriority, updateTaskLocation } = tasksSlice.actions

export default tasksSlice.reducer

