import { Route, Routes } from 'react-router-dom'

import { Navbar } from '../components/navbar/Navbar'
import { Home } from '../components/home/Home'
import { Main } from '../components/main/Main'
import { DogDescription } from '../components/dog_description/DogDescription'
import { CreateBreed } from '../components/create_breed/CreateBreed'


export const AppRouter = () => {
  return (
    <div>
      <Navbar />
        <Routes>

            <Route path='/*' element={ <Main /> } />
            <Route path='dog/:dogId' element={ <DogDescription /> } />   
            <Route path='newbreed' element={ <CreateBreed /> } />
            <Route path='*' element={ <Home /> } />
   
        </Routes>
    </div>
  )
}
