import './charInfo.scss';
import { useEffect, useState } from 'react/cjs/react.development';
import PropTypes from 'prop-types'
import useMarvelService from '../../services/marvel-service';
import setContent from '../../utils/setContent';

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null)
    const {getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line 
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
            .then(() => setProcess('confirmed'))
    }

    
    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )

}  

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data
    const styleImg = data.thumbnail.includes('image_not_available') ? {objectFit: "unset"} : {objectFit: "cover"}
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