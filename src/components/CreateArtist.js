import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const CreateArtist = (updateHelper) => {
  const api_url = "/api/artists";

  // State variables to handle data changes
  const [artistName, setArtistName] = useState("");
  const [artistDescription, setDescription] = useState("");

  // Sending a post request to the api with the new artist object
  const mutation = useMutation({
    mutationFn: (newArtist) => (axios.post(api_url, newArtist))
  });

  // Creating the new artist object from input values
  const submitData = () => {
    mutation.mutate({ artistName, artistDescription });
  
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post submitted!</span>;
  }

  // Creating a form with 2 input fields + button for submitting new artist data
  return (
    <div>
      <form className="form-create">
        <label htmlFor="artist-name">Artist Name: </label>
        <input
          type="text"
          id="artist-name"
          className="form-create-input"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <label htmlFor="artist-description">Description: </label>
        <input
          type="text"
          id="artist-description"
          className="form-create-input"
          value={artistDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={submitData}>Submit</button>
      </form>
    </div>
  );
};
export default CreateArtist;