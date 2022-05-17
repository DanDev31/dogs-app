import { DogCards } from "../cards/DogCards" 
import { FilterBar } from "../filter_bar/FilterBar"

export const Main = () => {
  return (
    <main className="container main__container">
        <FilterBar />
        <DogCards />
    </main>
  )
}
