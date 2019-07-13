import React from 'react';
import {ThemeContext} from "../contexts/theme-context";

class TodoItem extends React.Component{
    render() {
        const {onRemoveBtnClick, todoItem, onToggleTodo} = this.props;
        const todoItemStyle = todoItem.completed ?
            {
                backgroundColor: 'gray',
                textDecoration: 'line-through',
                margin: 5
            } : {};
        return (
            <ThemeContext.Consumer>
                {
                    themeContext =>(<div style={todoItemStyle}>
                        <span onClick={()=>onToggleTodo(todoItem)} style={{color: themeContext.color, cursor: 'pointer'}} >{todoItem.name}</span>
                        <button style={{float: 'right'}} onClick={()=>{onRemoveBtnClick(todoItem.id)}}>Remove</button>
                    </div>)
                }
            </ThemeContext.Consumer>
            );
    }
}

export default TodoItem;