import React, { useState } from "react";
import Select from "react-select";
import NavBar from "./NavBar";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import DisplayArtists from "./DisplayArtists";
import CreateArtist from "./CreateArtist";
import GetSingleArtist from "./GetSingleArtist";

// https://refine.dev/blog/react-query-guide/#mutating-data

const artistExamples = [
  {
    value: "Linkin Park",
    label: "Linkin Park",
    id: 1,
    name: "Linkin Park",
    description: "Info about Linkin Park"
  },
  {
    value: "Red Hot Chili Peppers",
    label: "Red Hot Chili Peppers",
    id: 2,
    name: "Red Hot Chili Peppers",
    description: "Info about Red Hot Chili Peppers"
  },
  {
    value: "Queen",
    label: "Queen",
    id: 3,
    name: "Queen",
    description: "Info about Queen"
  }
];
const api_url = "/api/artists.txt";

// Creates the artists table
function Artists() {
  const getArtistList = async () => {
    //const api_url = 'http://flip2.engr.oregonstate.edu:2626/api/artists'
    const response = await axios.get(api_url);
    return response.data;
  };

  // const test = getArtistList()

  // const artistQuery = useQuery({
  //   queryKey: ["artists"],
  //   queryFn: () => wait(500).then(() => [...ARTISTS])
  // });

  // Getting artist table to display
  //   const getArtistList = async () => {
  //const api_url = 'http://flip2.engr.oregonstate.edu:2626/api/artists'
  //      const api_url = '/api/artists'
  //     const res = await fetch(api_url);
  //    return res.json();
  //};

  // const artistList = getArtistList();
  //console.log(artistList)

  return (
    <div>
      <NavBar></NavBar>
      <h2>Artists</h2>
      <table className="table">
        <thead>
          <tr className="table-rows">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <DisplayArtists />
      </table>

      <h4>Search for an Artist</h4>
      <GetSingleArtist />

      <h4 className="form-create-title">Add a new Artist</h4>
      <CreateArtist />
    </div>
  );
}

export default Artists;

/**
  <label for="artist-name">Artist Name: </label>
        <input type="text" id="artist-name" className="form-create-input" />
        <label for="artist-description">Description: </label>
        <input
          type="text"
          id="artist-description"
          className="form-create-input"
        />
        <button>Add</button>
 */

// DISPLAY ARTISTS
/**
    <tbody>
          {artistExamples.map((artist) => (
            <tr className="table-rows">
              <td>{artist.id}</td>
              <td>{artist.name}</td>
              <td>{artist.description}</td>
              <td className="table-button">
                <button onClick={getArtistList}>Edit</button>
              </td>
              <td className="table-button">
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
  */
