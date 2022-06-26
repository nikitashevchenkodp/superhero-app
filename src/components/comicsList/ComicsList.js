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

    const {loading, error, getAllComics} = useMarvelService();
    console.log(offset)
    useEffect(() => {
        updateComics()
    }, [])

    const onComicsLoaded = (comics) => {
        setComicsList((comicsList) => [...comicsList, ...comics])
        setOffset(offset => offset + 8)
        setPaginationLoading(false)
    }

    const updateComics = (offset) => {
        setPaginationLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
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

    const spinner = loading ? <Spinner/> : null;
    const errorMassage = error ? <ErrorIndicator/> : null
    const items = renderItems();

    
    return (
        <div className="comics__list">
                {spinner}
                {errorMassage}
                {items}
            <button disabled = {paginationLoading} onClick = {() => updateComics(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;