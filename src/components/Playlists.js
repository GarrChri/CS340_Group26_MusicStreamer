import React from "react";

// Creates the playlists table
function Playlists({id, name, userId}) {
    return (
        <div>
            <h2>Playlists</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Playlist Name</th>
                        <th>Created By</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr className="table-rows">
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}

export default Playlists;