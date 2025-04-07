import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface WeatherData {
  location: string
  temperature: number
  description: string
  icon: string
}

interface WeatherState {
  data: Record<string, WeatherData>
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: WeatherState = {
  data: {},
  status: "idle",
  error: null,
}

// Fetch weather data for a location
export const fetchWeatherByLocation = createAsyncThunk("weather/fetchByLocation", async (location: string) => {
  try {
    // In a real app, you would use your API key
    // For demo purposes, we'll simulate the API response
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate different weather conditions based on location
    const weatherConditions: Record<string, any> = {
      "New York": {
        temperature: 72,
        description: "Partly cloudy",
        icon: "03d",
      },
      London: {
        temperature: 65,
        description: "Light rain",
        icon: "10d",
      },
      Tokyo: {
        temperature: 80,
        description: "Clear sky",
        icon: "01d",
      },
      Sydney: {
        temperature: 85,
        description: "Sunny",
        icon: "01d",
      },
      Paris: {
        temperature: 70,
        description: "Scattered clouds",
        icon: "03d",
      },
    }

    // Default weather if location not found
    const defaultWeather = {
      temperature: 75,
      description: "Moderate",
      icon: "02d",
    }

    // Find closest matching location or use default
    const matchedLocation = Object.keys(weatherConditions).find((city) =>
      location.toLowerCase().includes(city.toLowerCase()),
    )

    const weather = matchedLocation ? weatherConditions[matchedLocation] : defaultWeather

    return {
      location,
      ...weather,
    }
  } catch (error) {
    throw new Error("Failed to fetch weather data")
  }
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data[action.payload.location] = action.payload
      })
      .addCase(fetchWeatherByLocation.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch weather"
      })
  },
})

export default weatherSlice.reducer

