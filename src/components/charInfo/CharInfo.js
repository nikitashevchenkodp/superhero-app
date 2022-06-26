import './charInfo.scss';
import { Component, useEffect, useState } from 'react/cjs/react.development';
import MarvelService from '../../services/marvel-service';
import ErrorIndicator from '../errorIndicator/errorIndicator';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/marvel-service';

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null)
    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        if(!charId) {
           return; 
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }


    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const data = (!loading && !error && char) ? <View char = {char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {data}
        </div>
    )

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const styleImg = char.thumbnail.includes('image_not_available') ? {objectFit: "unset"} : {objectFit: "cover"}
    return (
        <>
        <div className="char__basics">
            <img style = {styleImg} src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length < 1 && "Here is no comics.."}
            {
                comics.slice(0,11).map((item, i) => {
                    return (
                        <li className="char__comics-item" key = {i}>
                            {item.name}
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number.isRequired
}

export default CharInfo;