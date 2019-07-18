import React from 'react';
import '../App.css';
import Header from "./header";
import TodoList from "./todo-list";
import Toolbar from "./toolbar";
import {ThemeContext} from "../contexts/theme-context";
import {theme} from "../constants/app-constants";
import { firestore } from 'firebase';
import SignIn from './login';

class TodoApp extends React.Component{
    state = {
        todoName: '',
        todoItems: [],
        themeContext: theme.dark
    };
    componentDidMount() {
        const db = firestore();
        const todoItemsRef = db.collection("todoItems");
        todoItemsRef.get().then(querySnapshot => {
            const todoItems = [];
            querySnapshot.forEach(doc=>{
                const todo = {
                    name: doc.data().name,
                    completed: doc.data().completed,
                    id: doc.id
                };
                todoItems.push(todo);
            });
            this.setState({todoItems })
        });
    }
    todoNameChange = (e) => {
        this.setState({
            todoName: e.target.value
        })
    };
    onAddBtnClick = () => {
        const { todoItems, todoName } = this.state;
        if(!todoName){
            return;
        }
        const newItems = [...todoItems];
        const todoItem = {
            name: todoName,
            completed: false
        };
        firestore()
            .collection('todoItems')
            .add(todoItem).then((doc)=>{
            todoItem.id = doc.id;
            newItems.push(todoItem);
            this.setState({
                todoName: '',
                todoItems: newItems
            })
        });
    };
    onRemoveBtnClick = (todoId) => {
        const { todoItems } = this.state;
        firestore()
            .collection('todoItems')
            .doc(todoId).delete().then((doc)=>{
            const newTodoItems = [...todoItems];
            const deletedIndex = newTodoItems.indexOf(newTodoItems.find(todoItem => todoItem.id === todoId));
            newTodoItems.splice(deletedIndex, 1);
            this.setState({
                todoItems: newTodoItems
            })
        });
    };
    onThemeChange = (themeValue) =>{
        this.setState({
            themeContext: theme[themeValue]
        })
    };
    onToggleTodo = (todo) =>{
        const { todoItems } = this.state;
        firestore()
            .collection('todoItems')
            .doc(todo.id).set({
            completed: !todo.completed
        }, {merge: true}).then((doc)=>{
            const newTodoItems = [...todoItems];
            newTodoItems.find(t=> t.id === todo.id).completed = !todo.completed;
            this.setState({
                todoItems: newTodoItems
            })
        });
    };
    render() {
        const { todoName, todoItems, themeContext } = this.state;
        return (
            <ThemeContext.Provider value={themeContext}>
                <div className="App">
                    <Header todoName={todoName} todoNameChange={this.todoNameChange} onAddBtnClick={this.onAddBtnClick}/>
                    <div style={{width: 300, margin: '0 auto'}}>
                        <TodoList onToggleTodo={this.onToggleTodo} onRemoveBtnClick={this.onRemoveBtnClick} todoItems={todoItems}/>
                    </div>
                </div>
            </ThemeContext.Provider>
        )
    }
}

export default TodoApp;
