import React from 'react'
import { Link } from 'react-router-dom' 

import home_image from '../../assets/home__dog2.jpeg'

export const Home = () => {
  return (
    <div className='home__container'>

      <div className="home__container-info">
      <h1>Welcome to Doggo!</h1>
      <h4>Find your favorite dog breed</h4>

      <Link to="dogs" className='link'>
        Go now!
      </Link>
      </div>

      <div className="home__container-image">
        <img src={ home_image } alt="" />
      </div>

    </div>
  )
}
