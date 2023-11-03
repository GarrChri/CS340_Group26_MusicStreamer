import React from "react";

const releaseTypeExamples = [
    {id: 1, name: "Single"},
    {id: 2, name: "Album"},
    {id: 3, name: "EP"},
    {id: 4, name: "Collaboration"}
]


// Creates the release types table
function ReleaseTypes({id, name}) {
    return (
        <div> 
            <h2>Release Types</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Name</th>
                    </tr> 
                </thead>
                <tbody>
                    {releaseTypeExamples.map((type) => (
                        <tr className="table-rows">
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                        <button className="table-button">Edit</button>
                        <button className="table-button">Delete</button>
                    </tr>
                        ))}
                </tbody>
            </table>

            <h4 className="form-create-title">Add a new Release Type</h4>
            <form className="form-create">
                <label for="release-type-name">Name: </label>
                <input type="text" id="release-type-name" className="form-create-input" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ReleaseTypes;