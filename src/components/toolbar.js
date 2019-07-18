import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import firebase from 'firebase';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";


const styles = {
    stylesForButtons: {
        margin: '10px 20px'
    },
    link: {
        margin: '2px 5px'
    }
};

class Toolbar extends React.Component{
    onLogOutBtnClick = () => {
        const { history } = this.props;
        firebase.auth().signOut().then(data=>{
            history.replace('/login');
        })
    };

    render() {
        const { onThemeChange, classes,  match, location, history } = this.props;
        return (
                <div>
                    <Button className={classes.stylesForButtons} variant='contained' color="primary" onClick={()=>onThemeChange('light')}>Light</Button>
                    <Button className={classes.stylesForButtons} variant='contained' color="primary" onClick={()=>onThemeChange('dark')}>Dark</Button>
                    <Button className={classes.stylesForButtons} variant='contained' color="primary" onClick={this.onLogOutBtnClick}>LogOut</Button>
                    <Link className={classes.link} to="/">Home</Link>
                    <Link className={classes.link} to="/login">Login</Link>
                    <Link className={classes.link} to="/comp1">Comp 1</Link>
                    <Link className={classes.link} to="/comp2">Comp 2 Route</Link>
                    <Link className={classes.link} to="/comp3">asdsad</Link>
                </div>
        )
    }
}

export default withRouter(withStyles(styles)(Toolbar));
