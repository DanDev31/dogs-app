import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchActions } from "../../features/fetchAPI/fetchSlice"

export const Pagination = ({
    page, 
  
    max
}) => {
    
    const dispatch = useDispatch()
    const pageNumber = useSelector(state => state.fetch.pageNumber)
    // const [pageNumber, setPageNumber] = useState(1)

    const handleNextPage = () => {
        dispatch(fetchActions.incrementPagination())
        dispatch(fetchActions.incrementPageNumber())
    }

    const handlePrevioustPage = () => {
        dispatch(fetchActions.decrementPagination())
        dispatch(fetchActions.decrementPageNumber())
    }

    
  return (
    <div className="pagination__container">
        <div className="pagination__buttons">
        <button
            onClick={ handlePrevioustPage }
            className={ pageNumber === 1 ? 'no-active' : null }
        ><ion-icon name="chevron-back-outline"></ion-icon></button>
        <p>{ pageNumber } of { max }</p>
        <button
            className={ pageNumber === max ? 'no-active' : null }
            onClick={ handleNextPage }
        ><ion-icon name="chevron-forward-outline"></ion-icon></button>
        </div>
    </div>
  )
}
