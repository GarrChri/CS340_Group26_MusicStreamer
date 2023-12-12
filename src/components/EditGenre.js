/* EditGenre.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditGenre() {
    // Location allows us to access state props from a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();

    // Setting variables and state
    const genreToEdit = location.state.genreToEdit;
    const [genreName, setGenreName] = useState(genreToEdit.genre_name);
    const genreID = genreToEdit.genre_id;

    // Create new genre object from state vars
    const updateGenre = async () => {
        const updatedGenre = { genreID, genreName };

        const response = await fetch(`${API_ENDPOINT}/api/genres`, {
            method: "PUT",
            body: JSON.stringify(updatedGenre),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Updated genre to ${genreName}`);
            navigate("/genres");
        } else {
            alert("Genre not deleted");
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit a Genre</h2>
            <div className="form-edit-container">
                <form className="form-edit" action="">
                    <h4 className="form-title">
                        Editing: {genreToEdit.genre_name}
                    </h4>
                    <label for="genreName">Genre Name:</label>
                    <input
                        type="text"
                        name="genreName"
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                    ></input>
                </form>
                <div className="edit-button-container">
                    <button
                        type="button"
                        className="delete-button form-edit-button"
                        onClick={() => navigate("../genres")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="add-button form-edit-button"
                        onClick={() => updateGenre()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditGenre;
