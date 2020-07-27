import React from "react"

export default class ProxyObj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let  handle={
      get(target, p, receiver) {
        if (typeof target[p] ==="object") {
          return new Proxy(target[p],handle);
        }
        return Reflect.get(target, p, receiver)
      },
      set(target, p, value, receiver) {
        if (p===length) {// 数组会触发两次；
          return true
        }
        return Reflect.set(target, p, value, receiver)
      }
    }


    let objs = {
      name: 122
    };
    // objs = [];
    let proxyNew = new Proxy(objs, handle);
    proxyNew.name={age:1212};
    // proxyNew.name.height=100
    // console.log(objs);
    // proxyNew.push({a:1212});
    console.log(objs);
  }

  render() {
    return (
      <div>
        proxy
      </div>
    )
  }
}