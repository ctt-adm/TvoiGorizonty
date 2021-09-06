import React from "react";
import { Switch, Route } from 'react-router-dom'
import Quiz from "./Quiz";
import Results from "./Results";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Quiz}/>
            <Route path='/Results' component={Results}/>
        </Switch>
    </main>
)
export default Main