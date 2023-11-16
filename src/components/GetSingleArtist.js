import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";

//const api_url = "/api/artists";
const api_url = "http://localhost:2626/api/artists";

// Making the api call to retrieve all artists
const getArtist = async () => {
  const response = await axios.get(api_url);
  return response.data;
};

// Error handling + sorting the data to create the Artists table
const GetSingleArtist = () => {
  const { data: artist, error, isLoading } = useQuery({
    queryKey: "artistData",
    queryFn: getArtist,
    enabled: false
  });

  if (isLoading) return <div>Fetching artists...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <form action="" className="search-form">
      <Select
        id="artist-search"
        className="select"
        placeholder=""
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null
        }}
        openmenuonclick={false}
        isClearable
        isSearchable
      />
      <button className="search-button" onClick={getArtist}>
        Search
      </button>
    </form>
  );
};

export default GetSingleArtist;