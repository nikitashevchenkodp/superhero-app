import React from "react";
import AppHeader from "../appHeader/AppHeader";
import { lazy } from "react/cjs/react.development";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import { ComicsPage, MainPage, SingleComicPage, NotFoundPage } from "../pages";
import Spinner from "../spinner/spinner";

const ComicsPage = lazy(() => import("../pages/comics-page"))
const MainPage = lazy(() => import("../pages/main-page"))
const SingleComicPage = lazy(() => import("../pages/single-comic-page"))
const NotFoundPage = lazy(() => import("../pages/404"))


const App  = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <React.Suspense fallback = {<Spinner />}>
                        <Switch>
                            <Route exact path = "/" component={MainPage} />
                            <Route exact path = "/comics" component={ComicsPage}/>
                            <Route exact path = '/comics/:id' component={SingleComicPage}/>
                            <Route to='*' component = {NotFoundPage}/>
                        </Switch>
                    </React.Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;
