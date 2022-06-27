import React from 'react'
import { useEffect } from 'react/cjs/react.development'




const testHoc = (Wrapped) => (props) => {

    useEffect(() => {

        console.log('hello')

    }, [])

  return (
      <Wrapped {...props}/>
  )
}


const Hello = () => {

    return (
        <h1>Hello</h1>
    )
}




export default Hello