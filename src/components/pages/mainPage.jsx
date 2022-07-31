import React, { useState, useCallback } from "react";
import RandomChar from "../randomChar/RandomChar";// eslint-disable-line
import CharList from "../charList/CharList";// eslint-disable-line
import CharInfo from "../charInfo/CharInfo";// eslint-disable-line
import ErrorWrapper from "../errorWrapper/ErrorWrapper";

import decoration from '../../resources/img/vision.png';// eslint-disable-line


const MainPage = () => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = useCallback((id) => {
    setChar(id)
  }, [setChar])

  return (
    <>
      <ErrorWrapper>
        <RandomChar />
      </ErrorWrapper>
      <div className="char__content">
        <ErrorWrapper>
          <CharList onCharSelected={onCharSelected} />
        </ErrorWrapper>
        <ErrorWrapper>
          <CharInfo charId={selectedChar} />
        </ErrorWrapper>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}


export default MainPage;