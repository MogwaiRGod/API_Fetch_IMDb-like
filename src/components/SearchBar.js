import React, { useState } from 'react';
// composants
import FetchQuery from "./FetchQuery";
// style
import './style/style.css';


export default function SearchBar (props) {
    // booléen indiquant si le formulaire a été envoyé
    const [isSent, setSendStatus] = useState(false);
    // input
    const [searchInput, setsearchInput] = useState(null);

    // url de l'API
    const url = props.url;

    // à l'envoi du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

        // màj du booléen
        setSendStatus(true);
    };

    // à l'update de l'input
    const handleChange = (event) => {
        event.preventDefault();
        setSendStatus(false);

        // récupération de la valeur de l'input
        setsearchInput(event.target.value);
    };

    return (
        <>
            <form onSubmit={ handleSubmit } >
                <label className='searchClass'>Quel film cherchez-vous ?</label>
                    <input 
                        type="text" 
                        name="iptName" 
                        placeholder="Entrer un nom"
                        onChange={ handleChange }
                        required
                    />
                <button>Rechercher</button>
            </form>
            { 
                //  si le formulaire a été envoyé ->
                // on appelle la fonction FetchQuery
                isSent && <FetchQuery url={ url } query={ searchInput } token={ props.token } />
            }
        </>
    ); // fin return
} // fin SearchBar