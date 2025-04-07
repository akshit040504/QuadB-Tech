"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { removeTask, toggleTaskCompletion, updateTaskPriority, type Priority } from "@/lib/features/tasks/tasksSlice"
import { fetchWeatherByLocation } from "@/lib/features/weather/weatherSlice"
import TaskItem from "./task-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const weatherData = useSelector((state: RootState) => state.weather.data)

  // Fetch weather data for tasks with locations
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.location && !weatherData[task.location]) {
        dispatch(fetchWeatherByLocation(task.location))
      }
    })
  }, [tasks, weatherData, dispatch])

  const handleDelete = (id: string) => {
    dispatch(removeTask(id))
  }

  const handleToggleComplete = (id: string) => {
    dispatch(toggleTaskCompletion(id))
  }

  const handleUpdatePriority = (id: string, priority: Priority) => {
    dispatch(updateTaskPriority({ id, priority }))
  }

  // Group tasks by completion status
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  // Sort tasks by priority (high to low) and then by creation date (newest first)
  const sortTasks = (taskList: typeof tasks) => {
    return [...taskList].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff =
        priorityOrder[b.priority as keyof typeof priorityOrder] -
        priorityOrder[a.priority as keyof typeof priorityOrder]

      return priorityDiff !== 0 ? priorityDiff : b.createdAt - a.createdAt
    })
  }

  const sortedPendingTasks = sortTasks(pendingTasks)
  const sortedCompletedTasks = sortTasks(completedTasks)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            {sortedPendingTasks.length > 0 ? (
              <div className="space-y-3">
                {sortedPendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    weatherData={task.location ? weatherData[task.location] : undefined}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                    onUpdatePriority={handleUpdatePriority}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No pending tasks. Add a new task to get started!
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {sortedCompletedTasks.length > 0 ? (
              <div className="space-y-3">
                {sortedCompletedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    weatherData={task.location ? weatherData[task.location] : undefined}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                    onUpdatePriority={handleUpdatePriority}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">No completed tasks yet.</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

