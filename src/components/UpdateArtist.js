import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api_url = "http://localhost:2626/api/artists";

function UpdateArtist(updateHelper) {

  // State variables to handle data changes
  const [artistName, setArtistName] = useState("");
  const [artistDescription, setArtistDescription] = useState("");


  // Handling the changed data and sending updates to the api
  const mutation = useMutation({mutationFn: (updatedArtist) =>
    axios.put(api_url, updatedArtist)}
  );

  // New data to be sent with the put request
  const submitData = () => {
    mutation.mutate({ artistName, artistDescription });
    updateHelper(false);
  };

  if (mutation.isLoading) {
    return <span>Updating...</span>;
  }

  if (mutation.isError) {
   // return <span>Error: {mutation.error.message}</span>;
   return <span>{[artistName, artistDescription]}</span>
  }

  if (mutation.isSuccess) {
      return <span>Artist updated!</span>;
  }

  return (
      <tr>
        <td></td>
        <td>
            <input
                className="form-update-artist"
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Name"
                />
        </td>
        <td>
            <input
                className="form-update-artist"
                type="text"
                value={artistDescription}
                onChange={(e) => setArtistDescription(e.target.value)}
                placeholder="Description"
                />
        </td>
        <td>
              <button className="form-update-artist" onClick={submitData}>Update</button>
        </td>
        </tr>
  );
};

export default UpdateArtist;