/* EditArtist.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditArtist() {
    // Location allows us to access state props from a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();

    // Setting variables and state
    const artistToEdit = location.state.artistToEdit;
    const [artistID, setArtistID] = useState(artistToEdit.artist_id);
    const [artistName, setArtistName] = useState(artistToEdit.artist_name);
    const [artistDescription, setArtistDescription] = useState(
        artistToEdit.artist_description
    );

    // Create new artist object from state vars
    const updateArtist = async () => {
        const updatedArtist = { artistID, artistName, artistDescription };

        const response = await fetch(`${API_ENDPOINT}/api/artists`, {
            method: "PUT",
            body: JSON.stringify(updatedArtist),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Updated artist ${artistName}`);
            navigate("/artists");
        } else {
            alert("Artist not updated");
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit an Artist</h2>
            <div className="form-edit-container">
                <form className="form-edit" action="">
                    <h4 className="form-title">
                        Editing {artistToEdit.artist_name}
                    </h4>
                    <label for="artistName">Artist Name:</label>
                    <input
                        type="text"
                        name="artistName"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    ></input>
                    <label for="artistDescription">Description:</label>
                    <textarea
                        rows="8"
                        cols="30"
                        name="artistDescription"
                        value={artistDescription}
                        onChange={(e) => setArtistDescription(e.target.value)}
                    ></textarea>
                </form>
                <div className="edit-button-container">
                    <button
                        type="button"
                        className="delete-button form-edit-button"
                        onClick={() =>
                            navigate("../artistPage", {
                                state: { artistID: artistID },
                            })
                        }
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="add-button form-edit-button"
                        onClick={() => updateArtist()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditArtist;
