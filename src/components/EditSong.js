import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditSong() {
    // Location allows us to access state props from a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();

    // Setting variables and state
    const songToEdit = location.state.songToEdit;
    const releaseMap = location.state.releaseMap;
    const genreMap = location.state.genreMap;

    const [songName, setSongName] = useState(songToEdit.song_name);
    const [songID, setSongID] = useState(songToEdit.song_id);
    const [releaseID, setReleaseID] = useState(songToEdit.release_id);
    const [genreID, setGenreID] = useState(songToEdit.genre_id);
    const streamCount = songToEdit.stream_count;

    // Create new song object from state vars
    const updateSong = async () => {
        const updatedSong = {
            songID,
            songName,
            releaseID,
            genreID,
            streamCount,
        };

        const response = await fetch(`${API_ENDPOINT}/api/songs`, {
            method: "PUT",
            body: JSON.stringify(updatedSong),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Updated song to ${songName}`);
            navigate("/songs");
        } else {
            alert("Song not updated");
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit a Song</h2>
            <div className="form-edit-container">
                <form className="form-edit" action="">
                    <h4 className="form-title">
                        Editing "{songToEdit.song_name}"
                    </h4>
                    <label for="songName">Edit Song Name:</label>
                    <input
                        type="text"
                        name="songName"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
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
                </form>
                <div className="edit-button-container">
                    <button
                        type="button"
                        className="delete-button form-edit-button"
                        onClick={() => navigate("../songs")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="add-button form-edit-button"
                        onClick={() => updateSong()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditSong;
