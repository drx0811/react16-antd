import React from "react"

export default class HocFunc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    function say(a,b) {
      console.log(a,b);
    }
    Function.prototype.beforSay=function (callback) {
      return (...args)=>{// 函数返回值为一个函数
        this(...args)
        callback();
      }
    }
    let besay=say.beforSay(function () {// 函数参数为一个函数，
      console.log('提前说');
    })
    besay(1,2);
  }

  render() {
    return (
      <div>
        高阶函数，函数参数为 一个函数，或者 函数的返回值 是一个  函数
      </div>
    )
  }
}