/* ReleaseTypes.js

Citation Information
This file contains all original code written by the app's developers.
*/

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
    };

    // Function to create a new release type
    const createReleaseType = async () => {
        const newReleaseType = { releaseTypeName };

        const response = await fetch(`${API_ENDPOINT}/api/releasetypes`, {
            method: "POST",
            body: JSON.stringify(newReleaseType),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Added new release type: ${releaseTypeName}`);
            loadReleaseTypes();
        } else {
            alert("New item not added. Check required fields");
        }
    };

    // Function to delete a release type
    const deleteReleaseType = async (release_type_id, release_type_name) => {
        const response = await fetch(
            `${API_ENDPOINT}/api/releasetypes/${release_type_id}`,
            {
                method: "DELETE",
            }
        );

        if (response.status === 200) {
            alert(`Deleted ${release_type_name}`);
            loadReleaseTypes();
        } else {
            alert("Release type not deleted");
        }
    };

    // Alert the user to verify correct entry is being deleted
    const confirmDelete = (release_type_id, release_type_name) => {
        if (
            window.confirm(
                `Are you sure you want to delete ${release_type_name}?`
            )
        ) {
            deleteReleaseType(release_type_id, release_type_name);
        }
    };

    // Navigate to edit page, sending state props to the edit page/component
    const editReleaseType = (releaseType) => {
        navigate("/EditReleaseType", {
            state: { releaseTypeToEdit: releaseType },
        });
    };

    // Refreshes the release types table when data changes
    useEffect(() => {
        loadReleaseTypes();
    }, []);
    return (
        <div>
            <NavBar></NavBar>
            <h2>Release Types</h2>
            <form className="form-create" action="">
                <h3 className="form-title">Add a new Release Type</h3>
                <label for="releaseTypeName">Name: </label>
                <input
                    type="text"
                    id="release-type-name"
                    className="form-create-input"
                    onChange={(e) => setReleaseTypeName(e.target.value)}
                />
                <button
                    type="button"
                    className="form-button add-button"
                    onClick={() => createReleaseType()}
                >
                    Add
                </button>
            </form>

            <div className="table-container">
                <h3 className="table-title">All Release Types</h3>
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>ID</th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {releaseTypes.map((releaseType) => (
                            <tr className="table-rows">
                                <td>{releaseType.release_type_id}</td>
                                <td>{releaseType.release_type_name}</td>
                                <td className="table-button">
                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            editReleaseType(releaseType)
                                        }
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            confirmDelete(
                                                releaseType.release_type_id,
                                                releaseType.release_type_name
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

export default ReleaseTypes;
