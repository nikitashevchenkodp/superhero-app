import './charList.scss';
import { useEffect, useState } from 'react/cjs/react.development';
import CharListItem from '../charListItem/charListitem';
import ErrorIndicator from '../errorIndicator/errorIndicator';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types'
import useMarvelService from '../../services/marvel-service';
import {CSSTransition, TransitionGroup, Transition} from 'react-transition-group'


const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    const [transition, setTransition] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)

    }, [])

    const onRequest = (offset, initial) => {
        initial ? setPaginationLoading(true) : setPaginationLoading(false)
        
        getAllCharacters(offset)
            .then(charsLoaded)
        setTransition(true)
    }

    const charsLoaded = (chars) => {

        if(chars.length < 9) {
            setCharEnded(true)
        }
        
        setCharList((charList) => [...charList, ...chars]);
        setPaginationLoading(false)
        setOffset((offset) => offset + 9)
    
    }
    const duration = 300;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in`,
        transform: 'scale(0.8)'
    }

    const transitionStyles = {
        entering: { opacity: 0},
        entered:  { opacity: 1, transform: 'scale(1)' },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };


    const renderItems = (items) => {
        return items.map((item, i) => {
            return (
                <Transition key = {item.id} timeout = {300 * i} mountOnEnter>
                    {
                        state => (
                            <CharListItem 
                                styleInfo = {{...defaultStyle, ...transitionStyles[state]}}
                                item = {item} 
                                selected = {props.selected}
                                inProp = {transition}
                                onClick = {() => props.onCharSelected(item.id)}
                                />
                                )
                    }
                </Transition>
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
                <TransitionGroup component={null}>
                     {items}
                </TransitionGroup>
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