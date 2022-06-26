import './charListItem.scss'
import PropTypes from 'prop-types'

const CharListItem = ({item, onClick, selected}) => {
  
  const styleImg = item.thumbnail.includes('image_not_available') ? {objectFit: "unset"} : {objectFit: "cover"}

  const selectedItem = selected === item.id;
  const stylesItem = selectedItem ? "char__item char__item_selected" : "char__item"

  const onPressKey = (e) => {
    if(e.keyCode === 13) {
      onClick()
    }
  }

  return (
        <li tabIndex={0} className = {stylesItem}
            onClick = {onClick} onKeyDown = {onPressKey}>
            <img style={styleImg} src={item.thumbnail} alt={item.name}/>
            <div className="char__name">{item.name}</div>
        </li>
  )
}

CharListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default CharListItem