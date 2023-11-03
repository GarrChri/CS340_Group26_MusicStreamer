import React from "react";
import Select from "react-select";

const artistExamples = [
    {value: "Linkin Park", label: "Linkin Park", id: 1, name: "Linkin Park", description: "Info about Linkin Park"},
    {value: "Red Hot Chili Peppers", label: "Red Hot Chili Peppers", id: 2, name: "Red Hot Chili Peppers", description: "Info about Red Hot Chili Peppers"},
    {value: "Queen", label: "Queen", id: 3, name: "Queen", description: "Info about Queen"}
]

// Creates the artists table
function Artists({id, name, description}) {
    return (
        <div>
            <h2>Artists</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr> 
                </thead>
                <tbody>
                    {artistExamples.map((artist) => (
                        <tr className="table-rows">
                        <td>{artist.id}</td>
                        <td>{artist.name}</td>
                        <td>{artist.description}</td>
                        <button className="table-button">Edit</button>
                        <button className="table-button">Delete</button>
                    </tr>
                        ))}
                </tbody>
            </table>

            <h4 >Search for an Artist</h4>

            <form action="" className="search-form"> 
                <Select
                    id="artist-search" 
                    className="select"
                    placeholder=""
                    options={artistExamples}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    openmenuonclick={false}
                    isClearable
                    isSearchable
                    />
                <button className="search-button">Search</button>
            </form>

            <h4 className="form-create-title">Add a new Artist</h4>
            <form className="form-create">
                <label for="artist-name">Artist Name: </label>
                <input type="text" id="artist-name" className="form-create-input" />
                <label for="artist-description">Description: </label>
                <input type="text" id="artist-description" className="form-create-input" />
                <button>Create</button>
            </form>



        </div>
    );
}

export default Artists;