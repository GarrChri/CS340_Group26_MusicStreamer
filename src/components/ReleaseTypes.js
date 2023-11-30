import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";


// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Creates the release types table
function ReleaseTypes() {

    // Setting variables and state
    const navigate = useNavigate();
    const [releaseTypes, setReleaseTypes] = useState([]);
    const [releaseTypeName, setReleaseTypeName] = useState("");

    // Function to retrieve release types
    const loadReleaseTypes = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/releasetypes`);
        const data = await response.json();
        setReleaseTypes(data);
    }

    // function to create a new release type
    const createReleaseType = async () => {
        const newReleaseType = {releaseTypeName}

        const response = await fetch(`${API_ENDPOINT}/api/releasetypes`, {
            method: "POST",
            body: JSON.stringify(newReleaseType),
            headers: {
                "content-type": "application/json"
            }
        });

        if (response.status === 200) {
            alert(`Added new release type: ${releaseTypeName}`);
            loadReleaseTypes();
        } else {
            alert("New item not added. Check required fields");
        }
    }

    const deleteReleaseType = async (release_type_id) => {
        const response = await fetch(`${API_ENDPOINT}/api/releasetypes/${release_type_id}`, {
            method: "DELETE"});

        if (response.status === 200){
            alert(`Deleted release type `);
            loadReleaseTypes();
        } else {
            alert("Release type not deleted");
        }
    }

    const editReleaseType = (releaseType) => {     
        // navigate to edit page, sending state props to the edit page/component 
        navigate("/EditReleaseType", { state: { releaseTypeToEdit: releaseType }});
    }

    useEffect(() => {
        loadReleaseTypes();
    }, []);
  return (
      <div>
          <NavBar></NavBar>
          <h2>Release Types</h2>
          <table className="table">
                <thead>
                      <tr className="table-rows">
                            <th>ID</th>
                            <th>Name</th>
                      </tr>
                </thead>
                <tbody>
                    {releaseTypes.map((releaseType) => (

                        <tr className="table-rows">
                            <td>{releaseType.release_type_id}</td>
                            <td>{releaseType.release_type_name}</td>
                            <button 
                                onClick={() => editReleaseType(releaseType)}
                                >Edit</button>
                            <button
                                onClick={() => deleteReleaseType(releaseType.release_type_id)}
                                >Delete</button>
                        </tr>
                        ))}
                </tbody>
            </table>

            <h4 className="form-create-title">Add a new Release Type</h4>
            <form className="form-create" action="">
              <label for="releaseTypeName">Name: </label>
              <input
                type="text"
                id="release-type-name"
                className="form-create-input"
                onChange={e => setReleaseTypeName(e.target.value)}
              />
              <button type="button" onClick = {() => createReleaseType()}>Add</button>
            </form>
    </div>
  );
}

export default ReleaseTypes;