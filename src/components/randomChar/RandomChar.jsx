import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './randomChar.scss';
import useMarvelService from '../../services/MarvelService'
import mjolnir from '../../resources/img/mjolnir.png';
import FadeIn from "../fadeIn/FadeIn"

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const RandomChar = React.memo(() => {

    const [char, setChar] = useState(null)

    const { loading, error, getCharacter, clearError } = useMarvelService()

    const personageReloadTimer = useRef()

    useEffect(() => {
        updateChar();
        personageReloadTimer.current = setInterval(() => { updateChar() }, 10000);
        return () => clearInterval(personageReloadTimer.current);
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const resetInterval = () => {
        if (personageReloadTimer.current) {
            clearInterval(personageReloadTimer.current)
            personageReloadTimer.current = setInterval(() => { updateChar() },10000)
        }
    }

    const handleNewPrsonageClick = useCallback(() => {
        resetInterval()
        updateChar()
    })


    const updateChar = () => {
        clearError()
        const id = (Math.random() * (1011400 - 1011000) + 1011000).toFixed();
        // const id = 1009145;

        getCharacter(id)
            .then(onCharLoaded)

    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;


    return (
        
            <div className="randomchar">

            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={handleNewPrsonageClick} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>        
    )

})

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    let imgStyle = { 'objectFit': 'cover' }


    if (thumbnail && thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <FadeIn>
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className='randomchar__img' style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
            </div>
            </FadeIn>)
}

export default RandomChar;