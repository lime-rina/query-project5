import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateEvent, getEvent } from "../../utils/http.js";
import { useState } from "react";
import { queryClient } from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updatedData, setUpdatedData] = useState();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-details", id],
    queryFn: () => getEvent(id),
  });

  const { mutate } = useMutation({
    mutationFn: () => updateEvent(id, updatedData),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["event-details", id],
        exact: true,
        refetchType: "active",
      });
    },
  });
  function handleSubmit(formData) {
    setUpdatedData(formData);
    mutate(id, updatedData);
  }

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      {isLoading && <LoadingIndicator />}
      {data && (
        <EventForm inputData={data} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      )}
    </Modal>
  );
}
