"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { addTask, type Priority } from "@/lib/features/tasks/tasksSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, MapPin } from "lucide-react"

export default function TaskInput() {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [location, setLocation] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim()) {
      dispatch(
        addTask({
          id: uuidv4(),
          title: title.trim(),
          completed: false,
          priority,
          createdAt: Date.now(),
          location: location.trim() || undefined,
        }),
      )

      // Reset form
      setTitle("")
      setPriority("medium")
      setLocation("")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task">Task</Label>
            <Input
              id="task"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (optional)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="location"
                  className="pl-10"
                  placeholder="e.g., New York, London, etc."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

