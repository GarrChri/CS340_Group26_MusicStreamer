/* Artists.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Creates the artists table
function Artists() {
    // Setting variables and state
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);
    const [artistID, setArtistID] = useState("");
    const [artistName, setArtistName] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [artistMap, setArtistMap] = useState([]);

    // Function to retrieve artists
    const loadArtists = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/artists`);
        const data = await response.json();
        setArtists(data);
        setArtistMap(
            data.map((artist) => ({
                value: artist.artist_id,
                label: artist.artist_name,
            }))
        );
    };

    // Function to create a new artist
    const createArtist = async () => {
        const newArtist = { artistName, artistDescription };

        const response = await fetch(`${API_ENDPOINT}/api/artists`, {
            method: "POST",
            body: JSON.stringify(newArtist),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Added new artist ${artistName}`);
            loadArtists();
        } else {
            alert("New item not added. Check required fields");
        }
    };

    // Function to delete an artist
    const deleteArtist = async (artist_id, artist_name) => {
        const response = await fetch(
            `${API_ENDPOINT}/api/artists/${artist_id}`,
            {
                method: "DELETE",
            }
        );

        if (response.status === 200) {
            alert(`Deleted ${artist_name}`);
            loadArtists();
        } else {
            alert("Artist not deleted");
        }
    };

    // Alert the user to verify correct entry is being deleted
    const confirmDelete = (artist_id, artist_name) => {
        if (window.confirm(`Are you sure you want to delete ${artist_name}?`)) {
            deleteArtist(artist_id, artist_name);
        }
    };

    // Navigate to the artist edit page, sending state props to the edit page/component
    const editArtist = (artist) => {
        navigate("/editArtist", { state: { artistToEdit: artist } });
    };

    // Event handler for searching for an artists,
    // Takes user to artist page
    const handleSearch = (e) => {
        e.preventDefault();
        if (!artistID) {
            alert("Please select an artist from the dropdown");
        } else {
            navigate("/artistPage", { state: { artistID: artistID } });
        }
    };

    // Refreshes the artists table when data changes
    useEffect(() => {
        loadArtists();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <h2>Artists</h2>
            <div className="search-container">
                <h3>Search for an Artist</h3>
                <form action="" className="search-form">
                    <Select
                        id="artist-search"
                        className="select"
                        placeholder=""
                        components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                        }}
                        options={artistMap}
                        onChange={(selected) => setArtistID(selected.value)}
                        openmenuonclick={false}
                        isClearable
                        isSearchable
                    />
                    <button
                        className="search-button edit-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </form>
            </div>

            <form className="form-create">
                <h3 className="form-title">Add a new Artist</h3>
                <label for="artist-name">Name: </label>
                <input
                    name="artistName"
                    type="text"
                    id="artist-name"
                    className="form-create-input"
                    onChange={(e) => setArtistName(e.target.value)}
                />
                <label for="artist-description">Description: </label>
                <input
                    name="artistDescription"
                    type="text"
                    id="artist-description"
                    className="form-create-input"
                    onChange={(e) => setArtistDescription(e.target.value)}
                />
                <button
                    type="button"
                    className="form-button add-button"
                    onClick={() => createArtist()}
                >
                    Add
                </button>
            </form>

            <div className="table-container">
                <h3 className="table-title">Artist List</h3>
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map((artist) => (
                            <tr className="table-rows" key={artist.id}>
                                <td>{artist.artist_id}</td>
                                <td>{artist.artist_name}</td>
                                <td>{artist.artist_description}</td>
                                <td className="table-button">
                                    <button
                                        className="edit-button"
                                        onClick={() => editArtist(artist)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            confirmDelete(
                                                artist.artist_id,
                                                artist.artist_name
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

export default Artists;
