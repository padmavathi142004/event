import { useState, useEffect } from "react";
import { useEvents } from "../context/EventContext";
import { v4 as uuidv4 } from "uuid";
import { EVENT_CATEGORIES } from "../data/categories";

export default function EventForm({ editingEvent, setEditingEvent }) {
  const { addEvent, editEvent } = useEvents();
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    description: "",
  });

 useEffect(() => {
  if (editingEvent) {
    setForm({
      title: editingEvent.title || "",
      date: editingEvent.date || "",
      location: editingEvent.location || "",
      category: editingEvent.category || "",
      description: editingEvent.description || "",
    });
  } else {
    setForm({
      title: "",
      date: "",
      location: "",
      category: "",
      description: "",
    });
  }
}, [editingEvent]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      editEvent(editingEvent.id, form);
      setEditingEvent(null);
    } else {
      addEvent({ ...form, id: uuidv4() });
    }
    setForm({ title: "", date: "", location: "", category: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>{editingEvent ? "Edit Event" : "Add New Event"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        {EVENT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">{editingEvent ? "Update Event" : "Add Event"}</button>
        {editingEvent && (
          <button type="button" onClick={() => setEditingEvent(null)} style={{ background: "gray" }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
