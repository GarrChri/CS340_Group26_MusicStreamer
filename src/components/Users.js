/* Users.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Creates the users table
function Users() {
    // Setting variables and state
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // Function to retrieve users
    const loadUsers = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/users`);
        const data = await response.json();
        setUsers(data);
    };

    // Function to create a new user
    const createUser = async () => {
        const newUser = { userID, userName, userEmail };
        console.log(newUser);

        const response = await fetch(`${API_ENDPOINT}/api/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Added new user: ${userName}`);
            loadUsers();
        } else {
            alert("New user not added. Check required fields");
        }
    };

    // Function to delete a user
    const deleteUser = async (user_id, user_name) => {
        console.log(user_id);
        const response = await fetch(`${API_ENDPOINT}/api/users/${user_id}`, {
            method: "DELETE",
        });

        if (response.status === 200) {
            alert(`Deleted ${user_name}`);
            loadUsers();
        } else {
            alert("User not deleted");
        }
    };

    // Alert the user to verify correct entry is being deleted
    const confirmDelete = (user_id, user_name) => {
        if (window.confirm(`Are you sure you want to delete ${user_name}?`)) {
            deleteUser(user_id, user_name);
        }
    };

    // Navigate to edit page, sending state props to the edit page/component
    const editUser = (user) => {
        navigate("/editUser", { state: { userToEdit: user } });
    };

    // Refreshes the user table when data changes
    useEffect(() => {
        loadUsers();
    }, []);
    return (
        <div>
            <NavBar></NavBar>
            <h2>Users</h2>
            <form className="form-create">
                <h3 className="form-title">Add a new User</h3>
                <label for="user-name">Name: </label>
                <input
                    name="userName"
                    type="text"
                    id="user-name"
                    className="form-create-input"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label for="user-email">Email: </label>
                <input
                    name="userEmail"
                    type="text"
                    id="user-email"
                    className="form-create-input"
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button
                    type="button"
                    className="form-button add-button"
                    onClick={() => createUser()}
                >
                    Add
                </button>
            </form>

            <div className="table-container">
                <h3 className="table-title">Active Users</h3>
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr className="table-rows">
                                <td>{user.user_id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.user_email}</td>
                                <td className="table-button">
                                    <button
                                        className="edit-button"
                                        onClick={() => editUser(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            confirmDelete(
                                                user.user_id,
                                                user.user_name
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
