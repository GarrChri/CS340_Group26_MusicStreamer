import React from "react";

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
                    <tr className="table-rows">
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

export default Releases;