import React from "react";

const genreExamples = [
    {id: 1, genre: "Rock"},
    {id: 2, genre: "Alternative Rock"},
    {id: 3, genre: "Electronic"},
    {id: 4, genre: "Hip Hop"},
    {id: 5, genre: "Country"}
]

// Function to retrieve genres

// Function to create a new genre

// Creates the genres table
function Genres({id, name}){
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
                    {genreExamples.map((genre) => (

                        <tr className="table-rows">
                        <td>{genre.id}</td>
                        <td>{genre.genre}</td>
                        <button className="table-button">Edit</button>
                        <button className="table-button">Delete</button>
                    </tr>
                        ))}
                </tbody>
            </table>

            <h4 className="form-create-title">Add a new Genre</h4>
            <form className="form-create">
            <label for="genre-name">Genre: </label>
            <input type="text" id="genre-name" className="form-create-input" />
            <button>Add</button>
            </form>
        </div>
    );
}

export default Genres;