import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import useMarvelService from '../../services/marvel-service'
import ErrorIndicator from '../errorIndicator/errorIndicator';
import Spinner from '../spinner/spinner';

const SingleItemPage = ({Component, dataType}) => {

    const {loading, error, clearError, getComic, getCharacterByName} = useMarvelService();
    const {id} = useParams();
    const [item, setItem] = useState(null);

    console.log(item);

    useEffect(() => {
        onLoadItem();
    }, [id])

    const updateItem = () => {
        switch(dataType) {
            case 'COMIC':
               return getComic(id)
            case 'CHARACTER':
                return getCharacterByName(id)
            default:
                return;
        }
    }

    const onLoadItem = () => {
        clearError()
        updateItem()
            .then(res => setItem(res))
    }
    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ?  <ErrorIndicator/> : null
    const content = (!error && !loading && item) ?  <Component item = {item} /> : null



    return (
       <>
            {spinner}
            {errorMessage}
            {content}
       </>
    )
}

export default SingleItemPage