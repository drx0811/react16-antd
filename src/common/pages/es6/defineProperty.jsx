import React from "react"

export default class DefineProperty extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }
  componentDidMount() {
    const bos={
      name: {height:1111}
    };
    function observe(value) {
      if (typeof value !=="object") {
        return value;
      }
      for (let keys in value){
        definedFun(value,keys,value[keys]);
      }
    }
    function definedFun(obj,key,value) {
      observe(value);//监听当value为对象的时候，目的是递归
      Object.defineProperty(obj,key,{
        get() {
          return value
        },
        set(v) {
          if (v!==value) {
            observe(v);// 监听传入的数据是对象的时候，目的也是递归；
            console.log("更新了");
            value=v
          }
        }
      })
    }
    observe(bos);
    // bos.name=1000;
    // bos.name.height=111;
    bos.name={height: 2000};
    // bos.name.height=3000;
  }

  render() {
    return(
      <div>
       2233223
      </div>
    )
  }
}