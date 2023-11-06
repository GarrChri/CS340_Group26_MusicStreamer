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
                        <button className="table-button">Edit</button>
                        <button className="table-button">Delete</button>
                    </tr>
                        ))}
                </tbody>
            </table>

            <h4 className="form-create-title">Add a new User</h4>
            <form className="form-create">
                <label for="user-name">Name: </label>
                <input type="text" id="user-name" className="form-create-input" />
                <label for="user-email">Email: </label>
                <input type="text" id="user-email" className="form-create-input" />
                <button>Add</button>
            </form>

        </div>
    );
}

export default Users;