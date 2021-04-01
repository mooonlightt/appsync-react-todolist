import React, { Component } from 'react';
import logo from './data/todologo.png';
import './App.css';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { graphqlMutation } from 'aws-appsync-react';


const CreateTodo = gql`

mutation($title: String!, $compleated: Boolean) {
  createTodo(input: {
    title: $title,
    compleated: $compleated
  }) {
    id title compleated
  }
}

`



const ListTodos = gql`
  query listTodos {
    listTodos {
      items {
        id title compleated
      }
    }
  }
`

class App extends Component {
  state ={todo :''}
  addTodo = () => {
    if(this.state.todo === '') return
    const todo = {
      title: this.state.todo,
      compleated: false
    }
    this.props.createTodo(todo)
    this.setState({todo :''})
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div style ={{marginTop :"100px"}}>

              <input
              
                  onChange ={e => this.setState({todo: e.target.value})}
                  value = {this.state.todo}
                  placeholder = 'Todo name'
              />
              <button onClick={this.addTodo}>
                  Add Todo
              </button>
        </div>

  
         {
           this.props.todos.map((item,i)=> (
             <p key ={i}> {item.title} </p>
           ))
         }


      </div> 
    );
  }
}

export default compose(
  graphqlMutation(CreateTodo, ListTodos, 'Todo'),
  graphql(ListTodos, {
    options :{
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      todos: props.data.listTodos? props.data.listTodos.items : []
    })
  })
)(App)