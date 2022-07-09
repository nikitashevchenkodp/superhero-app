import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import useMarvelService from '../../services/marvel-service'
import setContent from '../../utils/setContent'

const SingleItemPage = ({Component, dataType}) => {

    const {clearError, getComic, getCharacterByName, process, setProcess} = useMarvelService();
    const {id} = useParams();
    const [item, setItem] = useState(null);


    useEffect(() => {
        onLoadItem();
        // eslint-disable-next-line
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
            .then(() => setProcess('confirmed'))
    }

    return (
       <>
            {setContent(process, Component, item)}
       </>
    )
}

export default SingleItemPage