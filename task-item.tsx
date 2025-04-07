"use client"

import { useState } from "react"
import type { Task, Priority } from "@/lib/features/tasks/tasksSlice"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, MapPin, Cloud, CloudRain, Sun, CloudSun } from "lucide-react"

interface WeatherData {
  temperature: number
  description: string
  icon: string
}

interface TaskItemProps {
  task: Task
  weatherData?: WeatherData
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onUpdatePriority: (id: string, priority: Priority) => void
}

export default function TaskItem({ task, weatherData, onDelete, onToggleComplete, onUpdatePriority }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const getWeatherIcon = () => {
    if (!weatherData) return <Cloud className="h-4 w-4" />

    const { description } = weatherData
    const lowerDesc = description.toLowerCase()

    if (lowerDesc.includes("rain") || lowerDesc.includes("drizzle")) {
      return <CloudRain className="h-4 w-4" />
    } else if (lowerDesc.includes("clear") || lowerDesc.includes("sunny")) {
      return <Sun className="h-4 w-4" />
    } else if (lowerDesc.includes("cloud") || lowerDesc.includes("overcast")) {
      return <CloudSun className="h-4 w-4" />
    }

    return <Cloud className="h-4 w-4" />
  }

  return (
    <div
      className={`
        flex items-start gap-3 p-3 rounded-lg border
        ${task.completed ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"}
        transition-all duration-200
        ${isHovered ? "shadow-md" : "shadow-sm"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggleComplete(task.id)}
        className="mt-1"
      />

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <label
            htmlFor={`task-${task.id}`}
            className={`
              font-medium text-sm sm:text-base cursor-pointer
              ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100"}
            `}
          >
            {task.title}
          </label>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={priorityColors[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>

            {!task.completed && (
              <Select value={task.priority} onValueChange={(value) => onUpdatePriority(task.id, value as Priority)}>
                <SelectTrigger className="h-7 w-[110px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {task.location && (
          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{task.location}</span>

            {weatherData && (
              <div className="flex items-center ml-2 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {getWeatherIcon()}
                <span className="ml-1">{weatherData.temperature}°F</span>
                <span className="ml-1 hidden sm:inline">{weatherData.description}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-8 w-8 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete task</span>
      </Button>
    </div>
  )
}

