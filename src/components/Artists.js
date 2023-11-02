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
                    </tr>
                        ))}
                </tbody>
            </table>
            <h4 >Search for an Artist</h4>
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
        </div>
    );
}

export default Artists;