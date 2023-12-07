import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditSong () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const songToEdit = location.state.songToEdit;
    const releaseMap = location.state.releaseMap;
    const genreMap = location.state.genreMap;

    const [songName, setSongName] = useState(songToEdit.song_name);
    const [songID, setSongID] = useState(songToEdit.song_id);
    const [releaseID, setReleaseID] = useState(songToEdit.release_id);
    const [genreID, setGenreID] = useState(songToEdit.genre_id);
    const streamCount = songToEdit.stream_count

    const updateSong = async () => {
        // create new song object from state vars
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
            <h2>Edit Song</h2>
            <h4 className="form-create-title">Editing "{songToEdit.song_name}"</h4>
            <form className="form-create" action="">
                <label for="songName">Edit Song Name:</label>
                <input 
                    type="text"
                    name="songName"
                    value={songName}
                    onChange={e => setSongName(e.target.value)}
                    ></input>
                <label for="releaseID">Select Release:</label>
                <Select 
                    options={releaseMap}
                    onChange={(selected) => setReleaseID(selected.value)}
                    name="releaseID"
                    id="release-id" 
                />
                <label for="genreID">Select Genre:</label>
                <Select 
                    options={genreMap}
                    onChange={(selected) => setGenreID(selected.value)}
                    name="genreID"
                    id="genreID" 
                />
                <button type="button" onClick = {() => updateSong()}>Submit</button>
                <button type="button" onClick = {
                    () => navigate("../songs")
                    }>Cancel</button>
            </form>
        </div>
    );
}

export default EditSong;