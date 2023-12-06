import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";
import { isClickableInput } from "@testing-library/user-event/dist/utils";


// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;


// Creates the releases table
function Releases() {

   // Setting variables and state
   const navigate = useNavigate();
   const [releases, setReleases] = useState([]);
   const [releaseName, setReleaseName] = useState("");
   const [artistID, setArtistID] = useState("");
   const [releaseTypeID, setReleaseTypeID] = useState("");
   const [artistMap, setArtistMap] = useState([]);
   const [releaseTypeMap, setReleaseTypeMap] = useState([]);

   // Function to retrieve releases
   const loadReleases = async () => {
       const response = await fetch(`${API_ENDPOINT}/api/releases`);
       const data = await response.json();
       setReleases(data);
   }

   // function to retrieve artists, set map (for new Release form rendering)
   const loadArtists = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/artists`);
    const data = await response.json();
    setArtistMap(data.map((artist) => (
      {value: artist.artist_id, label: artist.artist_name}    
    )));
   }

   // function to retrieve release types, set map (for Select form element)
   const loadReleaseTypes = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/releaseTypes`);
    const data = await response.json();
    setReleaseTypeMap(data.map((releaseType) => (
      {value: releaseType.release_type_id, label: releaseType.release_type_name}    
    )));
   }

   // function to create a new release
   const createRelease = async () => {
       const newRelease = {releaseName, artistID, releaseTypeID}
       console.log(newRelease)

       const response = await fetch(`${API_ENDPOINT}/api/releases`, {
           method: "POST",
           body: JSON.stringify(newRelease),
           headers: {
               "content-type": "application/json"
           }
       });

       if (response.status === 200) {
           alert(`Added new release: ${releaseName}`);
           loadReleases();
       } else {
           alert("New item not added. Check required fields");
       }
   }

   const deleteRelease = async (release_id, release_name) => {
    console.log(release_id)
       const response = await fetch(`${API_ENDPOINT}/api/releases/${release_id}`, {
           method: "DELETE"});

       if (response.status === 200){
           alert(`Deleted ${release_name}`);
           loadReleases();
       } else {
           alert("Release not deleted");
       }
   }

   function confirmDelete (release_id, release_name) {
    if (window.confirm(`Are you sure you want to delete ${release_name}?`)){
        deleteRelease(release_id, release_name)
} 
   }

   const editRelease = (release) => {     
       // navigate to edit page, sending state props to the edit page/component 
       navigate("/editRelease", { state: { releaseToEdit: release }});
   }

   useEffect(() => {
       loadReleases();
       loadArtists();
       loadReleaseTypes();
   }, []);
  return (
    <div>
      <NavBar></NavBar>
      <h2>Releases</h2>

      <h4 className="form-create-title">Add a new Release</h4>
      
      <form className="form-create">
        <label for="release-name">Release Name: </label>
        <input 
          name="releaseName"
          type="text" 
          id="release-name" 
          className="form-create-input" 
          onChange={e => setReleaseName(e.target.value)}
        />
        <label>Artist: </label>
        <Select 
          id="releaseArtist"
          className="select"
          options={artistMap}
          onChange={(selected) => setArtistID(selected.value)}
        />
        
        <label for="release-type-id">Release Type ID: </label>
        <Select
          name="releaseTypeID"
          id="release-type-id" 
          className="select"
          options={releaseTypeMap}
          onChange={(selected) => setReleaseTypeID(selected.value)}
        />
        <button type="button" onClick = {() => createRelease()}>Add</button>
      </form>

      <table className="table">
        <thead>
          <tr className="table-rows">
            <th>ID</th>
            <th>Artist</th>
            <th>Release Name</th>
            <th>Release Type</th>
          </tr>
        </thead>
        <tbody>
          {releases.map((release) => (
            <tr className="table-rows">
              <td>{release.release_id}</td>
              <td>{release.artist_name}</td>
              <td>{release.release_name}</td>
              <td>{release.release_type_name}</td>
              <td className="table-button">
                <button 
                    onClick={() => editRelease(release)}
                >Edit</button>
              </td>
              <td className="table-button">
                <button
                    onClick={() => confirmDelete(release.release_id, release.release_name)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Releases;