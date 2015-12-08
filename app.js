import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore, bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

const TodoActions = {
  addTodo(text) {
    return {type: ADD_TODO, text}
  },
  removeTodo(id) {
    return {type: REMOVE_TODO, id}
  }
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.text]
      }

    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo, i) => i !== action.id)
      }

    default:
      return state
  }
}

const initialState = {
  todos: ['make a sandwich', 'kiss a grenouille']
}

// @connect(state => ({todos: state.todos})) NOT COMPATIBLE WITH BABEL 6 YET
class Todo extends Component {

  onAddTodo(e) {
    const text = e.target.value.trim()
    if (!text || e.keyCode !== 13) return
    this.props.actions.addTodo(text)
    e.target.value = ''
  }

  onRemoveTodo(id) {
    this.props.actions.removeTodo(id)
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.todos.map((todo, i) => <li key={i}>{todo}<button onClick={this.onRemoveTodo.bind(this, i)}>X</button></li>) }
        </ul>
        <input onKeyDown={::this.onAddTodo} placeholder="Input text" />
      </div>
    )
  }
}

const TodoApp = connect(
  state => (state), 
  dispatch => ({actions: bindActionCreators(TodoActions, dispatch)})
)(Todo)

const store = createStore(todoReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
 document.getElementById('app'));