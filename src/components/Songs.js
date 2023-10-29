import React from "react";

// Creates the songs table
function Songs({id, name, releaseId, genreId, streamCount}) {
    return (
        <div>
            <h2>Songs</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Song</th>
                        <th>Release</th>
                        <th>Genre</th>
                        <th>Stream Count</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr className="table-rows">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Songs;