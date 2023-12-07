import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditPlaylist () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const playlistToEdit = location.state.playlistToEdit;

    
    const [playlistID, setPlaylistID] = useState(playlistToEdit.playlist_id);
    const [playlistName, setPlaylistName] = useState(playlistToEdit.playlist_name);
    const [userID, setUserID] = useState(playlistToEdit.user_id);
    const [isPrivate, setIsPrivate] = useState(playlistToEdit.id_private);
    
    const updatePlaylist = async () => {
        // create new playlist object from state vars
        const updatedPlaylist = {playlistID, playlistName, userID, isPrivate};
        
        console.log(updatedPlaylist)
        const response = await fetch(`${API_ENDPOINT}/api/playlists`,{
            method: "PUT",
            body: JSON.stringify(updatedPlaylist),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated playlist to ${playlistName}`);
            navigate("/playlists");
        } else {
            alert("Playlist not updated");
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>

            <h4 className="form-create-title">Editing {playlistToEdit.playlist_name}</h4>
            <form className="form-create" action="">
                <input 
                    type="text"
                    name="playlistName"
                    value={playlistName}
                    onChange={e => setPlaylistName(e.target.value)}
                    ></input>
                <input 
                    type="text"
                    name="userID"
                    value={userID}
                    onChange={e => setUserID(e.target.value)}
                    ></input>
                <select 
                    type="number"
                    name="isPrivate" 
                    value={isPrivate}
                    onChange={e => setIsPrivate(e.target.value)}
                    >
                    <option value="default">---</option>
                    <option value={1} >Yes</option>
                    <option value={0}>No</option>
                    </select>
                <button type="button" onClick = {() => updatePlaylist()}>Submit</button>
            </form>
        </div>
    );
}

export default EditPlaylist;