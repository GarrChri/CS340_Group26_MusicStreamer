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

   const deletePlaylist = async (playlist_id) => {
    console.log(playlist_id)
       const response = await fetch(`${API_ENDPOINT}/api/playlists/${playlist_id}`, {
           method: "DELETE"});

       if (response.status === 200){
           alert(`Deleted playlist `);
           loadPlaylists();
       } else {
           alert("Playlist not deleted");
       }
   }

   const editPlaylist = (playlist) => {     
       // navigate to edit page, sending state props to the edit page/component 
       navigate("/editPlaylist", { state: { playlistToEdit: playlist }});
   }

   useEffect(() => {
       loadPlaylists();
   }, []);
  return (
    <div>
      <NavBar></NavBar>
      <h2>Playlists</h2>
      <table className="table playlist-table">
        <thead>
          <tr className="table-rows">
            <th>ID</th>
            <th>Playlist Name</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist) => (
            <tr className="table-rows">
              <td>{playlist.playlist_id}</td>
              <td>{playlist.playlist_name}</td>
              <td>{playlist.user_id}</td>
              <td className="table-button">
                <button>View</button>
              </td>
              <td className="table-button">
                <button 
                    onClick={() => editPlaylist(playlist)}
                >Edit</button>
              </td>
              <td className="table-button">
                <button
                    onClick={() => deletePlaylist(playlist.playlist_id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="form-create-title">Create a new Playlist</h4>
      <form className="form-create">
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
        <button type="button" onClick = {() => createPlaylist()}>Add</button>
      </form>


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