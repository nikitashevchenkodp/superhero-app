import React from 'react'
import { useState } from 'react/cjs/react.development'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import ErrorBoundry from '../errorBoundry/errorBoundry'
import RandomChar from '../randomChar/RandomChar'
import decoration from '../../resources/img/vision.png';


const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }


  return (
    <>
        <ErrorBoundry>
            <RandomChar/>
        </ErrorBoundry>
        <div className="char__content">
            <ErrorBoundry>
                <CharList onCharSelected = {onCharSelected} selected = {selectedChar} />
            </ErrorBoundry>
            <CharInfo charId = {selectedChar}/>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage