import React from 'react';
import TodoItem from "./todo-item";

class TodoList extends React.Component{
    render() {
        const {onRemoveBtnClick, onToggleTodo, todoItems} = this.props;
        return todoItems
            .map((todoItem) => {
                return <TodoItem
                        key={todoItem.id}
                        onToggleTodo={onToggleTodo}
                        todoItem={todoItem}
                        onRemoveBtnClick={onRemoveBtnClick}
                    />
            });
    }
}

export default TodoList;