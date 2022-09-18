import './ad.scss'
import React from 'react'
// import avengersLogo from '.../src/resources/img/Avengers_logo.png'
import avengersLogo from '../../../src/resources/img/Avengers_logo.png'
import avengers from '../../../src/resources/img/Avengers.png'

const Ad = () => {
  // const { loading, error, getCharacter, clearError } = useMarvelService();

  return (
    <div className='ad'>

      <div className="begin">
        <img className='avengers' src={avengers} alt="logo" />
        <span className="label">
          New comics every week <br />
          Stay tuned!
        </span>
      </div>

      <img className="avengersLogo" src={avengersLogo} alt="logo" />

    </div>
  )
}

export default Ad;