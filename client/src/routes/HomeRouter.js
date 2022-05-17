import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRouter } from './AppRouter'

import { Home } from '../components/home/Home'


export const HomeRouter = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/dogs/*' element={ <AppRouter /> } />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
