import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditGenre () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const genreToEdit = location.state.genreToEdit;

    const [genreName, setGenreName] = useState(genreToEdit.genre_name);
    const genreID = genreToEdit.genre_id;

    const updateGenre = async () => {
        // create new genre object from state vars
        const updatedGenre = {genreID, genreName};

        const response = await fetch(`${API_ENDPOINT}/api/genres`,{
            method: "PUT",
            body: JSON.stringify(updatedGenre),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated genre to ${genreName}`);
            navigate("/genres");
        } else {
            alert("Genre not deleted");
        }
    }

    return (
        <div>
            <h2>Edit</h2>
            
            <h4 className="form-create-title">Editing {genreToEdit.genre_name}</h4>
            <form className="form-create" action="">
                <input 
                    type="text"
                    name="genreName"
                    value={genreName}
                    onChange={e => setGenreName(e.target.value)}
                    ></input>
                <button type="button" onClick = {() => updateGenre()}>Submit</button>
            </form>
        </div>
    );
}

export default EditGenre;