import React from 'react'
import { useState } from 'react/cjs/react.development'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import ErrorBoundry from '../errorBoundry/errorBoundry'
import RandomChar from '../randomChar/RandomChar'
import decoration from '../../resources/img/vision.png';
import Form from '../form/form'
import Helmet from 'react-helmet'


const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }


  return (
    <>
        <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
                />
            <title>Marvel information portal</title>
        </Helmet>
        <ErrorBoundry>
            <RandomChar/>
        </ErrorBoundry>
        <div className="char__content">
            <ErrorBoundry>
                <CharList onCharSelected = {onCharSelected} selected = {selectedChar} />
            </ErrorBoundry>
            <div className='sidebar'>
                <CharInfo charId = {selectedChar}/>
                <Form/>
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage