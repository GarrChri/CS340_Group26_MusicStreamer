/* Genres.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function Genres({ id, name }) {
    // Setting variables and state
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [genreName, setGenreName] = useState("");

    // Function to retrieve genres
    const loadGenres = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/genres`);
        const data = await response.json();
        setGenres(data);
    };

    // Function to create a new genre
    const createGenre = async () => {
        const newGenre = { genreName };

        const response = await fetch(`${API_ENDPOINT}/api/genres`, {
            method: "POST",
            body: JSON.stringify(newGenre),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Added new genre: ${genreName}`);
            loadGenres();
        } else {
            alert("New item not added. Check required fields");
        }
    };

    // Function to delete a genre
    const deleteGenre = async (genre_id, genre_name) => {
        console.log(genre_id);
        const response = await fetch(`${API_ENDPOINT}/api/genres/${genre_id}`, {
            method: "DELETE",
        });

        if (response.status === 200) {
            alert(`Deleted ${genre_name}`);
            loadGenres();
        } else {
            alert("Genre not deleted");
        }
    };

    // Alert the user to verify correct entry is being deleted
    const confirmDelete = (genre_id, genre_name) => {
        if (window.confirm(`Are you sure you want to delete ${genre_name}?`)) {
            deleteGenre(genre_id, genre_name);
        }
    };

    // Navigate to edit page, sending state props to the edit page/component
    const editGenre = (genre) => {
        navigate("/editGenre", { state: { genreToEdit: genre } });
    };

    // Refreshes the genres table when data changes
    useEffect(() => {
        loadGenres();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <h2>Genres</h2>
            <form className="form-create" action="">
                <h3 className="form-title">Add a New Genre</h3>
                <label for="genreName">Genre Name: </label>
                <input
                    name="genreName"
                    type="text"
                    id="genre-name"
                    className="form-create-input"
                    onChange={(e) => setGenreName(e.target.value)}
                />
                <button
                    type="button"
                    className="form-button add-button"
                    onClick={() => createGenre()}
                >
                    Add
                </button>
            </form>
            <div className="table-container">
                <h3 className="table-title">All Genres</h3>
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>ID</th>
                            <th>Genre</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map((genre) => (
                            <tr className="table-rows">
                                <td>{genre.genre_id}</td>
                                <td>{genre.genre_name}</td>
                                <td className="table-button">
                                    <button
                                        className="edit-button"
                                        onClick={() => editGenre(genre)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            confirmDelete(
                                                genre.genre_id,
                                                genre.genre_name
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

export default Genres;
