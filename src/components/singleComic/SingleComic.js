import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react/cjs/react.development';
import useMarvelService from '../../services/marvel-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../errorIndicator/errorIndicator';
import { Link } from 'react-router-dom';

const SingleComic = ({id}) => {
    console.log('render');
    const [comic, setComic] = useState(null)
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [id])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError()
        getComic(id)
            .then(onComicLoaded)
    }

    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ?  <ErrorIndicator/> : null
    const content = (!error && !loading && comic) ? <View comic = {comic} /> : null

  
    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
         
    )
}

const View = ({comic}) => {
    const {title, price, description, pages, thumbnail} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;