import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router'
import Main from "./components/main";
import SignIn from './components/login';
import { Router, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import firebase from "firebase";
import {UserContext} from "./contexts/user-context";

const history = createBrowserHistory();
const firebaseConfig = {
    apiKey: "AIzaSyBrKJ3he_wXKpfLRNcXvI65zjlyDWrDSKM",
    authDomain: "todoapp-3f6b3.firebaseapp.com",
    databaseURL: "https://todoapp-3f6b3.firebaseio.com",
    projectId: "todoapp-3f6b3",
    storageBucket: "todoapp-3f6b3.appspot.com",
    appID: "app-id",
};
firebase.initializeApp(firebaseConfig);

class App extends React.Component{

    state = {
        loggedInUser: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user && user.email);
            this.setState({loggedInUser: user})
        });
    }

  render() {
      return (
          <UserContext.Provider value={this.state.loggedInUser}>
              <Router history={history}>
                  <Switch>
                      <Route exact path="/login" component={SignIn}/>
                      <Route component={Main}/>
                  </Switch>
              </Router>
          </UserContext.Provider>
      )
  }
}

export default App;