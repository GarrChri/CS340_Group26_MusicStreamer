/* EditUser.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditUser() {
    // location allows us to access state props from a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();

    // Setting variables and state
    const userToEdit = location.state.userToEdit;
    const [userID, setUserID] = useState(userToEdit.user_id);
    const [userName, setUserName] = useState(userToEdit.user_name);
    const [userEmail, setUserEmail] = useState(userToEdit.user_email);

    // Create new User type object from state vars
    const updateUser = async () => {
        const updatedUser = { userID, userName, userEmail };

        const response = await fetch(`${API_ENDPOINT}/api/users`, {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Updated user to ${userName}`);
            navigate("/users");
        } else {
            alert("User not updated");
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>

            <div className="form-edit-container">
                <form className="form-edit" action="">
                    <h4 className="form-title">
                        Editing {userToEdit.user_name}
                    </h4>
                    <label for="userName">User Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                    <label for="userEmail">Email:</label>
                    <input
                        type="text"
                        name="userEmail"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    ></input>
                </form>
                <div className="edit-button-container">
                    <button
                        type="button"
                        className="delete-button form-edit-button"
                        onClick={() => navigate("../users")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="add-button form-edit-button"
                        onClick={() => updateUser()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
