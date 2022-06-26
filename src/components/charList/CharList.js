import './charList.scss';
import { useEffect, useState } from 'react/cjs/react.development';
import CharListItem from '../charListItem/charListitem';
import ErrorIndicator from '../errorIndicator/errorIndicator';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types'
import useMarvelService from '../../services/marvel-service';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setPaginationLoading(true) : setPaginationLoading(false)
        
        getAllCharacters(offset)
            .then(charsLoaded)
    }

    const charsLoaded = (chars) => {

        if(chars.length < 9) {
            setCharEnded(true)
        }
        
        setCharList((charList) => [...charList, ...chars]);
        setPaginationLoading(false)
        setOffset((offset) => offset + 9)
    
    }


    const renderItems = (items) => {
        return items.map((item) => {
            return (
                <CharListItem 
                    key = {item.id}
                    item = {item} 
                    selected = {props.selected}
                    onClick = {() => props.onCharSelected(item.id)}
                    />
            )
        }) 
    }

    const items = renderItems(charList)

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">
                {items}
            </ul>
            <button
                style={{display: charEnded ? 'none' : 'block'}}
                    disabled = {paginationLoading}
                    onClick = {() => onRequest(offset)}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )

    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;