import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/marvel-service';
import { useEffect, useState } from 'react/cjs/react.development';
import setContent from '../../utils/setContent'
const RandomChar = () => {

    const [char, setChar] = useState(null)
    
    const { getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
        // const timerId = setInterval(updateChar, 10000);
        

        // return () => {
        //     clearInterval(timerId)
        // }
        // eslint-disable-next-line
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
                .then(onCharLoaded)
                .then(() => setProcess('confirmed'))
    }
    

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
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

const View = ({data}) => {

    const {name, thumbnail, homepage, wiki, description} = data;

    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: "contain"} : {objectFit: "cover"}
    
    const text = "Here is no description..."
    const modDescription = description ? `${description.slice(0, 150)}...` : text
   
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