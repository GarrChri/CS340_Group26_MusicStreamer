import React from "react";

const genreExamples = [
    {id: 1, genre: "Rock"},
    {id: 2, genre: "Alternative Rock"},
    {id: 3, genre: "Electronic"},
    {id: 4, genre: "Hip Hop"},
    {id: 5, genre: "Country"}
]

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
                    </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Genres;