import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";


// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;



// Creates the playlists table
function Playlists() {

  
   // Setting variables and state
   const navigate = useNavigate();
   const [playlists, setPlaylists] = useState([]);
   const [playlistID, setPlaylistID] = useState("");
   const [playlistName, setPlaylistName] = useState("");
   const [userID, setUserID] = useState("");
   const [isPrivate, setIsPrivate] = useState("");

   // Function to retrieve playlists
   const loadPlaylists = async () => {
       const response = await fetch(`${API_ENDPOINT}/api/playlists`);
       const data = await response.json();
       
       setPlaylists(data);
   }

   // function to create a new playlist
   const createPlaylist = async () => {
       setIsPrivate(Number(isPrivate))
       const newPlaylist = {playlistName, userID, isPrivate}
       
       console.log(newPlaylist)

       const response = await fetch(`${API_ENDPOINT}/api/playlists`, {
           method: "POST",
           body: JSON.stringify(newPlaylist),
           headers: {
               "content-type": "application/json"
           }
       });

       if (response.status === 200) {
           alert(`Added new playlist: ${playlistName}`);
           loadPlaylists();
       } else {
           alert("New playlist not added. Check required fields");
       }
   }

   const deletePlaylist = async (playlist_id, playlist_name) => {
    console.log(playlist_id)
       const response = await fetch(`${API_ENDPOINT}/api/playlists/${playlist_id}`, {
           method: "DELETE"});

       if (response.status === 200){
           alert(`Deleted ${playlist_name}`);
           loadPlaylists();
       } else {
           alert("Playlist not deleted");
       }
   }

   const confirmDelete = (playlist_id, playlist_name) => {
    if (window.confirm(`Are you sure you want to delete ${playlist_name}?`)){
        deletePlaylist(playlist_id, playlist_name)
} 
   }

   const editPlaylist = (playlist) => {     
       // navigate to edit page, sending state props to the edit page/component 
       navigate("/editPlaylist", { state: { playlistToEdit: playlist }});
   }

   const viewPlaylist = async (playlist) => {
    // navigate to the playlist view page, sending state props for selected playlist
    navigate("/viewPlaylist", { state: { playlistToView: playlist }});
   }

   useEffect(() => {
       loadPlaylists();
   }, []);
  return (
    <div>
      <NavBar></NavBar>
      <h2>Playlists</h2>

      <form className="form-create">
        <h3 className="form-title">Create a new Playlist</h3>
        <label htmlFor="playlist-name">Playlist name: </label>
        <input 
          name="playlistName"
          type="text" 
          id="playlist-name" 
          className="form-create-input"
          onChange={e => setPlaylistName(e.target.value)} 
        />
        <label htmlFor="user-id">User ID: </label>
        <input
          name="userID"
          type="text"
          id="user-id"
          className="form-create-input"
          onChange={e => setUserID(e.target.value)}
        />
        <label htmlFor="is-private" className="form-label">Private Playlist?</label>
        <select 
          name="isPrivate" 
          id="is-private" 
          type="number"
          className="form-create-input"
          onChange={e => setIsPrivate(e.target.value)}
          >
          <option value="default">---</option>
          <option value={1} >Yes</option>
          <option value={0}>No</option>
        </select>
        <button 
          type="button"
          className="form-button add-button"
          onClick = {() => createPlaylist()}
        >Add</button>
      </form>

      <div className="table-container">

          <h3 className="form-create-title">User Playlists</h3>
          <table className="table playlist-table">
            <thead>
              <tr className="table-heading">
                <th>ID</th>
                <th>Playlist Name</th>
                <th>User ID</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist) => (
                <tr className="table-rows">
                  <td>{playlist.playlist_id}</td>
                  <td>{playlist.playlist_name}</td>
                  <td>{playlist.user_id}</td>
                  <td className="table-button">
                      <button
                          className="add-button"
                          onClick={() => viewPlaylist(playlist)}
                      >View</button>
                  </td>
                  <td className="table-button">
                      <button 
                          className="edit-button"
                          onClick={() => editPlaylist(playlist)}
                      >Edit</button>
                  </td>
                  <td className="table-button">
                      <button
                          className="delete-button"
                          onClick={() => confirmDelete(playlist.playlist_id, playlist.playlist_name)}
                      >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    </div>
  );
}

export default Playlists;


/**
 *       <h5>*Sample view of playlist 1</h5>
      <table className="table">
        <tr className="table-rows">
          <th>Song</th>
          <th>Artist</th>
        </tr>
        {playlistExampleData.map((song) => (
          <tr className="table-rows">
            <td>{song.song}</td>
            <td>{song.artist}</td>
          </tr>
        ))}
      </table>
 */