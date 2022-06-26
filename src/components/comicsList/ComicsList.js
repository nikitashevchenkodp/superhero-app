import './comicsList.scss';

import useMarvelService from '../../services/marvel-service';
import { useEffect, useState } from 'react/cjs/react.development';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../errorIndicator/errorIndicator';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        updateComics()
    }, [])

    const updateComics = () => {
        getAllComics()
            .then((res) => setComicsList(res))
    }

    function renderItems()  {
        const items = comicsList.map((item) => {
            return (
                <li className="comics__item">
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
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
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;