import React from 'react';
import img from './error.gif'
import './errorIndicator.scss'

const ErrorIndicator = () => {
  return (
    <img className='error-img' src={img} alt = "Error" />
  )
}

export default ErrorIndicator