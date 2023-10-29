import React from "react";

// Creates the artists table
function Artists({id, name, description}) {
    return (
        <div>
            <h2>Artists</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
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

export default Artists;