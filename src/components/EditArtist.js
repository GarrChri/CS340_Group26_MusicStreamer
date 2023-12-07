import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditArtist () {
    // location allows us to access state props from
    // a navigate() redirect
    const navigate = useNavigate();
    const location = useLocation();
    const artistToEdit = location.state.artistToEdit;

    
    const [artistID, setArtistID] = useState(artistToEdit.artist_id);
    const [artistName, setArtistName] = useState(artistToEdit.artist_name);
    const [artistDescription, setArtistDescription] = useState(artistToEdit.artist_description);
    
    const updateArtist = async () => {
        // create new artist object from state vars
        const updatedArtist = {artistID, artistName, artistDescription};
        
        console.log(updatedArtist)
        const response = await fetch(`${API_ENDPOINT}/api/artists`,{
            method: "PUT",
            body: JSON.stringify(updatedArtist),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200){
            alert(`Updated artist ${artistName}`);
            navigate("/artists");
        } else {
            alert("Artist not updated");
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>
            <h4 className="form-create-title">Editing {artistToEdit.artist_name}</h4>
            <form className="form-create" action="">
                <label for="artistName">Artist Name:</label>
                <input 
                    type="text"
                    name="artistName"
                    value={artistName}
                    onChange={e => setArtistName(e.target.value)}
                    ></input>
                <label for="artistDescription">Description:</label>
                <textarea
                    rows="8"
                    cols="30"
                    name="artistDescription"
                    value={artistDescription}
                    onChange={e => setArtistDescription(e.target.value)}
                    ></textarea>
                <button type="button" onClick = {() => updateArtist()}>Submit</button>
                <button type="button" onClick = {
                    () => navigate("../artistPage", {state: {artistID: artistID}})
                    }>Cancel</button>
            </form>
        </div>
    );
}

export default EditArtist;