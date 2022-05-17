import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

export const DogDescription = () => {

const { dogId } = useParams()
const dogs = useSelector(state => state.fetch.data)

const findDog = dogs.find( dog => dog.id === Number(dogId) )

if( !findDog  ){
  return <Navigate to="/dogs" />
}

const { name, temperament, height, weight, image, life_span } = findDog



  return (
    <section className='dog__description-container container'>
      <div className="dog__image">
        <img src={ image.hasOwnProperty('url') ? image.url : image } alt="Dog Img" />
      </div>
      <div className="dog__description">
        <h2>{ name }</h2>
        <hr />
        <p><ion-icon name="caret-forward-outline"></ion-icon><span>Temperament: </span>{ temperament }</p>
        <hr />
        <p><ion-icon name="caret-forward-outline"></ion-icon><span>Height: </span> { height.hasOwnProperty('metric') ? height.metric : height } cms</p>
        <hr />
        <p><ion-icon name="caret-forward-outline"></ion-icon><span>Weight: </span>{ weight.hasOwnProperty('metric') ? weight.metric : weight } Kgs</p>
        <hr />
        <p><ion-icon name="caret-forward-outline"></ion-icon><span>Life expectancy: </span>{ life_span }</p>
        <hr />
      </div>
    </section>
  )
}
