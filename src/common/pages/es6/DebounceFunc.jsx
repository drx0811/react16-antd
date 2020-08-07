import React from "react"
export default class DebounceFunc extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //  setTimeOut 里面第一个函数都是自执行函数，防抖；
    //  防抖：不管触发多少次，函数总会在触发最后一次结束后的固定间隔后执行；定时器要清理；
    function debounce(fn, wait=2000,immediate=true) {
      var timeout = null;
      var result = null;
      return function (...args) {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
        if (immediate) {
          result=fn.call(this,args);
          immediate=false;
        }else {
          timeout = setTimeout(()=>{
            fn.call(this,args)
          }, wait);
        }
        return result;
      }
    }
    // 处理函数
    function handle() {
      console.log(Math.random());
      return 111;
    }
    let ss=debounce(handle,2000)
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