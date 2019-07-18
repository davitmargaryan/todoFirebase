import React from 'react';
import '../App.css';
import Header from "./header";
import TodoList from "./todo-list";
import Toolbar from "./toolbar";
import {ThemeContext} from "../contexts/theme-context";
import {theme} from "../constants/app-constants";
import { firestore } from 'firebase';
import SignIn from './login';
import {Redirect, Route, Switch} from "react-router";
import Comp1 from "./comp1";
import Comp2 from "./comp2";
import Comp3 from "./comp3";
import TodoApp from "./todoApp";

class Main extends React.Component{

    render() {
        return (
            <>
                <Toolbar onThemeChange={this.onThemeChange}/>
                <Switch>
                    <Route exact path="/" component={TodoApp}/>
                    <Route path="/comp1" component={Comp1}/>
                    <Route path="/comp2" component={Comp2}/>
                    <Route path="/comp3" component={Comp3}/>
                    <Redirect to="/" />
                </Switch>
            </>
        )
    }
}

export default Main;
