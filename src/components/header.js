import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class Header extends React.Component{
    render() {
        const { todoName, todoNameChange, onAddBtnClick} = this.props;
        return (
            <div className="App">
                <h3>Todo List</h3>
                <TextField label="Todo Name"
                           value={todoName}
                           onChange={todoNameChange}
                           margin="none"/>
                <Button style={{margin: '10px'}} variant="contained" onClick={onAddBtnClick}>Add</Button>
            </div>
        )
    }
}

export default Header;
