import React from 'react'
import PropTypes from 'prop-types'
import './Letters.css'

const Letters = ({ sLetter, checkLetters }) => (
    <div className="letters" id={`key${sLetter}`} onClick={() => checkLetters(sLetter)}>{sLetter}</div>
)

export default Letters

Letters.propTypes = {
    sLetter: PropTypes.string.isRequired,
    checkLetters: PropTypes.func.isRequired,
}