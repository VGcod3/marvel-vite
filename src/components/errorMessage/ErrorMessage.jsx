import React from 'react'
import errorImage from './error.gif'
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <img id="errorImage" src={errorImage} alt="OOOOOPS, there there is not a chaaracter with this ID" />
  )
}

export default ErrorMessage;