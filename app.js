import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

const TodoActions = {
  addTodo(text) {
    return {
      type: ADD_TODO,
      text
    }
  },
  removeTodo(id) {
    return {
      type: REMOVE_TODO,
      id
    }
  }
}

const initialState = {
  todos: ['make a sandwich', 'kiss a grenouille']
}

const todoReducer = (state = initialState, action) => {
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


// @connect(state => ({todos: state.todos})) NOT COMPATIBLE WITH BABEL 6 YET
class Todo extends Component {

  onAddTodo = (e) => {
    const text = e.target.value.trim()
    if (!text || e.keyCode !== 13) return
    this.props.actions.addTodo(text)
    e.target.value = ''
  };

  onButtonClick = () => {
    this.props.actions.addTodo(this.refs.input.value)
    this.refs.input.value = ''
  };

  render() {
    const { todos } = this.props
    const { removeTodo } = this.props.actions

    return (
      <div>
        <ul>
          {todos.map((todo, i) =>
            <li key={i}>{todo}
              <button onClick={removeTodo.bind(this, i)}>X</button>
            </li>
          )}
        </ul>
        <input ref="input" onKeyDown={this.onAddTodo} placeholder="Input text" />
        <button onClick={this.onButtonClick}>Add todo</button>
      </div>
    )
  }
}

const TodoApp = connect(
  state => (state),
  dispatch => ({actions: bindActionCreators(TodoActions, dispatch)})
)(Todo)

const store = createStore(todoReducer)

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
 document.getElementById('app'));
