import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { fetchActions } from '../../features/fetchAPI/fetchSlice'

export const FilterBar = () => {

  const [temps, setTemps] = useState([])
  const [breed, setBreed] = useState('')
  const [listValue, setListValue] = useState('')

 
  const dispatch = useDispatch()

  const getTemps = async() => {
    const response = await axios.get('http://localhost:3001/temperament')
    const data = await response.data
    setTemps(data)
  }

  useEffect(() => {
    getTemps()
  }, [])

  //By Breed
  const handleFilterByBreed = ({target}) => {
    dispatch(fetchActions.filterDogsByBreed(breed))
    setBreed(target.value)
  }

  //By Temperament
  const handleFilterByTemp = ({target}) => {
    setListValue(target.value)
  }

  const handleFilterByTempSubmit = (e) => {
      e.preventDefault()
      dispatch(fetchActions.reloadPage())
      dispatch(fetchActions.filterDogsbyTemp(listValue))
      e.target.reset()
  }

  //By Weigth and Name

  const handleOrderByName = ({target}) => {
    var opc = target.value
    dispatch(fetchActions.filterDogsByName(opc))
    
  }

  const handleOrderByWeigth = ({target}) => {
    dispatch(fetchActions.filterDogsByWeigth(target.value))
  }

  //Reload Page
  const handleReload = () => {
    dispatch(fetchActions.reloadPage())
  }


  return (
    <div className='filter__bar-container'>
      <div className='search__bar'>
          <input type="text" placeholder='Search by Breed...' onChange={ handleFilterByBreed } />
      </div>
      <form onSubmit={ handleFilterByTempSubmit } className="filter__bar-form" data-testid="form-1">

        <label>Filter by temperament:</label>
        <input list="temperaments" name="temperament" id="temperament" onChange={ handleFilterByTemp }/>

          <datalist id="temperaments">
            {
              temps.map( ( temp ) => (
                <option 
                  key={ temp.id }
                  value={ temp.name }
                ></option>
              ) )
            }
          </datalist>
          <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
      </form>
      
        <div className='filter__bar-order'>
          <label>Order by:</label>
          <select onChange={ handleOrderByName }>
            <option value="">Alphabetical</option>
            <option value='asc'>A - Z</option>
            <option value='desc'>Z - A</option>
          </select>

          <select onChange={ handleOrderByWeigth }>
            <option value="" data-testid="weigth-option">Weigth</option>
            <option value='high' data-testid="weigth-option">Higher</option>
            <option value='low' data-testid="weigth-option">Lower</option>
          </select>
        </div>

        <button
          onClick={ handleReload }
        >Reload</button>

    </div>
  )
}

