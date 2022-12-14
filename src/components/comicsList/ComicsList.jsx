import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './comicsList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Ad from '../ad/Ad'
import FadeIn from "../fadeIn/FadeIn"


import useMarvelService from '../../services/MarvelService';
import { useScroll } from '../../hooks/scrollLoad'


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const offsetRef = useRef(offset)
    offsetRef.current = offset; // upload modern offset value so that it could be used inside callback


    const { loading, error, getComics, getAllComics } = useMarvelService();

    const { newItemLoading, setNewItemLoading } = useScroll(onRequest)

    function onRequest(initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComics(8, offsetRef.current)
            .then(onComicsListLoaded)

    }

    function onComicsListLoaded(newComicsList) {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) =>
            (<li className="comics__item" key={ i }>
                <FadeIn>
                    <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                 </Link>
                </FadeIn >
            </li>
        )
        );

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            <Ad />


            {errorMessage}
            {spinner}
            {items}


            <button
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest()}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;