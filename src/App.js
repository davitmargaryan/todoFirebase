import React from 'react';
import './App.css';
import Header from "./components/header";
import TodoList from "./components/todo-list";
import Toolbar from "./components/toolbar";
import {ThemeContext} from "./contexts/theme-context";
import {theme} from "./constants/app-constants";
import firebase from 'firebase';

class App extends React.Component{
    state = {
        todoName: '',
        todoItems: [],
        themeContext: theme.dark
    };
    componentDidMount() {
        const db = firebase.firestore();
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
        firebase.firestore()
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
        firebase.firestore()
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
        firebase.firestore()
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
                  <Toolbar onThemeChange={this.onThemeChange}/>
                  <Header todoName={todoName} todoNameChange={this.todoNameChange} onAddBtnClick={this.onAddBtnClick}/>
                  <TodoList onToggleTodo={this.onToggleTodo} onRemoveBtnClick={this.onRemoveBtnClick} todoItems={todoItems}/>
              </div>
            </ThemeContext.Provider>
      )
  }
}

export default App;
