import React from "react"
export default class ThrottleFunc extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //  setTimeOut 里面第一个函数都是自执行函数，
    function throttle(fn,time=2000) {
      let outs;
      return (...args)=>{
        if (!outs) {
          outs=setTimeout(()=>{
            outs=null;
            fn.call(this,args)
          },time)
        }
      }
    }
    // 处理函数
    function handle() {
      console.log(Math.random());
    }
    let ss=throttle(handle,2000)
    window.addEventListener('resize', ss);
  }

  render() {
    return(
      <div>
        DebounceFunc
      </div>
    )
  }

}