import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation} from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";


// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;


// Creates the artists table
function ArtistPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const artistID = location.state.artistID;
    const [artist, setArtist] = useState();
    const [releases, setReleases] = useState();

    // function to fetch artist by id
    const loadArtist = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/artists?artistID=${artistID}`);
        const data = await response.json();
        setArtist(data[0]);
    }

    const loadReleases = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/releases?artistID=${artistID}`);
        const data = await response.json();
        setReleases(data);
    }

    const editArtist = (artist) => {     
        // navigate to edit page, sending state props to the edit page/component 
        navigate("/editArtist", { state: { artistToEdit: artist }});
    }

    useEffect(() => {
        loadArtist();
        loadReleases();
    }, []);

    return (
        artist && releases && <div> 
          <NavBar></NavBar>
          <h2>{artist.artist_name}</h2>
          
          <h3>Description:</h3>
          <p>{artist.artist_description}</p>
          <button onClick={() => editArtist(artist)}>Edit Artist</button>
          <h3>Releases</h3>

          <table className="table">
            <thead>
            <tr className="table-rows">
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
            </tr>
            </thead>
            <tbody>
                {releases.map((release) => (
                    <tr className="table-rows" key={release.release_id}>
                        <td>{release.release_id}</td>
                        <td>{release.release_name}</td>
                        <td>{release.release_type_name}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          <a href="./artists">Back to Artists</a>
        </div>
      );
}

export default ArtistPage;