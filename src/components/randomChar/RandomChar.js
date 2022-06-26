import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../errorIndicator/errorIndicator'
import useMarvelService from '../../services/marvel-service';
import { useEffect, useState } from 'react/cjs/react.development';

const RandomChar = () => {

    const [char, setChar] = useState(null)
    
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
        // const timerId = setInterval(updateChar, 10000);
        

        // return () => {
        //     clearInterval(timerId)
        // }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
                .then(onCharLoaded)
    }
    
    const text = "Here is no description..."
    const modDescription = char?.description ? `${char.description.slice(0, 150)}...` : text
    
    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} modDescription = {modDescription}/> : null;

    return (
        <div className="randomchar">
            {spinner}
            {content}
            {errorMessage}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({char, modDescription}) => {

    const {name, thumbnail, homepage, wiki} = char;

    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: "contain"} : {objectFit: "cover"}

    return (
        <div className="randomchar__block">
            <img style={imgStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {modDescription}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}   

export default RandomChar;