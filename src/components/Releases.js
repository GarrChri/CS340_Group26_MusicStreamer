import React from "react";
import NavBar from "./NavBar";

const releaseExamples = [
  { id: 1, artist: "Linkin Park", name: "Meteora", type: "Album" },
  { id: 2, artist: "Red Hot Chili Peppers", name: "By The Way", type: "Album" },
  { id: 3, artist: "Queen", name: "A Night at the Opera", type: "Album" }
];

// Creates the releases table
function Releases({ id, artistId, name, type }) {
  return (
    <div>
      <NavBar></NavBar>
      <h2>Releases</h2>
      <table className="table">
        <thead>
          <tr className="table-rows">
            <th>ID</th>
            <th>Artist</th>
            <th>Release Name</th>
            <th>Release Type</th>
          </tr>
        </thead>
        <tbody>
          {releaseExamples.map((release) => (
            <tr className="table-rows">
              <td>{release.id}</td>
              <td>{release.artist}</td>
              <td>{release.name}</td>
              <td>{release.type}</td>
              <td className="table-button">
                <button>Edit</button>
              </td>
              <td className="table-button">
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="form-create-title">Add a new Release</h4>
      <form className="form-create">
        <label for="artist-name">Artist: </label>
        <input type="text" id="artist-name" className="form-create-input" />
        <label for="release-name">Release Name: </label>
        <input type="text" id="release-name" className="form-create-input" />
        <label for="release-type">Release Type: </label>
        <input type="text" id="release-type" className="form-create-input" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Releases;