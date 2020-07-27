import React from "react"

export default class DefineProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // promise 一般不能中断，只有成功和失败；如果中断需要封装
    // async 返回的一定是promise函数，await 后面可能是一个promise，可能是一个值；
    function wrap(p1) {
      let abort;
      let p2 = new Promise((resolve, reject) => {
        abort = function () {
          reject("tttt");
        }
      });
      let p = Promise.race([p1, p2]);
      p.abort = abort;
      return p;
    }
    let pro = wrap(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('rrrr')
      }, 3000)
    }))
    pro.then(
      (res) => {
        console.log('res1=>' + res);
      },
      (res) => {
        console.log('res2=>' + res);
      }
    );

    // pro.abort();
  }

  render() {
    return (
      <div>
        promise
      </div>
    )
  }
}