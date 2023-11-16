import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import DeleteArtist from "./DeleteArtist";
import UpdateArtist from "./UpdateArtist";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Making the api call to retrieve all artists
const getArtists = async () => {
    const response = await axios.get(`${API_ENDPOINT}/api/artists`);
    return response.data;
};


const DisplayArtists = () => {

  // State varible used to show/hide artist update input fields
    const [updateWatcher, setUpdateWatcher] = useState(false);

  // Helper function for showing/hiding the artist update fields
    function updateHelper(val) {
        setUpdateWatcher(val);
    }

  // Used to display the input fields whenever the 'Edit' button is clicked
    const setUpdateTrue = () => {
        setUpdateWatcher(true)
    }

    // Artist data
    const { data: artists, error, isLoading } =  useQuery({queryKey: ["artistsData"], queryFn: getArtists});
    
    if (isLoading) return <div>Fetching artists...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
   
    
    return (
    <tbody>
      {artists.map((artist) => (
        <tr className="table-rows" key={artist.id}>
          <td>{artist.artist_id}</td>
          <td>{artist.artist_name}</td>
          <td>{artist.artist_description}</td>
          <td className="table-button">
            <button onClick={setUpdateTrue}>Edit</button>
          </td>
          <DeleteArtist />
        </tr>
      ))}

  {updateWatcher && <UpdateArtist updateHelper={updateHelper} /> }
      
    </tbody>
  );
};

export default DisplayArtists;
