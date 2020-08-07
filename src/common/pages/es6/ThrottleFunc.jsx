import React from "react"
export default class ThrottleFunc extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //  setTimeOut 里面第一个函数都是自执行函数，
    //  节流：不管触发多少次，函数总会在固定时间间隔内执行；节流函数没有清理定时器，只会在定时器里面给定时器赋值null
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