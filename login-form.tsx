"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "@/lib/features/auth/authSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const { status, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your tasks.
          <br />
          <span className="text-sm text-muted-foreground mt-2 block">
            (Use username: <strong>demo</strong> and password: <strong>password</strong>)
          </span>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

