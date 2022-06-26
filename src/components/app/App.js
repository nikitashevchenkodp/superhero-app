import AppHeader from "../appHeader/AppHeader";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ComicsPage, MainPage } from "../pages";



const App  = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path = "/" component={MainPage} />
                        <Route exact path = "/comics" component={ComicsPage}/>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;