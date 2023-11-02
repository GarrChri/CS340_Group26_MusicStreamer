import React from "react";
import Select from "react-select";

const songExamples = [
    { value: "Breaking The Habit", label: "Breaking The Habit", id: 1, name: "Breaking The Habit", release: "Meteora", genre: "Alternative Rock", streamCount: 299102 },
    { value: "Can't Stop", label: "Can't Stop", id: 2, name: "Can't Stop", release: "By The Way", genre: "Alternative Rock", streamCount: 127402 },
    { value: "Bohemian Rhapsody", label: "Bohemian Rhapsody", id: 3, name: "Bohemian Rhapsody", release: "A Night at the Opera", genre: "Rock", streamCount: 121254 },
    { value: "Somewhere I Belong", label: "Somewhere I Belong", id: 4, name: "Somewhere I Belong", release: "Meteora", genre: "Alternative Rock", streamCount: 142632 },
    { value: "By The Way", label: "By The Way", id: 5, name: "By The Way", release: "By The Way", genre: "Alternative Rock", streamCount: 99102 }
]

// Creates the songs table
function Songs({id, name, releaseId, genreId, streamCount}) {
    return (
        <div>
            <h2>Songs</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                        <th>ID</th>
                        <th>Song</th>
                        <th>Release</th>
                        <th>Genre</th>
                        <th>Stream Count</th>
                    </tr> 
                </thead>
                <tbody>
                    {songExamples.map((song) => (
                        <tr className="table-rows">
                            <td>{song.id}</td>
                            <td>{song.name}</td>
                            <td>{song.release}</td>
                            <td>{song.genre}</td>
                            <td>{song.streamCount}</td>
                    </tr>
                        ))
                        }
                </tbody>
            </table>

            <h4 >Search for a Song</h4>

            <form action="" className="search-form">
                <Select 
                    className="select song-select"
                    placeholder=""
                    options={songExamples}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    isClearable
                    isSearchable
                    />
                    <button className="search-button">Search</button>
                </form>
        </div>
    );
}

export default Songs;