import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";


// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;


// Creates the artists table
function Artists() {

   // Setting variables and state
   const navigate = useNavigate();
   const [artists, setArtists] = useState([]);
   const [artistID, setArtistID] = useState("");
   const [artistName, setArtistName] = useState("");
   const [artistDescription, setArtistDescription] = useState("");

   // Function to retrieve artists
   const loadArtists = async () => {
       const response = await fetch(`${API_ENDPOINT}/api/artists`);
       const data = await response.json();
       setArtists(data);
   }

   // function to create a new artist
   const createArtist = async () => {
       const newArtist = {artistName, artistDescription}
       console.log(newArtist)

       const response = await fetch(`${API_ENDPOINT}/api/artists`, {
           method: "POST",
           body: JSON.stringify(newArtist),
           headers: {
               "content-type": "application/json"
           }
       });

       if (response.status === 200) {
           alert(`Added new artist ${artistName}`);
           loadArtists();
       } else {
           alert("New item not added. Check required fields");
       }
   }

   const deleteArtist = async (artist_id) => {
    console.log(artist_id)
       const response = await fetch(`${API_ENDPOINT}/api/artists/${artist_id}`, {
           method: "DELETE"});

       if (response.status === 200){
           alert(`Deleted artist `);
           loadArtists();
       } else {
           alert("Artist not deleted");
       }
   }

   const editArtist = (artist) => {     
       // navigate to edit page, sending state props to the edit page/component 
       navigate("/editArtist", { state: { artistToEdit: artist }});
   }

   useEffect(() => {
       loadArtists();
   }, []);
  return (
    <div>
      <NavBar></NavBar>
      <h2>Artists</h2>
      <table className="table">
        <thead>
          <tr className="table-rows">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
      {artists.map((artist) => (
        <tr className="table-rows" key={artist.id}>
          <td>{artist.artist_id}</td>
          <td>{artist.artist_name}</td>
          <td>{artist.artist_description}</td>
              <td className="table-button">
              <button 
                    onClick={() => editArtist(artist)}
                >Edit</button>
              </td>
              <td className="table-button">
                <button
                    onClick={() => deleteArtist(artist.artist_id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Search for an Artist</h4>
      <form action="" className="search-form">
      <Select
        id="artist-search"
        className="select"
        placeholder=""
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null
        }}
        openmenuonclick={false}
        isClearable
        isSearchable
      />
      <button className="search-button" onClick={""}>
        Search
      </button>
    </form>

      <h4 className="form-create-title">Add a new Artist</h4>
      <form className="form-create">
        <label for="artist-name">Name: </label>
        <input 
          name="artistName"
          type="text" 
          id="artist-name" 
          className="form-create-input" 
          onChange={e => setArtistName(e.target.value)}
        />
        <label for="artist-description">Description: </label>
        <input 
          name="artistDescription"
          type="text" 
          id="artist-description" 
          className="form-create-input" 
          onChange={e => setArtistDescription(e.target.value)}
        />
        <button type="button" onClick = {() => createArtist()}>Add</button>
      </form>
    </div>
  );
}

export default Artists;