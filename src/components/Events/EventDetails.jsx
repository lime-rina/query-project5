import { Link, Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, getEvent } from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-details", id],
    queryFn: () => getEvent(id),
  });

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate("/events");
    },
  });
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      <article id="event-details">
        {isLoading && <LoadingIndicator />}
        {isError && (
          <ErrorBlock
            title="Error"
            message={error?.info?.message || "Failed to fetch the event"}
          />
        )}
        {data && (
          <>
            <header>
              <h1>{data.title}</h1>
              <nav>
                <button onClick={() => mutate(id)}>Delete</button>
                <Link to="edit">Edit</Link>
              </nav>
            </header>
            <div id="event-details-content">
              <img
                src={`http://localhost:3000/${data.image}`}
                alt={data.image}
              />
              <div id="event-details-info">
                <div>
                  <p id="event-details-location">{data.location}</p>
                  <time dateTime={`Todo-DateT$Todo-Time`}>{data.time}</time>
                </div>
                <p id="event-details-description">{data.description}</p>
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
}
