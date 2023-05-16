import React from "react";
// composants
import SearchBar from "../components/SearchBar.js";

export default function Home () {
    return (
        <>
            <h1>Totociné</h1>
            <SearchBar url="http://www.omdbapi.com/?" token="8027903f" />
        </>
    );
}

// &apikey=