import React from "react";
import '../../style/button.scss'
import '../../style/style.scss'
import './searchCharacter.scss'

const SearchCharacter = () => {
    return (
        <div>
            <h3>Or find character by name:</h3>
            <form action="">
                <input type="text" />
                <button className="button button__main">
                    <div className="inner">
                        Find
                    </div>
                </button>
            </form>
        </div>
    )
}

export default SearchCharacter;