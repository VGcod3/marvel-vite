import React from "react";
import { Link } from "react-router-dom";
import ErrorWrapper from "../errorWrapper/ErrorWrapper";
import ErrorMessage from '../errorMessage/ErrorMessage';


const NoMatch = () => {
  return (
      <ErrorWrapper>
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>
          <ErrorMessage />
          <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
          <Link style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': '#9F0013' }} to="/">Back to main page</Link>
        </div>
      </ErrorWrapper>
  )
}


export default NoMatch;