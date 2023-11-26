import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const DeleteArtist = () => {

  // Sending delete request to the api
  const mutation = useMutation((id) => {
    return axios.delete(`/api/artists/${id}`);
  });

  // Deleting artist
  const handleDelete = () => {
    mutation.mutate();
  };

  if (mutation.isLoading) {
    return <span>Deleting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Artist deleted!</span>;
  }

  return (
    <td className="table-button">
      <button onClick={handleDelete}>Delete</button>
    </td>
  );
};

export default DeleteArtist;