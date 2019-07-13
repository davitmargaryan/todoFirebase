import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBrKJ3he_wXKpfLRNcXvI65zjlyDWrDSKM",
    authDomain: "todoapp-3f6b3.firebaseapp.com",
    databaseURL: "https://todoapp-3f6b3.firebaseio.com",
    projectId: "todoapp-3f6b3",
    storageBucket: "todoapp-3f6b3.appspot.com",
    appID: "app-id",
};
firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
