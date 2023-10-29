import React from "react";

// Creates the playlist songs table
function PlaylistSongs({id, name, userId}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Playlist Name</th>
                        <th>Song Name</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}

export default PlaylistSongs;