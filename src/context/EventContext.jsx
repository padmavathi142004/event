import { createContext, useContext, useState, useEffect } from "react";
import { EVENTS } from "../data/event.js";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Load events from localStorage or default EVENTS
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : EVENTS;
  });

  // Persist events to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // ---------------- CRUD ----------------
  const addEvent = (event) => setEvents([...events, event]);
  const editEvent = (id, updatedEvent) =>
    setEvents(events.map((e) => (e.id === id ? updatedEvent : e)));
  const deleteEvent = (id) =>
    setEvents(events.filter((e) => e.id !== id));

  // ------------- User Registration -------------
  const registerForEvent = (eventId, userId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registeredUsers: event.registeredUsers
                ? [...new Set([...event.registeredUsers, userId])]
                : [userId],
            }
          : event
      )
    );
  };

  const unregisterFromEvent = (eventId, userId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registeredUsers: event.registeredUsers?.filter(
                (id) => id !== userId
              ),
            }
          : event
      )
    );
  };

  // ------------- Favorites / Wishlist -------------
  const toggleFavorite = (eventId, userId) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          const isFav = event.favorites?.includes(userId);
          return {
            ...event,
            favorites: isFav
              ? event.favorites.filter((id) => id !== userId)
              : [...(event.favorites || []), userId],
          };
        }
        return event;
      })
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        registerForEvent,
        unregisterFromEvent,
        toggleFavorite,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
