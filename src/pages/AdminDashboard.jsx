import { useState } from "react";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import "../App.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { events, deleteEvent } = useEvents();
  const [editingEvent, setEditingEvent] = useState(null);

  // Analytics
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.date >= new Date().toISOString().split("T")[0]).length;
  const pastEvents = totalEvents - upcomingEvents;
  const mostRegisteredEvents = [...events]
    .sort((a,b) => (b.registeredUsers?.length||0) - (a.registeredUsers?.length||0))
    .slice(0,5);

  const data = {
    labels: mostRegisteredEvents.map(e => e.title),
    datasets: [{
      label: 'Registered Users',
      data: mostRegisteredEvents.map(e => e.registeredUsers?.length || 0),
      backgroundColor: [
        'rgba(79,70,229,0.8)',
        'rgba(34,211,238,0.8)',
        'rgba(250,204,21,0.8)',
        'rgba(239,68,68,0.8)',
        'rgba(34,197,94,0.8)'
      ],
      borderRadius: 6
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top Registered Events',
        color: '#ffffff',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white', stepSize: 1 }, beginAtZero: true }
    }
  };

  return (
    <div className="admin-dashboard-bg">
      <div className="dashboard-container">

        {/* HEADER */}
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="header-right">
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        </header>

        {/* ANALYTICS */}
        <section className="dashboard-card analytics-card">
          <h2 className="section-title">Analytics & Statistics 📊</h2>

          <div className="analytics-counts">
            <div className="count-card">
              <h3>Total Events</h3>
              <p>{totalEvents}</p>
            </div>
            <div className="count-card">
              <h3>Upcoming Events</h3>
              <p>{upcomingEvents}</p>
            </div>
            <div className="count-card">
              <h3>Past Events</h3>
              <p>{pastEvents}</p>
            </div>
          </div>

          <div className="analytics-graph">
            <Bar data={data} options={options} height={250} />
          </div>
        </section>

        {/* CREATE EVENT */}
        <section className="dashboard-card">
          <h2 className="section-title">Create Event</h2>
          <EventForm editingEvent={editingEvent} setEditingEvent={setEditingEvent} />
        </section>

        {/* EVENT LIST */}
        <section className="dashboard-card">
          <h2 className="section-title">All Events</h2>
          {events.length === 0 && <p className="empty-text">No events available.</p>}
          <div className="event-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => setEditingEvent(event)}
                onDelete={() => deleteEvent(event.id)}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
