import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import CharItem from '../charItem/CharItem'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useScroll } from '../../hooks/scrollLoad'
import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    const { newItemLoading, setNewItemLoading } = useScroll(onRequest)


    const offsetRef = useRef(offset)
    offsetRef.current = offset;


    function onRequest(initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offsetRef.current)
            .then(onCharListLoaded)
    }

    function onCharListLoaded(newCharList) {
        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }


        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    function focusOnItem(id) {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <CharItem
                    imgStyle={ imgStyle }
                    img={item.thumbnail}
                    name={ item.name }
                    itemRefs={ itemRefs }
                    id={ item.id }
                    key={ item.id }
                    i={i}

                    handleClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    } }
        
                    handleKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    } }
                    
                />
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;