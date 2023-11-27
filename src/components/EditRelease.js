import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditRelease () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const releaseToEdit = location.state.releaseToEdit;

    
    const [releaseID, setReleaseID] = useState(releaseToEdit.release_id);
    const [artistID, setArtistID] = useState(releaseToEdit.artist_id);
    const [releaseName, setReleaseName] = useState(releaseToEdit.release_name);
    const [releaseTypeID, setReleaseTypeID] = useState(releaseToEdit.release_type_id);
    
    const updateRelease = async () => {
        // create new release object from state vars
        const updatedRelease = {releaseID, releaseName, artistID, releaseTypeID};
        
        console.log(updatedRelease)
        const response = await fetch(`${API_ENDPOINT}/api/releases`,{
            method: "PUT",
            body: JSON.stringify(updatedRelease),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated release to ${releaseName}`);
            navigate("/releases");
        } else {
            alert("Release not updated");
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>

            <h4 className="form-create-title">Editing {releaseToEdit.release_name}</h4>
            <form className="form-create" action="">
                <input 
                    type="text"
                    name="releaseName"
                    value={releaseName}
                    onChange={e => setReleaseName(e.target.value)}
                    ></input>
                <input 
                    type="text"
                    name="artistID"
                    value={artistID}
                    onChange={e => setArtistID(e.target.value)}
                    ></input>
                <input 
                    type="text"
                    name="releaseTypeID"
                    value={releaseTypeID}
                    onChange={e => setReleaseTypeID(e.target.value)}
                    ></input>
                <button type="button" onClick = {() => updateRelease()}>Submit</button>
            </form>
        </div>
    );
}

export default EditRelease;