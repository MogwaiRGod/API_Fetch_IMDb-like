import React from 'react';
// // style
// import './style/style.css';

export default function FilmCard (props) {
    const data = props.data;

    return (
        <div className="film-card">
            {/* présentation du film */}
            <h2>{ data.Title }</h2>
            <h3>{ data.Year }</h3>
            <img src={ data.Poster } alt={ `Poster de ${ data.Title }` }></img>
            { data.imdbRating!=="N/A" && <h4>{ data.imdbRating/2 }/5</h4> }

            {/* infos de base sur le film */}
            <table>
                <thead>
                    <tr>
                        <th>Durée</th>
                        <th>Genre</th>
                        <th>Revenu total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ data.Runtime }</td>
                        <td>{ data.Genre }</td>
                        <td>{ data.BoxOffice }</td>
                    </tr>
                </tbody>
            </table>    

            {/* informations plus complexes sur le film */}
            <table>
                <thead>
                    <tr>
                        <th>Acteurs</th>
                        <th>Synopsis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ data.Actors }</td>
                        <td>{ data.Plot }</td>
                    </tr>
                </tbody>
            </table>

        </div>
    ); // fin return
} // fin FilmCard