import React from "react";

// Creates the users table
function Users({id, name, email}) {
    return (
        <div>
            <h2>Users</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
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

export default Users;