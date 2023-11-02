import React from "react";

const userExamples = [
    {id: 1, name: "Ted Miller", email: "millert8@oregonstate.edu"},
    {id: 2, name: "Chris Garrett", email: "garrchri@oregonstate.edu"},
    {id: 3, name: "John Smith", email: "johnsmith@fakeuser.com"}
]


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
                    {userExamples.map((user) => (

                        <tr className="table-rows">
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;