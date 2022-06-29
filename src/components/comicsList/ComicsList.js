import './comicsList.scss';

import useMarvelService from '../../services/marvel-service';
import { useEffect, useState } from 'react/cjs/react.development';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../errorIndicator/errorIndicator';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [offset, setOffset] = useState(0)

    const { getAllComics, process, setProcess} = useMarvelService();
    useEffect(() => {
        updateComics(offset, true)
        // eslint-disable-next-line
    }, [])

    const setContent = (process, Component, pagination) => {
        switch(process) {
            case 'waiting':
                return <Spinner />
            case 'loading':
                return pagination ? <Spinner/> : <Component/>
            case 'confirmed':
                return <Component/>
            case 'error':
                return <ErrorIndicator/>
            default:
                throw new Error("Unexpected process state")
        }
    }

    const onComicsLoaded = (comics) => {
        setComicsList((comicsList) => [...comicsList, ...comics])
        setPaginationLoading(false)
        setOffset(offset => offset + 8)
    }

    const updateComics = (offset, initial) => {
        initial ? setPaginationLoading(true) : setPaginationLoading(false)
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    function renderItems()  {
        const items = comicsList.map((item) => {
            return (
                <li key={item.id} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    // const spinner = loading ? <Spinner/> : null;
    // const errorMassage = error ? <ErrorIndicator/> : null
    // const items = renderItems();

    
    return (
        <div className="comics__list">
                {setContent(process, () => renderItems(), paginationLoading)}
            <button disabled = {paginationLoading} onClick = {() => updateComics(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;