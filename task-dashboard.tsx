"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { saveTasks } from "@/lib/features/tasks/tasksSlice"
import { logout } from "@/lib/features/auth/authSlice"
import TaskInput from "./task-input"
import TaskList from "./task-list"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default function TaskDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const { user } = useSelector((state: RootState) => state.auth)

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    dispatch(saveTasks(tasks))
  }, [tasks, dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Task Manager</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.name || "User"}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <TaskInput />
        <TaskList />
      </div>
    </div>
  )
}

