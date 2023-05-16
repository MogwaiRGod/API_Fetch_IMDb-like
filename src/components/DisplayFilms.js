import React from 'react';
// // style
// import './style/style.css';
// composants
import FilmCard from "./FilmCard";

// composant affichant tous les films (passés en propriétés)
export default function DisplayFilms (props) {
    // récupération du tableau d'objets JSON de chaque film identifiés par la requête
    const films = props.data;

    return (
        <div className="allFilms">
            {
                // affichage d'une FilmCard pour chaque film
                films.map((infos) => (
                    <FilmCard data={ infos } key={ infos.imdbID+Math.random() } />
                  ))
            }
        </div>
    ); // fin return
} // fin FilmCard