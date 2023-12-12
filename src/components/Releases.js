/* Releases.js

Citation Information
This file contains all original code written by the app's developers.
*/

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
    };

    // Function to retrieve artists, set map (for new Release form rendering)
    const loadArtists = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/artists`);
        const data = await response.json();
        setArtistMap(
            data.map((artist) => ({
                value: artist.artist_id,
                label: artist.artist_name,
            }))
        );
    };

    // Function to retrieve release types, set map (for Select form element)
    const loadReleaseTypes = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/releaseTypes`);
        const data = await response.json();
        setReleaseTypeMap(
            data.map((releaseType) => ({
                value: releaseType.release_type_id,
                label: releaseType.release_type_name,
            }))
        );
    };

    // Function to create a new release
    const createRelease = async () => {
        const newRelease = { releaseName, artistID, releaseTypeID };
        console.log(newRelease);

        const response = await fetch(`${API_ENDPOINT}/api/releases`, {
            method: "POST",
            body: JSON.stringify(newRelease),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Added new release: ${releaseName}`);
            loadReleases();
        } else {
            alert("New item not added. Check required fields");
        }
    };

    // Function to delete a release
    const deleteRelease = async (release_id, release_name) => {
        console.log(release_id);
        const response = await fetch(
            `${API_ENDPOINT}/api/releases/${release_id}`,
            {
                method: "DELETE",
            }
        );

        if (response.status === 200) {
            alert(`Deleted ${release_name}`);
            loadReleases();
        } else {
            alert("Release not deleted");
        }
    };

    // Alert the user to verify correct entry is being deleted
    const confirmDelete = (release_id, release_name) => {
        if (
            window.confirm(`Are you sure you want to delete ${release_name}?`)
        ) {
            deleteRelease(release_id, release_name);
        }
    };

    // Navigate to edit page, sending state props to the edit page/component
    const editRelease = (release) => {
        navigate("/editRelease", {
            state: {
                releaseToEdit: release,
                artistMap: artistMap,
                releaseTypeMap: releaseTypeMap,
            },
        });
    };

    // Refreshes the releases table when data changes
    useEffect(() => {
        loadReleases();
        loadArtists();
        loadReleaseTypes();
    }, []);
    return (
        <div>
            <NavBar></NavBar>
            <h2>Releases</h2>
            <form className="form-create">
                <h3 className="form-title">Add a new Release</h3>
                <label for="release-name">Release Name: </label>
                <input
                    name="releaseName"
                    type="text"
                    id="release-name"
                    className="form-create-input"
                    onChange={(e) => setReleaseName(e.target.value)}
                />
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
                    onChange={(selected) => setReleaseTypeID(selected.value)}
                />
                <button
                    type="button"
                    className="form-button add-button"
                    onClick={() => createRelease()}
                >
                    Add
                </button>
            </form>

            <div className="table-container">
                <h3 className="table-title">Artist Releases</h3>
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>ID</th>
                            <th>Artist</th>
                            <th>Release Name</th>
                            <th>Release Type</th>
                            <th></th>
                            <th></th>
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
                                        className="edit-button"
                                        onClick={() => editRelease(release)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            confirmDelete(
                                                release.release_id,
                                                release.release_name
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Releases;
