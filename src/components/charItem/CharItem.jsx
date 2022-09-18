import React from "react";
import FadeIn from "../fadeIn/FadeIn"

import '../charList/charList.scss';


const CharItem = ({ img, imgStyle, name, itemRefs, id, i, handleClick, handleKeyPress }) => (
    <FadeIn>
         <li
            className="char__item"
            tabIndex={0}
            ref={el => itemRefs.current[i] = el}
            key={ id }
            onClick={ handleClick}
            onKeyPress={handleKeyPress}>
    
            <img src={img} alt={name} style={imgStyle} />
            <div className="char__name">{name}</div>
        </li>
    </FadeIn>)


export default CharItem;