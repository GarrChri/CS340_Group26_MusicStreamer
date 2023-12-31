/* NavBar.js

Citation Information
This file contains all original code written by the app's developers.
*/

import { Link } from "react-router-dom";

// Creates links to each of the pages
const NavBar = () => {
    return (
        <nav className="nav-bar">
            <div>
                <Link className="nav-link" to="/">
                    Home
                </Link>
                <Link className="nav-link" to="/users">
                    Users
                </Link>
                <Link className="nav-link" to="/playlists">
                    Playlists
                </Link>
                <Link className="nav-link" to="/releases">
                    Releases
                </Link>
                <Link className="nav-link" to="/artists">
                    Artists
                </Link>
                <Link className="nav-link" to="/songs">
                    Songs
                </Link>
                <Link className="nav-link" to="/genres">
                    Genres
                </Link>
                <Link className="nav-link" to="/releasetypes">
                    Release Types
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
