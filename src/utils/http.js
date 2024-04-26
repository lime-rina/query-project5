import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export async function fetchEvents({ signal, searchTerm }) {
  try {
    const url = searchTerm ? `${"?search=" + searchTerm}` : "";
    const response = await fetch("http://localhost:3000/events" + url, {
      signal: signal,
    });

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the events");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
  } catch (error) {
    console.error(error);
  }
}

export async function addEvent(eventData) {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchImages({ signal }) {
  const response = await fetch("http://localhost:3000/events/images", {
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function getEvent(id) {
  const response = await fetch("http://localhost:3000/events/" + id);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent(id) {
  const response = await fetch("http://localhost:3000/events/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function updateEvent(id, eventData) {
  const response = await fetch("http://localhost:3000/events/" + id, {
    method: "PUT",
    body: JSON.stringify({ event: eventData }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}
