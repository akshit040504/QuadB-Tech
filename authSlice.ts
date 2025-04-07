import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  username: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
}

// Simulate login process
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation (in a real app, this would be a server call)
    if (username === "demo" && password === "password") {
      const user = { username, name: "Demo User" }
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } else {
      throw new Error("Invalid credentials")
    }
  },
)

// Check if user is already logged in
export const checkAuthState = createAsyncThunk("auth/checkState", async () => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    return JSON.parse(storedUser)
  }
  throw new Error("No user found")
})

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user")
  return null
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Login failed"
      })

      // Check auth state cases
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
      })

      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export default authSlice.reducer

