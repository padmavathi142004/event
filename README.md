# 📅 Smart Event Management System

A modern, responsive, and feature-rich **Event Management Dashboard** built with **React 19**, **Vite**, and **TailwindCSS**. This application provides a seamless experience for both administrators and users to manage and participate in events.

---

## 🚀 Features

### 🛠 Administrative Tools
- **Analytic Dashboard**: Real-time tracking of total, upcoming, and past events.
- **Graphical Insights**: Interactive bar charts (via `Chart.js`) showcasing top-registered events.
- **Full CRUD Operations**: Create, Read, Update, and Delete events with advanced form validation.
- **Participant Management**: Monitor event registration stats at a glance.

### 👤 User Experience
- **Personalized Dashboard**: View and filter upcoming events by category or date.
- **Event Registration**: One-click registration for events with instant feedback.
- **Event Favorites**: Mark events as favorites with a wishlist-style heart system.
- **Calendar Integration**: Visual event tracking with an integrated calendar component.
- **Responsive Interface**: Optimised for mobile, tablet, and desktop views with a sleek dark-themed aesthetic.

---

## 🏗 Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/)
- **Navigation**: [React Router Dom v7](https://reactrouter.com/)
- **Components**: [React Calendar](https://github.com/wojtekmaj/react-calendar)
- **Utilities**: [UUID](https://github.com/uuidjs/uuid)

---

## 📂 Project Structure

```bash
/src
  ├── assets/      # Static assets (images, icons)
  ├── components/  # Reusable UI components (EventCard, EventForm, Calendar)
  ├── context/     # Auth & Event State Providers
  ├── data/        # Mock data and static configurations
  ├── pages/       # Core pages (Admin Dashboard, User Dashboard, Login)
  ├── utils/       # Helper functions and constants
  ├── App.jsx      # Main application routing and structure
  └── main.jsx     # Application entry point
```

---

## 🛠 Installation & Setup

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/event-management.git
   cd event-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔐 Access Credentials

The application uses role-based access control. You can log in using the following test credentials:

| Role  | Username | Password |
|-------|----------|----------|
| **Admin** | `admin`  | `admin`  |
| **User**  | *Any Name* | *Any Password* |

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ✨ Authors

- **Padmavathi** - *Initial Work* - [@padmavathi142004](https://github.com/padmavathi142004)

---

*Built with ❤️ for better event planning.*
