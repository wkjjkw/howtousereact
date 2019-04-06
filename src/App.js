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

/*
组件内部状态也被称为局部状态，允许你保存、修改和删除存储在组件内部的属性。使用 ES6 类组件可以在构造函数中初始化组件的状态。
构造函数只会在组件初始化时调用一次。
* */

// ES5
// function isSearched(searchTerm) {
//     return function(item) {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
// }

// ES6
/* React 的生态使用了大量的函数式编程概念。通常情况下，你会使用一个函数返回另一个函数（高阶函数）。
在JavaScript ES6 中，可以使用箭头函数更简洁的表达这些。
*/
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Search extends Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <form>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>
        );
    }
}

class Table extends Component {
    render() {
            const { list, pattern, onDismiss } = this.props;
            return (
                <div>
                    {list.filter(isSearched(pattern)).map(item =>
                <div key={item.objectID}>
                <span>
                <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                <button
                    onClick={() => onDismiss(item.objectID)}
                    type="button"
                >
                Dismiss
                </button>
                </span>
                </div>
                    )}
                </div>
            );
        }
    }


class App extends Component {
    // 当你使用 ES6 编写的组件有一个构造函数时，它需要强制地调用 super(); 方法，因为这个App 组件是 Component 的子类。
    /*
    你也可以调用 super(props);，它会在你的构造函数中设置 this.props 以供在构造函数中访问它们。
    否则当在构造函数中访问 this.props ，会得到 undefined。
    * */
    constructor(props) {
        super(props);
        // state 通过使用 this 绑定在类上。因此，你可以在整个组件中访问到 state。
        this.state = {
            list: list,
            searchTerm: '' // 定义初始状态，可以把输入框每次变化的输入值储存到组件的内部状态中
        };


        // 单项数据流。你在界面通过 onClick 触发一个动作，再通过函数或类方法修改组件的 state，
        // 最后组件的 render() 方法再次运行并更新界面。
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);  // 类方法不会自动绑定 this到实例上。
        // 不推荐写法：将业务逻辑写在类方法里
        // this.onDismiss = (id) => {
        //     const isNotId = item => item.objectID !== id;
        //     const updatedList = this.state.list.filter(isNotId);
        //     this.setState({ list: updatedList });
        // }
    }
    /*
    注意构造函数目的只是实例化你的类以及所有的属性。
    这就是为什么我们应该把业务逻辑定义在构造函数之外。
    * */
    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    // 另一种写法，箭头函数自动绑定this
    // onDismiss = id => {
    //     const isNotId = item => item.objectID !== id;
    //     const updatedList = this.state.list.filter(isNotId);
    //     this.setState({ list: updatedList });
    // }

    render() {
      // var helloWorld = 'Welcome to the 合肥';
      /*
       你应该在 React 中添加一个辅助属性，借此发挥出它的潜能以提高性能。你需要给列表的每一个成员加上一个关键字（key）
       属性。这样的话 React 就可以在列表发生变化的时候识别其中成员的添加、更改和删除的状态。
       */
      // 你应该确保这个关键字属性是一个稳定的、唯一的标识符,比如，不能是数组的index，因为数组的index不稳定

      /*
      现在 list 是组件的一部分。它驻留在组件的 state 中。你可以从 list 中添加、修改或者删除列表项。
      每次你修改组件的内部状态，组件的 render 方法会再次运行。这样你可以简单地修改组件内部状态，
      确保组件重新渲染并且展示从内部状态获取到的正确数据。
      但是需要注意，不要直接修改 state。你必须使用 setState() 方法来修改它。
      * */

      /*
      表单元素比如 <input>, <textarea> 和 <select> 会以原生 HTML 的形式保存他们自己的状态。一旦有人从外部做了一些修改，
      它们就会修改内部的值，在 React 中这被称为不受控组件，因为它们自己处理状态。
      在 React 中，你应该确保这些元素变为受控组件。
      * */
      const { searchTerm,list } = this.state;
      return (
          <div className="App">
              <Search
                  value={searchTerm}
                  onChange={this.onSearchChange}
              />
              <Table
                  list={list}
                  pattern={searchTerm}
                  onDismiss={this.onDismiss}
              />
          </div>
      );
  }
}

export default App;
