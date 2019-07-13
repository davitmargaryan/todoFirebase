import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'

const styles = {
    stylesForButtons: {
        margin: '10px 20px'
    }
};

class Toolbar extends React.Component{
    render() {
        const { onThemeChange, classes } = this.props;
        return (
            <div>
                <Button className={classes.stylesForButtons} variant='contained' color="primary" onClick={()=>onThemeChange('light')}>Light</Button>
                <Button className={classes.stylesForButtons} variant='contained' color="primary" onClick={()=>onThemeChange('dark')}>Dark</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Toolbar);
