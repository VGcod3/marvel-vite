import React from 'react';
import ComicsList from '../comicsList/ComicsList'
import ErrorWrapper from "../errorWrapper/ErrorWrapper";


const ComicsPage = () => (
  <>
    <ErrorWrapper>
      <ComicsList />
    </ErrorWrapper>
  </>
)

export default ComicsPage;