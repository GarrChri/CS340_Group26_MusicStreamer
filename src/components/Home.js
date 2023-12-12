/* Home.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

// Home page
const Home = () => {
    return (
        <div>
            <header className="home-title">
                <h1>Music Streamer</h1>
            </header>
            <nav className="home-nav-container">
                <Link className="home-nav-link" id="nav-users" to="/users">
                    Users
                </Link>
                <Link className="home-nav-link" to="/playlists">
                    Playlists
                </Link>
                <Link className="home-nav-link" to="/artists">
                    Artists
                </Link>
                <Link className="home-nav-link" to="/songs">
                    Songs
                </Link>
                <Link className="home-nav-link" to="/genres">
                    Genres
                </Link>
                <Link className="home-nav-link" to="/releases">
                    Releases
                </Link>
                <Link
                    className="home-nav-link home-nvm-link-last"
                    to="/releasetypes"
                >
                    Release Types
                </Link>
            </nav>

            <div className="home-description-container">
                <span>
                    <strong>Users</strong>: Users of the Music Streamer app who
                    can listen to songs and create playlists.
                </span>
                <span>
                    <strong>Playlists</strong>: Playlists of songs created by
                    users.
                </span>
                <span>
                    <strong>Releases</strong>: The release (or publication) of
                    the artist.
                </span>
                <span>
                    <strong>Arists</strong>: The artist, singer, band or group.
                </span>
                <span>
                    <strong>Songs</strong>: Songs that users can listen to and
                    create playlists from.
                </span>
                <span>
                    <strong>Genres</strong>: Song genres.
                </span>
                <span>
                    <strong>Release Types</strong>: A category table for
                    different releases. (album, EP, single, compilation, etc.)
                </span>
            </div>
        </div>
    );
};

export default Home;
