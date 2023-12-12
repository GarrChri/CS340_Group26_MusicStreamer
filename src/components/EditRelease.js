/* EditRelease.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditRelease() {
    // Location allows us to access state props from a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const releaseToEdit = location.state.releaseToEdit;
    const artistMap = location.state.artistMap;
    const releaseTypeMap = location.state.releaseTypeMap;

    // Setting variables and state
    const [releaseID, setReleaseID] = useState(releaseToEdit.release_id);
    const [artistID, setArtistID] = useState(releaseToEdit.artist_id);
    const [releaseName, setReleaseName] = useState(releaseToEdit.release_name);
    const [releaseTypeID, setReleaseTypeID] = useState(
        releaseToEdit.release_type_id
    );

    // Create new release object from state vars
    const updateRelease = async () => {
        const updatedRelease = {
            releaseID,
            releaseName,
            artistID,
            releaseTypeID,
        };

        const response = await fetch(`${API_ENDPOINT}/api/releases`, {
            method: "PUT",
            body: JSON.stringify(updatedRelease),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Updated release to ${releaseName}`);
            navigate("/releases");
        } else {
            alert("Release not updated");
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>
            <div className="form-edit-container">
                <form className="form-edit" action="">
                    <h4 className="form-title">
                        Editing {releaseToEdit.release_name}
                    </h4>
                    <label for="releaseName">Release Name:</label>
                    <input
                        type="text"
                        name="releaseName"
                        value={releaseName}
                        onChange={(e) => setReleaseName(e.target.value)}
                    ></input>
                    <label for="releaseArtist">Artist: </label>
                    <Select
                        id="releaseArtist"
                        className="select"
                        options={artistMap}
                        onChange={(selected) => setArtistID(selected.value)}
                    />

                    <label for="release-type-id">Release Type: </label>
                    <Select
                        name="releaseTypeID"
                        id="release-type-id"
                        className="select"
                        options={releaseTypeMap}
                        onChange={(selected) =>
                            setReleaseTypeID(selected.value)
                        }
                    />
                </form>
                <div className="edit-button-container">
                    <button
                        type="button"
                        className="delete-button form-edit-button"
                        onClick={() => navigate("../releases")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="add-button form-edit-button"
                        onClick={() => updateRelease()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditRelease;
