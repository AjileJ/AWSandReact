import React from 'react';
import './App.css';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations'
import '@aws-amplify/ui/dist/style.css';
Auth.configure(awsconfig);
API.configure(awsconfig);


function updateTodo(todo, newDesc) {
  todo['description'] = newDesc;
  API.graphql(graphqlOperation(mutations.updateTodo, {input:todo}));
}

function deleteTodo(todo) {
  API.graphql(graphqlOperation(mutations.deleteTodo, {input:{'id':todo['id']}}));
}



function App() {

  const allTodos = API.graphql(graphqlOperation(queries.listTodos));
  console.log(allTodos)

  const oneTodo = API.graphql(graphqlOperation(queries.getTodo, {id: "10947e5d-d013-4e71-8c19-731e9a1cfa91"})).then(function(todo){
    updateTodo(todo['data']['getTodo'], "new desc");
  })
  .catch(function(err){
    console.log(err)
  });
  console.log(oneTodo)


  // Auth.currentAuthenticatedUser({
  //   bypassCache: false
  // }).then(user => {
  //   console.log("User: " + JSON.stringify(user));
  //   const todo = {name: user['username'], description: "new todo"};
  //   const newTodo = API.graphql(graphqlOperation(mutations.createTodo, {input: todo}))
  // }).catch(err => {
  //   console.log(err)
  // })
  


  return (
    <div className="App">
      <h1>Jordan is AWSome(Awesome)</h1>
    </div>
  );
}
export default withAuthenticator(App, {includeGreetings: true});
// export default App;
