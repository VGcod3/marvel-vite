import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/mainPage'))
const NoMatch = lazy(() => import('../pages/noMatch'));
const ComicsPage = lazy(() => import('../pages/comicsPage'))
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'))


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={ <Spinner /> }>
                        <Routes>
                            <Route path="/comics" element={ <ComicsPage /> } />
                            <Route path="/" element={ <MainPage /> } />
                            <Route path="/comics/:comicId" element={ <SingleComic /> } />
                            <Route path="*" element={ <NoMatch /> } />
                        </Routes>
                    </Suspense>
                </main>
            </div >
        </Router>
    )
}

export default App;