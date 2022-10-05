import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {  

   id = 3

   state = {
      input:'',
      todos: [
         {id:0, text: ' 리액트 소개', checked: false },
         {id:1, text: ' 리액트 소개', checked: true },
         {id:2, text: ' 리액트 소개', checked: false },
      ]
   }

   handleChange = (e) => {
      this.setState({
         input: e.target.value // input 의 다음 바뀔 값
      })
   }

   handleCreate = () => {
      const {input, todos } = this.state;
      this.setState({
         input:'', // 인풋 비우고
         // concat 을 사용하여 배열에 추가
         todos: todos.concat({
            id: this.id++,
            text: input,
            checked: false
         })
      });
   }

   handleKeyPress = (e) => {
      // 눌러진 키가 Enter 면 handleCreate 호출
      if(e.key === 'Enter') {
         this.handleCreate();
      }
   }

   handleToggle = (id) => {
      const { todos } = this.state;

      // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
      const index = todos.findIndex(todo => todo.id === id);
      const selected = todos[index];  // 선택된 객체

      // const nextTodos = [...todos];  배열을 복사

      // 기존의 값들을 복사하고, checked 값을 덮어쓰기
      // nextTodos[index] = {
      //    ...selected,
      //    checked: !selected.checked
      // };

      // this.setState({
      //    todos: nextTodos
      // });

      this.setState({
         todos: [
            ...todos.slice(0, index),
            {
               ...selected,
               checked: !selected.checked
            },
            ...todos.slice(index + 1,todos.length)
         ]
      })
   }

   handleRemove = (id) => {
      const { todos } = this.state;
      this.setState ({ //자바스크립트 배열의 내장함수 filter
         todos: todos.filter(todo => todo.id !== id)
      });
   }

   render() {
      const { input, todos } = this.state;
      const { // 비구조화 할당 this.객체 대신 
         handleChange,
         handleCreate,
         handleKeyPress,
         handleToggle,
         handleRemove
      } = this;

      // const numbers = [1,2,3,4,5];
      // const squared = numbers.map(number => number * number)
      // console.log(squared);

      return (
         <TodoListTemplate form={(
            <Form
               value={input}
               onKeyPress={handleKeyPress}
               onChange={handleChange}
               onCreate={handleCreate}
             />
         )}>
            <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
         </TodoListTemplate>
      );
   }
}

export default App;
