import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditUser () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const userToEdit = location.state.userToEdit;

    
    const [userID, setUserID] = useState(userToEdit.user_id);
    const [userName, setUserName] = useState(userToEdit.user_name);
    const [userEmail, setUserEmail] = useState(userToEdit.user_email);
    
    const updateUser = async () => {
        // create new User type object from state vars
        const updatedUser = {userID, userName, userEmail};
        
        console.log(updatedUser)
        const response = await fetch(`${API_ENDPOINT}/api/users`,{
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated user to ${userName}`);
            navigate("/users");
        } else {
            alert("User not updated");
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>

            <h4 className="form-create-title">Editing {userToEdit.user_name}</h4>
            <form className="form-create" action="">
                <input 
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    ></input>
                <input 
                    type="text"
                    name="userEmail"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    ></input>
                <button type="button" onClick = {() => updateUser()}>Submit</button>
                <button type="button" onClick = {() => navigate("../users")}>Cancel</button>
            </form>
        </div>
    );
}

export default EditUser;