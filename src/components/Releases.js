import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";


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

   // Function to retrieve releases
   const loadReleases = async () => {
       const response = await fetch(`${API_ENDPOINT}/api/releases`);
       const data = await response.json();
       setReleases(data);
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
   }, []);
  return (
    <div>
      <NavBar></NavBar>
      <h2>Releases</h2>
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
              <td>{release.artist_id}</td>
              <td>{release.release_name}</td>
              <td>{release.release_type_id}</td>
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

      <h4 className="form-create-title">Add a new Release</h4>
      <form className="form-create">
        <label for="artist-id">Artist ID: </label>
        <input 
          name="artistID"
          type="text" 
          id="artist-id" 
          className="form-create-input" 
          onChange={e => setArtistID(e.target.value)}
        />
        <label for="release-name">Release Name: </label>
        <input 
          name="releaseName"
          type="text" 
          id="release-name" 
          className="form-create-input" 
          onChange={e => setReleaseName(e.target.value)}
        />
        <label for="release-type-id">Release Type ID: </label>
        <input 
          name="releaseTypeID"
          type="text" 
          id="release-type-id" 
          className="form-create-input" 
          onChange={e => setReleaseTypeID(e.target.value)}
        />
        <button type="button" onClick = {() => createRelease()}>Add</button>
      </form>
    </div>
  );
}

export default Releases;