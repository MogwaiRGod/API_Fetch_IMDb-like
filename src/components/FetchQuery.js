import React, { useState, useEffect } from 'react';
// composants
import DisplayFilms from "./DisplayFilms";


// fonction effectuant une requête fetch ver une API dont l'URL est entrée en argument
// retourne éventuellement une div de chargement ET un composant DisplayFilms avec les données récupérées 
// OU  une div d'erreur
export default function FetchQuery (props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFound, setFindStatus] = useState(false);

    // construction de l'URL vers la requête
    // cette requête va chercher tous les films de la BDD correspondant à l'input
    const url = `${ props.url }s=${ props.query}&apikey=${ props.token }`;

    // utilisation du useEffect pour effectuer la requête fetch (car il s'agit d'un side-effect du composant)
    useEffect(
        () => {
            fetch(url)
            
                .then((response) => {
                    // s'il n'y a pas de réponse à la requête
                    if (!response.ok) {
                        throw new Error("L'API ne répond pas :(");
                    }
                    return response.json();
                })

                .then((actualData) => {
                    console.log(actualData)
                    setData(actualData.Search);
                    setFindStatus(true);
                    setError(null);
                }) // fin then

                // en cas d'erreur
                .catch((err) => {
                    setError(err);
                    setData([]);
                })

                .finally(() => {
                    // si on est là : le traitement est terminé => chargement terminé
                    setLoading(false);
                }) // fin fetch
        }, // fin callback  
        []
    ); // fin useEffect

    useEffect(
        () => {
            // si des films ont été trouvés
            if(data) {
                // on va effectuer une deuxième requête car les informations retournées par la première sont insuffisantes
                const tmpData = data;
                setData([]);

                // reprise du chargement
                setLoading(true);

                tmpData.forEach((film) => {
                    fetch(`${ props.url }i=${ film.imdbID }&apikey=${ props.token }`)

                        .then((response) => {
                            // s'il n'y a pas de réponse à la requête
                            if (!response.ok) {
                                throw new Error("L'API ne répond pas :(");
                            }
                            return response.json();
                        })

                        .then((actualData) => {
                            setData(
                                currentData => [
                                    ...currentData,
                                    actualData
                                ]
                            );
                            setError(null);
                        })

                        .catch((err) => {
                            setError(err);
                            setData([]);
                        })

                        .finally(() => {
                            setLoading(false);
                        }) // fin fetch
                }); // fin forEach
            // sinon, si aucun film n'a été trouvé
            } else {
                setError("Aucun film ne correspond à la recherche");
                setFindStatus(false)
            } // fin si
        },
        [isFound]
    ); // fin useEffect

    return (
        <>
            <BaseFetch loadingStatus={ loading } errorMessage={ error } />
            {
                // quand les données sont disponibles (s'il y en a) -> affichage de la FilmCard
                data && <DisplayFilms data={ data } />
            }
        </>    
    );
}


// composant affichant une div selon qu'une erreur est survenue/le chargement est en cours
function BaseFetch({ loadingStatus, errorMessage }) {
    return (
      <>
        <BaseLoading loadingStatus={ loadingStatus } />
        <BaseError errorMessage={ errorMessage } />
      </>
    );
} // fin BaseComponent


// div de chargement
function BaseLoading({ loadingStatus }) {
    return (
        <>
        {/* NOTE : syntaxe : évaluation qui va afficher également des balises
        booléen && balise */}

        {/* si loading est vrai -> affichage de la div correspondante */}
        { loadingStatus && <div>Données en chargement, veuillez patienter...</div> }  
        </>
    );
} // fin BaseLoading
  

// div de message d'erreur
function BaseError({ errorMessage }) {
    return (
        <>
        {/* si error est not null <=> si une erreur s'est produite -> affichage de la div correspondante */}
        { errorMessage && <div>Une erreur est survenue : { errorMessage }</div> }
        </>
    );
} // fin BaseError