import React from "react";
import { Switch, Route } from 'react-router-dom'
import Quiz from "./Quiz";
import Results from "./Results";

const Main = () => (
    <main>
        <Switch>
            <Route path='/Results#/' component={Results}/>
            <Route exact path='/' component={Quiz}/>
        </Switch>
    </main>
)
export default Main