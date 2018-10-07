import React from 'react'
import './GuessWord.css'

const Mot = ({ sLetter, status, index }) => (
    <div className={`guessLetter guess${sLetter}`} id={`guess${index}`}>
        {status === 'found' ? sLetter : "_"}
    </div>)

export default Mot