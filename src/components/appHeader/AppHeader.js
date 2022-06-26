
import { NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {

    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to = "/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeStyle = {{color: "#970013"}} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink activeStyle = {{color: "#970013"}} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;