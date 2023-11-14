import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const genreExamples = [
//     {id: 1, genre: "Rock"},
//     {id: 2, genre: "Alternative Rock"},
//     {id: 3, genre: "Electronic"},
//     {id: 4, genre: "Hip Hop"},
//     {id: 5, genre: "Country"}
// ]

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function Genres({id, name}){
    // Setting variables and state
    const [genres, setGenres] = useState([]);
    const [genreName, setGenreName] = useState("");

    // Function to retrieve genres
    const loadGenres = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/genres`);
        const data = await response.json();
        setGenres(data);
    }

    // function to create a new genre
    const createGenre = async () => {
        const newGenre = {genreName}

        const response = await fetch(`${API_ENDPOINT}/api/genres`, {
            method: "POST",
            body: JSON.stringify(newGenre),
            headers: {
                "content-type": "application/json"
            }
        });

        if (response.status === 200) {
            alert(`Added new genre ${genreName}`);
            loadGenres();
        } else {
            alert("New item not added. Check required fields");
        }
    }

    const deleteGenre = async (genre_id) => {
        const response = await fetch(`${API_ENDPOINT}/api/genres/${genre_id}`, {
            method: "DELETE"});

        if (response.status === 200){
            alert(`Deleted genre `);
            loadGenres();
        } else {
            alert("Genre not deleted");
        }
    }

    useEffect(() => {
        loadGenres();
    }, []);

    return (
        <div>
            <h2>Genres</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Genre</th>
                    </tr> 
                </thead>
                <tbody>
                    {genres.map((genre) => (

                        <tr className="table-rows">
                            <td>{genre.genre_id}</td>
                            <td>{genre.genre_name}</td>
                            <button className="table-button">Edit</button>
                            <button
                                className="table-button"
                                onClick={() => deleteGenre(genre.genre_id)}
                                >Delete</button>
                        </tr>
                        ))}
                </tbody>
            </table>

            <h4 className="form-create-title">Add a New Genre</h4>
            <form className="form-create" action="">
                <label for="genreName">Genre: </label>
                <input 
                    name="genreName" 
                    type="text" 
                    id="genre-name" 
                    className="form-create-input" 
                    onChange={e => setGenreName(e.target.value)}
                />
                <button type="button" onClick = {() => createGenre()}>Add</button>
            </form>
        </div>
    );
}

export default Genres;