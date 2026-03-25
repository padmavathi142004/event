import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

export default function EventCard({ event, onEdit, onDelete }) {
  const { user } = useAuth();
  const { registerForEvent, unregisterFromEvent, toggleFavorite } = useEvents();

  const isRegistered = event.registeredUsers?.includes(user?.id);
  const isFavorite = event.favorites?.includes(user?.id);

  return (
    <div className="card">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-text"><strong>Date:</strong> {event.date}</p>
      <p className="event-text"><strong>Location:</strong> {event.location}</p>
      {event.category && <p className="event-text"><strong>Category:</strong> {event.category}</p>}
      {event.description && <p className="event-description">{event.description}</p>}

      {user?.role === "user" && (
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            className="btn-edit"
            onClick={() => {
              isRegistered
                ? unregisterFromEvent(event.id, user.id)
                : registerForEvent(event.id, user.id);
            }}
          >
            {isRegistered ? "Unregister" : "Register"}
          </button>

          <button
            className="btn-edit"
            style={{ background: isFavorite ? "red" : "#22d3ee" }}
            onClick={() => toggleFavorite(event.id, user.id)}
          >
            {isFavorite ? "❤️" : "🤍"} Favorite
          </button>
        </div>
      )}

      {user?.role === "admin" && (
        <p className="event-text">
          <strong>Registered Users:</strong> {event.registeredUsers?.length || 0}
        </p>
      )}

      {(onEdit || onDelete) && (
        <div className="event-actions">
          {onEdit && <button className="btn-edit" onClick={onEdit}>Edit</button>}
          {onDelete && <button className="btn-delete" onClick={onDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
}
