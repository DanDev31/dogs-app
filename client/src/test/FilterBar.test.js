import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import { FilterBar } from '../components/filter_bar/FilterBar'

import { Provider } from 'react-redux'
import { store } from '../store/store'


const MockProvider = () => {
    return(
        <Provider store ={ store }>
            <FilterBar />
        </Provider>
    )
}

beforeEach(() => {
    render(<MockProvider />)
})


test('Must have a form component', () => {
   
    const formElement = screen.getByTestId('form-1')
    expect(formElement).toBeInTheDocument();
})

test('Must have a button called "reload".', () => { 

    const reloadButton = screen.getByRole('button', {name: /reload/i})
    expect(reloadButton).toBeInTheDocument()
 })

 test('The order by weight slect tag must have two options', () =>{

    const options = screen.getAllByTestId("weigth-option")
    expect(options.length).toBe(3)
 })

 

 