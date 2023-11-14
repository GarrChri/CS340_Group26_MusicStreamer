import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function EditGenre () {
    const updateGenre = async (genre_id) => {

    }

    return (
        <div>
            <h2>Edit</h2>
            
            <h4 className="form-create-title">Edit this genre</h4>
            <form className="form-create" action="">
                <input 
                    type="text"
                    name="genreName"
                    // value={}
                    ></input>
                <button type="button" onClick = {() => updateGenre()}>Submit</button>
            </form>
        </div>
    );
}

export default EditGenre;