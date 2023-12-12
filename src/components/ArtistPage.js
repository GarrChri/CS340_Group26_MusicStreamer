import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Creates the artists table
function ArtistPage() {
    // Setting variables and state
    const navigate = useNavigate();
    const location = useLocation();
    const artistID = location.state.artistID;
    const [artist, setArtist] = useState();
    const [releases, setReleases] = useState();

    // Function to fetch artist by id
    const loadArtist = async () => {
        const response = await fetch(
            `${API_ENDPOINT}/api/artists?artistID=${artistID}`
        );
        const data = await response.json();
        setArtist(data[0]);
    };

    // Function to fetch releases by artist id
    const loadReleases = async () => {
        const response = await fetch(
            `${API_ENDPOINT}/api/releases?artistID=${artistID}`
        );
        const data = await response.json();
        setReleases(data);
    };

    // Navigate to the edit page, sending state props to the edit page/component
    const editArtist = (artist) => {
        navigate("/editArtist", { state: { artistToEdit: artist } });
    };

    // Function to return to the artists page
    const navigateBack = () => {
        navigate("/artists");
    };

    // Refreshes the artists table when data changes
    useEffect(() => {
        loadArtist();
        loadReleases();
    }, []);

    return (
        artist &&
        releases && (
            <div>
                <NavBar></NavBar>
                <h2>{artist.artist_name}</h2>
                <div className="search-container search-artist">
                    <h3>Description:</h3>
                    <p>{artist.artist_description}</p>
                </div>
                <button
                    className="edit-button"
                    onClick={() => editArtist(artist)}
                >
                    Edit Artist
                </button>
                <div className="table-container artist-table-container">
                    <h3>Releases</h3>
                    <table className="table">
                        <thead>
                            <tr className="table-heading">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {releases.map((release) => (
                                <tr
                                    className="table-rows"
                                    key={release.release_id}
                                >
                                    <td>{release.release_id}</td>
                                    <td>{release.release_name}</td>
                                    <td>{release.release_type_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="edit-button" onClick={navigateBack}>
                    Back to Artists
                </button>
            </div>
        )
    );
}

export default ArtistPage;
