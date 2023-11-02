import React from "react";

const releaseExamples = [
    {id: 1, artist: "Linkin Park", name: "Meteora", type: "Album"},
    {id: 2, artist: "Red Hot Chili Peppers", name: "By The Way", type: "Album"},
    {id: 3, artist: "Queen", name: "A Night at the Opera", type: "Album"}
]

// Creates the releases table
function Releases({id, artistId, name, type} ) {
    return (
        <div>
            <h2>Releases</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Artist</th>
                        <th>Release Name</th>
                        <th>Release Type</th>
                    </tr> 
                </thead>
                <tbody>
                    {releaseExamples.map((release) => (

                        <tr className="table-rows">
                        <td>{release.id}</td>
                        <td>{release.artist}</td>
                        <td>{release.name}</td>
                        <td>{release.type}</td>
                    </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Releases;