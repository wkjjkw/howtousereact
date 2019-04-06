import React, { Component } from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

/*
这个 Component 类是从一个基本 ES6类中继承来的 ES6 组件类。它有一个 React 组件所需要的所有功能。
渲染（render）方法就是其中你可以使用的一个功能。之后你可以学到更多其他组件类的方法。
这个 Component 类封装了所有 React 类需要的实现细节。它使得开发者们可以在 React 中使用类来创建组件。
React Component 类暴露出来的方法都是公共的接口。这些方法中有一个方法必须被重写，其他的则不一定要被重写。
你会在以后的讲述生命周期的章节中学到它们。这个 render()方法是必须被重写的方法，因为它定义了一个 React 组件的输出。它必须被定义。
*/

class App extends Component {
  render() {
      // var helloWorld = 'Welcome to the 合肥';
      /*
       你应该在 React 中添加一个辅助属性，借此发挥出它的潜能以提高性能。你需要给列表的每一个成员加上一个关键字（key）
       属性。这样的话 React 就可以在列表发生变化的时候识别其中成员的添加、更改和删除的状态。
       */
      // 你应该确保这个关键字属性是一个稳定的、唯一的标识符,比如，不能是数组的index，因为数组的index不稳定
      return (
          <div className="App">
              {list.map(item =>
                      <div key={item.objectID}><span><a href={item.url}>{item.title}</a></span>
                       <span>{item.author}</span>
                       <span>{item.num_comments}</span>
                       <span>{item.points}</span>
                      </div>
              )}
          </div>
      );
  }
}

export default App;
