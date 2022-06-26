import React from 'react'
import { Link } from 'react-router-dom';
import ErrorIndicator from '../errorIndicator/errorIndicator';

const NotFoundPage = () => {
  return (
    <div style = {{textAlign:'center', fontSize: '24px'}}>
        <h3>T
            his page not found, you can go to the home page by 
            <Link to='/' style = {{color:'red'}}>
                this
            </Link> 
            link
        </h3>
        <ErrorIndicator/>
        
    </div>
  )
}

export default NotFoundPage 