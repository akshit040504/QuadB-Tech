# Advanced React To-Do Application with API Integration

Welcome to the Advanced React To-Do Application, a feature-rich task management app designed as part of a frontend development training program. This project combines foundational web development technologies (HTML, CSS, JavaScript) with advanced frontend concepts like React Hooks, Redux for state management, API integration, responsive UI, and mock user authentication.

This README provides a detailed overview of the application's features, architecture, technologies used, and how to run it locally or access the deployed version.

🚀 Live Demo
👉 View Live Site

🧠 Project Objective
The goal of this project is to elevate a basic to-do app by incorporating:

External API integration (e.g., weather API for outdoor tasks)

Advanced state management using Redux and Redux Thunk/Saga

Component-based architecture using React functional components and hooks

Responsive design with a mobile-first approach

Mock authentication to protect routes and simulate login/logout

Persistent storage using LocalStorage

This simulates a real-world application environment and allows developers to demonstrate practical skills in building scalable, maintainable, and user-friendly React applications.

🧩 Features
✅ Core To-Do Functionality
Add new tasks with a title and optional priority (High, Medium, Low)

Display tasks in a list with priority-based color indicators

Delete tasks from the list

Mark tasks as completed (optional enhancement)

Persist tasks in LocalStorage across sessions

🌦 API Integration
Integrate a public API (e.g., OpenWeatherMap)

For tasks tagged as outdoor activities, display the current weather condition

Handle API loading states and errors gracefully in the UI

🧠 State Management with Redux
Centralized global state for tasks and authentication

Async operations handled via Redux Thunk or Redux Saga

Reducers and actions are cleanly organized for scalability

🔐 Authentication (Mocked)
Simulated login/logout using a Redux store

Protected routes: the To-Do list is only accessible when logged in

Auth state persists using LocalStorage

📱 Responsive UI
Mobile-first design approach

CSS Flexbox and Grid used for layout responsiveness

Styled using either custom CSS or a component library (Bootstrap, Material-UI, etc.)

🛠 Technologies Used
HTML5

CSS3 / Bootstrap / Material-UI

JavaScript (ES6+)

React (with Hooks)

Redux (with Redux Thunk/Saga for async calls)

LocalStorage API

Public API (e.g., OpenWeatherMap for weather data)
