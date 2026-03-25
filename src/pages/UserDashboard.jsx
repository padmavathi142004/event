import { useState } from "react";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/EventCard";
import { EVENT_CATEGORIES } from "../data/categories";
import "../App.css";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const { events } = useEvents();
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("upcoming");
  const [showFavorites, setShowFavorites] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const filteredEvents = events
    .filter((event) => (filterCategory ? event.category === filterCategory : true))
    .filter((event) =>
      filterStatus === "upcoming" ? event.date >= today : event.date < today
    );

  const favoriteEvents = events.filter((event) =>
    event.favorites?.includes(user.id)
  );

  return (
    <div className="user-dashboard-bg">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>User Dashboard</h1>
          <div className="header-right">
            <span>Hello, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        </header>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <button
            className={`btn-edit ${!showFavorites ? "bg-blue-500" : "bg-gray-400"}`}
            onClick={() => setShowFavorites(false)}
          >
            All Events
          </button>
          <button
            className={`btn-edit ${showFavorites ? "bg-blue-500" : "bg-gray-400"}`}
            onClick={() => setShowFavorites(true)}
          >
            Favorites ❤️
          </button>
        </div>

        {/* Filters only for All Events */}
        {!showFavorites && (
          <div className="filter-bar">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setFilterCategory("");
                setFilterStatus("upcoming");
              }}
              className="bg-gray-400"
            >
              Reset
            </button>
          </div>
        )}

        {/* Event Grid */}
        {((showFavorites && favoriteEvents.length === 0) ||
          (!showFavorites && filteredEvents.length === 0)) && (
          <p className="empty-text">
            {showFavorites ? "No favorite events." : "No events found."}
          </p>
        )}

        <div className="event-grid">
          {(showFavorites ? favoriteEvents : filteredEvents).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
