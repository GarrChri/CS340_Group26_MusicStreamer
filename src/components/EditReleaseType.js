import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditReleaseType () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const releaseTypeToEdit = location.state.releaseTypeToEdit;

    const [releaseTypeName, setReleaseTypeName] = useState(releaseTypeToEdit.release_type_name);
    const releaseTypeID = releaseTypeToEdit.release_type_id;

    const updateReleaseType = async () => {
        // create new release type object from state vars
        const updatedReleaseType = {releaseTypeID, releaseTypeName};

        console.log(updatedReleaseType)

        const response = await fetch(`${API_ENDPOINT}/api/releasetypes`,{
            method: "PUT",
            body: JSON.stringify(updatedReleaseType),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated release type to ${releaseTypeName}`);
            navigate("/releasetypes");
        } else {
            alert("Release type not deleted");
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit Release Type</h2>

            <div className="form-edit-container">
            
                <form className="form-edit" action="">
                <h4 className="form-title">Editing {releaseTypeToEdit.release_type_name}</h4>
                    <label for="releaseTypeName">Release Type Name: </label>
                    <input 
                        type="text"
                        name="releaseTypeName"
                        value={releaseTypeName}
                        onChange={e => setReleaseTypeName(e.target.value)}
                        ></input>
                </form>
                <div className="edit-button-container">
                    <button 
                        type="button" 
                        className="delete-button form-edit-button"
                        onClick = {() => navigate("../releaseTypes")}
                    >Cancel</button>
                    <button 
                        type="button" 
                        className="add-button form-edit-button"
                        onClick = {() => updateReleaseType()}
                    >Submit</button>
                </div>
            </div>
        </div>
    );
}

export default EditReleaseType;