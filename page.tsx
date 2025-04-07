"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { loadTasks } from "@/lib/features/tasks/tasksSlice"
import { checkAuthState } from "@/lib/features/auth/authSlice"
import LoginForm from "@/components/auth/login-form"
import TaskDashboard from "@/components/tasks/task-dashboard"

export default function Home() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user is authenticated from local storage
    dispatch(checkAuthState())

    // Load tasks from local storage if authenticated
    if (isAuthenticated) {
      dispatch(loadTasks())
    }
  }, [dispatch, isAuthenticated])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {isAuthenticated ? (
          <TaskDashboard />
        ) : (
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Task Manager</h1>
            <LoginForm />
          </div>
        )}
      </div>
    </main>
  )
}

