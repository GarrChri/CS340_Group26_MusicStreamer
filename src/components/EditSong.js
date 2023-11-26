import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditSong () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const songToEdit = location.state.songToEdit;

    const [songName, setSongName] = useState(songToEdit.song_name);
    const [songID, setSongID] = useState(songToEdit.song_id);
    const [releaseID, setReleaseID] = useState(songToEdit.release_id);
    const [genreID, setGenreID] = useState(songToEdit.genre_id);
    const streamCount = songToEdit.stream_count

    const updateSong = async () => {
        // create new release type object from state vars
        const updatedSong = {songID, songName, releaseID, genreID, streamCount};
        console.log(updatedSong)

        const response = await fetch(`${API_ENDPOINT}/api/songs`,{
            method: "PUT",
            body: JSON.stringify(updatedSong),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated song to ${songName}`);
            navigate("/songs");
        } else {
            alert("Song not updated");
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>
            
            <h4 className="form-create-title">Editing {songToEdit.song_name}</h4>
            <form className="form-create" action="">
                <input 
                    type="text"
                    name="songName"
                    value={songName}
                    onChange={e => setSongName(e.target.value)}
                    ></input>
                <input 
                    type="text"
                    name="releaseID"
                    value={releaseID}
                    onChange={e => setReleaseID(e.target.value)}
                    ></input>
                <input 
                    type="text"
                    name="genreID"
                    value={genreID}
                    onChange={e => setGenreID(e.target.value)}
                    ></input>
                <button type="button" onClick = {() => updateSong()}>Submit</button>
            </form>
        </div>
    );
}

export default EditSong;