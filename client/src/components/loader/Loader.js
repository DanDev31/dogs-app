import React from 'react'

import paw__image from '../../assets/dog-paw.png'

export const Loader = () => {
  return (
    <div className='loader__container'>
        <div className="paw__container">

            <div className="paw__image one">
              <img src={ paw__image } alt="" />
            </div>
            <div className="paw__image two">
                <img src={ paw__image } alt="" />
            </div>
            <div className="paw__image three">
                <img src={ paw__image } alt="" />
            </div>
            <div className="paw__image four">
                <img src={ paw__image } alt="" />
            </div>
            <div className="paw__image five">
                <img src={ paw__image } alt="" />
            </div>
            <div className="paw__image six">
                <img src={ paw__image } alt="" />
            </div>

        </div>
            
    </div>
  )
}
