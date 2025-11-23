# TaskMaster - Todo App

A modern, professional todo application built with React and Tailwind CSS. Features a beautiful dark/light theme, priority levels, statistics dashboard, and full CRUD functionality.

## 🔗 [**Live Demo**](https://aadhivenkat.github.io/ToDo-app/) ✨

![TaskMaster Todo App](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
[![Live Demo](https://img.shields.io/badge/demo-live-success?logo=github)](https://aadhivenkat.github.io/ToDo-app/)
[![GitHub Pages](https://img.shields.io/badge/deployed%20on-GitHub%20Pages-blue?logo=github)](https://aadhivenkat.github.io/ToDo-app/)

## ✨ Features

- 🌓 **Dark/Light Theme** - Toggle between dark and light modes with smooth transitions
- 📊 **Statistics Dashboard** - View total, active, and completed tasks at a glance
- 🎯 **Priority Levels** - Set low, medium, or high priority for each task
- 📅 **Due Dates** - Add optional due dates with visual indicators for overdue and upcoming tasks
- 🔍 **Search Functionality** - Quickly find tasks by searching through task text
- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks
- 🔍 **Filtering** - Filter tasks by All, Active, or Completed
- 💾 **Local Storage** - All tasks are automatically saved to browser storage
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful glassmorphism effects and smooth animations
- ⌨️ **Keyboard Shortcuts** - Edit tasks with double-click, Enter to save, Escape to cancel

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aadhiVenkat/ToDo-app.git
cd ToDo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 🛠️ Technologies Used

- **React 18.2.0** - UI library
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Vite 5.0.8** - Build tool and dev server
- **React Hooks** - State management
- **Local Storage API** - Data persistence

## 📱 Features in Detail

### Theme Toggle
- Click the theme toggle button (top-right) to switch between dark and light themes
- Theme preference is saved and persists across sessions

### Task Management
- **Add Task**: Type in the input field and click "Add Task" or press Enter
- **Set Priority**: Click the priority buttons (L/M/H) before adding a task
- **Add Due Date**: Select an optional due date for tasks with deadline reminders
- **Search Tasks**: Use the search bar to quickly find tasks by text
- **Edit Task**: Double-click on any task to edit it
- **Complete Task**: Click the checkbox to mark a task as complete
- **Delete Task**: Hover over a task and click the delete icon
- **Change Priority**: Click on the priority badge to change it

### Due Date Features
- **Visual Indicators**: 
  - 🔴 Red "Overdue" for past due dates
  - 🟠 Orange "Today" for tasks due today
  - 🔵 Blue "Tomorrow" for tasks due tomorrow
  - Days countdown for tasks due within a week
  - Date display for tasks due later
- **Smart Sorting**: Tasks are automatically sorted by due date (overdue first)

### Filtering
- **All**: Shows all tasks
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only completed tasks
- **Clear Completed**: Remove all completed tasks at once

## 🎨 Design Features

- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Gradient backgrounds and buttons
- Responsive grid layouts
- Touch-friendly mobile interface
- Accessible focus states

## 📝 Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── StatsCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TodoFilters.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aadhi Venkat**
- GitHub: [@aadhiVenkat](https://github.com/aadhiVenkat)
- Live Demo: [TaskMaster App](https://aadhivenkat.github.io/ToDo-app/)

Built with ❤️ using React and Tailwind CSS

---

## 🌟 Portfolio Highlights

This project demonstrates:
- ✅ **Modern React Patterns** - Hooks, Context API, component composition
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **State Management** - Efficient local state with localStorage persistence
- ✅ **User Experience** - Smooth animations, keyboard shortcuts, theme switching
- ✅ **Clean Code** - Well-structured components, reusable logic
- ✅ **Production Ready** - Deployed on GitHub Pages with CI/CD

**Note**: This is a portfolio project showcasing modern React development practices and responsive design.
